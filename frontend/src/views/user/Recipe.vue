<template>
  <div class="flex">
    <div class="left">
      <SideNav />
    </div>

    <div class="middle">
      <div v-if="recipe" class="recipe">
        <div
          class="recipe__image"
          :style="{ backgroundImage: `url(${recipe?.coverImage || 'https://picsum.photos/1000/1000'})` }"
        >
          <div class="recipe__header">
            <button class="recipe__button" @click="goBack">
              <Icon icon="arrow" width="24" height="24" />
            </button>

            <button
              v-if="getUserInfo?.id && recipe?.userId && recipe?.userId !== getUserInfo?.id"
              class="recipe__button"
              @click="likeRecipe"
            >
              <Icon icon="heart" :color="userLikedRecipe ? '#FF7D61' : '#000'" width="24" height="24" />
            </button>

            <button
              v-if="getUserInfo?.id && recipe?.userId && recipe?.userId === getUserInfo?.id"
              class="recipe__button edit"
              @click="goToBuilder"
            >
              Edit
            </button>
          </div>
        </div>

        <div class="recipe__wrapper">
          <Title :text="recipe?.title" class="recipe__title" size="h1" />

          <div>
            <router-link
              v-if="getUserInfo?.id && recipe?.userId && recipe?.userId !== getUserInfo?.id"
              :to="`/${$route.params.username}`"
            >
              By @{{ $route.params.username }}
            </router-link>

            <div>
              <div v-if="recipe?.estimatedTime > 0" class="recipe__icon">
                <Icon icon="time" color="#D53F29" width="12" height="12" />

                <p>{{ recipe.estimatedTime }} minutes</p>
              </div>

              <div class="recipe__icon">
                <Icon icon="tag" color="#D53F29" width="12" height="12" />

                <div>
                  <router-link
                    v-for="(tag, tagIndex) of recipe?.tags"
                    :key="tagIndex"
                    class="recipe__tag"
                    :to="`/category/${tag.tag}`"
                  >
                    {{ tagIndex === 0 ? tag.tag : `, ${tag.tag}` }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="recipe__section">
            <p>
              {{ computedDescription }}
            </p>

            <button
              v-if="recipe?.description?.split(' ').length > 20"
              class="section__description__button"
              @click="toggleShowMore"
            >
              <span v-if="showMore">Hide</span>

              <span v-else>More</span>
            </button>
          </div>

          <section class="recipe__section">
            <Title size="h3" text="Ingredients" class="section__title" />

            <div>
              <div
                v-for="(ingredient, ingredientIndex) of recipe?.ingredients"
                :key="ingredientIndex"
                class="recipe__ingredient"
              >
                <p>
                  {{ ingredient.amount }} <span class="bold">{{ ingredient.metric || '' }}</span>
                </p>

                <p>
                  <span class="capitalize">{{ ingredient.ingredient }}</span>

                  <span v-if="ingredient.optional" class="bold"> (optional) </span>
                </p>
              </div>
            </div>
          </section>

          <section class="recipe__section">
            <Title size="h3" text="Steps" class="section__title" />

            <div v-for="(step, stepIndex) of recipe?.recipeSteps" :key="stepIndex" class="step">
              <div class="step__circle" @click="switchStep(stepIndex)">
                <Title :text="(stepIndex + 1).toString()" size="h3" class="step__circle__text" />
              </div>

              <p v-if="step.show">
                {{ step.content }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="right">
      <SearchBar />
      <div v-if="getUserInfo?.id">
        <RecommendedFollow />
      </div>
    </div>
  </div>

  <!-- Hacky way to set meta title -->
  <Teleport to="head">
    <title>{{ metaTitle || 'Bearnaisee' }}</title>
    <meta name="title" :content="metaTitle" />
    <meta name="description" :content="metaDescription" />

    <meta property="og:type" content="website" />
    <meta property="og:url" :content="`https://bearnais.ee/${$route.params.username}/${$route.params.slug}`" />
    <meta property="og:title" :content="metaTitle" />
    <meta property="og:description" :content="metaDescription" />
    <meta property="og:image" :content="recipe?.coverImage || null" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" :content="`https://bearnais.ee/${$route.params.username}/${$route.params.slug}`" />
    <meta property="twitter:title" :content="metaTitle" />
    <meta property="twitter:description" :content="metaDescription" />
    <meta property="twitter:image" :content="recipe?.coverImage || null" />
  </Teleport>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
import unslugText from '@/helpers/unslugText';

export default {
  name: 'Recipe',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    SearchBar: defineAsyncComponent(() => import('@/components/SearchBar.vue')),
    SideNav: defineAsyncComponent(() => import('@/components/SideNav.vue')),
    RecommendedFollow: defineAsyncComponent(() => import('@/components/RecommendedFollow.vue')),
  },

  data() {
    return {
      showMore: false,
      recipe: null,
      userLikedRecipe: false,
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),

    computedDescription() {
      if (this.recipe?.description) {
        if (this.showMore) {
          return this.recipe?.description;
        }

        const description = this.recipe?.description?.split(' ');

        return `${description.splice(0, description.length > 20 ? 20 : description.length).join(' ')}${
          description.length > 20 ? '...' : ''
        }`;
      }

      return '';
    },

    metaTitle() {
      return `${this.recipe?.title || unslugText(this.$route?.params?.slug) || 'Recipe'} | Bearnaisee`;
    },

    metaDescription() {
      return this?.recipe?.description || process?.env?.VUE_APP_META_DESC;
    },
  },

  created() {
    this.fetchRecipe();
  },

  methods: {
    ...mapMutations(['setEditRecipeId']),

    goBack() {
      this.$router.go(-1);
    },

    async fetchRecipe() {
      const recipe = await axios
        .get(`${process.env.VUE_APP_API_URL}/recipe/${this.$route.params.username}/${this.$route.params.slug}`)
        .then((res) => res?.data)
        .catch((error) => console.error('ERROR fetching recipe', error));

      for (let i = 0; i < recipe?.recipeSteps?.length; i += 1) {
        recipe.recipeSteps[i].show = true;
      }

      this.recipe = recipe;

      if (this.getUserInfo?.id !== this.recipe?.userId) {
        this.checkIfLiked();
      }
    },

    toggleShowMore() {
      this.showMore = !this.showMore;
    },

    switchStep(index) {
      this.recipe.recipeSteps[index].show = !this.recipe.recipeSteps[index].show;
    },

    async likeRecipe() {
      const userId = this.getUserInfo.id;
      const recipeId = this.recipe.id;

      await axios
        .post(`${process.env.VUE_APP_API_URL}/recipe/like/${recipeId}/${userId}`)
        .then((res) => res?.data)
        .catch((error) => console.error('Something went wrong liking recipe', error));

      this.checkIfLiked();
    },

    async checkIfLiked() {
      const userId = this.getUserInfo.id;
      const recipeId = this.recipe.id;

      this.userLikedRecipe = await axios
        .get(`${process.env.VUE_APP_API_URL}/recipe/like/${recipeId}/${userId}`)
        .then((res) => res?.data?.userLiked || false)
        .catch((error) => {
          console.error('Something went wrong liking recipe', error);
          return false;
        });
    },

    goToBuilder() {
      this.setEditRecipeId(this.recipe.id);

      this.$router.push('/create');
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    .left {
      width: 20%;
    }

    .middle {
      width: 60%;
      margin-top: 2.5rem;
    }

    .right {
      width: 20%;

      @media (max-width: 1024px) {
        display: none;
      }
    }
  }

  .recipe {
    .recipe__image {
      height: 25rem;
      width: 100%;
      margin-bottom: 0%;
      z-index: 1;
      left: 0;
      top: 0;
      background-size: cover;
      background-position: center;

      @media (min-width: 1024px) {
        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
      }
    }

    .recipe__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 2vh 3vw;
    }

    .recipe__button {
      background: none;
      border: none;
      height: 3rem;
      width: 3rem;
      background-color: #e8e8e8;
      border-radius: 50%;
      display: flex;
      place-items: center;
      place-content: center;
    }

    .edit {
      font-weight: bold;
      font-size: 1rem;
    }

    .recipe__wrapper {
      padding: 2rem 1rem;
      min-height: fit-content;
      height: 100%;
      background-color: #fafafa;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      z-index: 10;
      margin-top: -25%;
      width: 100%;

      @media (min-width: 1024px) {
        margin-top: 0;
        border-radius: 0;
      }

      .recipe__title {
        word-wrap: break-word;
        font-size: 2rem;
      }

      .recipe__icon {
        display: flex;
        gap: 0.5rem;
        align-content: center;
        align-items: center;
        font-size: 0.8rem;

        .recipe__tag {
          font-size: 0.7rem;
          text-transform: capitalize;
        }
      }

      .recipe__section {
        margin: 2.5rem 0;

        .section__title {
          margin-bottom: 0.5rem;
        }

        .section__description__button {
          background: none;
          border: none;
          font-weight: 700;
        }

        .recipe__ingredient {
          display: grid;
          grid-template-columns: 1fr 7fr;

          @media (max-width: 1024px) {
            grid-template-columns: 1fr 3fr;
          }
        }

        .step {
          margin-bottom: 1.5rem;

          .step__circle {
            display: flex;
            gap: 1rem;
            align-content: center;
            align-items: center;
            background-color: #e8e8e8;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            display: flex;
            place-items: center;
            place-content: center;
            z-index: 0;
            margin-bottom: 0.5rem;

            .step__circle__text {
              z-index: 100;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>
