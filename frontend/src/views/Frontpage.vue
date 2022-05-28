<template>
  <div class="web-layout">
    <div class="sidenav">
      <SideNav />
    </div>

    <div class="content">
      <TopNav />

      <Title text="Top categories" size="h2" class="content__title" />

      <div class="categories">
        <router-link
          v-for="(category, categoryIndex) of categories"
          :key="categoryIndex"
          :to="`/category/${category}`"
          class="categories__link"
        >
          <Icon class="categories__icon" :icon="category" width="30" height="30" />

          <p>{{ category }}</p>
        </router-link>
      </div>

      <Title text="Trending" size="h2" class="content__title" />

      <RecipeSlider v-if="trendingRecipes?.length" class="slider__recipes" :recipes="trendingRecipes" />
      <p v-else>No trending recipes</p>

      <div class="tabs">
        <button
          class="tabs__button"
          :class="tab === 'recipes' ? 'tabs__button--active' : ''"
          @click="switchTab('recipes')"
        >
          Recent
        </button>

        <button
          v-if="getUserInfo?.id"
          class="tabs__button"
          :class="tab === 'feed' ? 'tabs__button--active' : ''"
          @click="switchTab('feed')"
        >
          Feed
        </button>
      </div>

      <keep-alive>
        <div v-if="tab === 'recipes'">
          <RecipeGrid v-if="recipes?.length" :recipes="recipes" />
          <p v-else>No recent recipes :(</p>
        </div>
      </keep-alive>

      <keep-alive>
        <div v-if="tab === 'feed'">
          <RecipeGrid v-if="feed?.length" :recipes="feed" />

          <p v-else>User has no feed :(</p>
        </div>
      </keep-alive>
      <!-- <div>
        <Title text="Recent" size="h2" class="content__title" />

        <RecipeGrid v-if="recipes?.length" :recipes="recipes" :show-author="true" />
        <p v-else>No recent recipes</p>
      </div> -->
    </div>

    <div class="search">
      <div>
        <SearchBar />
      </div>
      <div v-if="getUserInfo?.id">
        <RecommendedFollow />
      </div>
    </div>
  </div>

  <!-- Hacky way to set meta title -->
  <Teleport to="head">
    <title>{{ metaTitle || 'Bearnaisee' }}</title>
    <meta name="title" :content="metaTitle || 'Bearnaisee'" />
    <meta name="description" :content="metaDescription" />

    <meta property="og:type" content="website" />
    <meta property="og:url" :content="`https://bearnais.ee`" />
    <meta property="og:title" :content="metaTitle || 'Bearnaisee'" />
    <meta property="og:description" :content="metaDescription" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" :content="`https://bearnais.ee`" />
    <meta property="twitter:title" :content="metaTitle || 'Bearnaisee'" />
    <meta property="twitter:description" :content="metaDescription" />
  </Teleport>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'Frontpage',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
    RecipeGrid: defineAsyncComponent(() => import('@/components/RecipeGrid.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    TopNav: defineAsyncComponent(() => import('@/components/TopNav.vue')),
    RecipeSlider: defineAsyncComponent(() => import('@/components/RecipeSlider.vue')),
    SideNav: defineAsyncComponent(() => import('@/components/SideNav.vue')),
    SearchBar: defineAsyncComponent(() => import('@/components/SearchBar.vue')),
    RecommendedFollow: defineAsyncComponent(() => import('@/components/RecommendedFollow.vue')),
  },

  data() {
    return {
      tab: 'recipes',
      categories: ['meat', 'fish', 'poultry', 'vegetarian', 'pasta', 'soup', 'baking', 'dessert'],
      recipes: [],
      trendingRecipes: [],
      feed: [],
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),

    metaTitle() {
      return 'Home | Bearnaisee';
    },

    metaDescription() {
      return process?.env?.VUE_APP_META_DESC;
    },
  },

  watch: {
    getUserInfo: {
      handler() {
        if (this.getUserInfo?.id) {
          this.fetchfeedRecipes();
        }
      },
    },
  },

  created() {
    this.fetchRecentRecipes();

    this.fetchTrendingRecipes();

    this.fetchfeedRecipes();
  },

  methods: {
    /**
     * @param {string} tab
     */
    switchTab(tab) {
      if (tab === 'recipes') {
        this.tab = 'recipes';
      } else if (tab === 'feed') {
        this.fetchfeedRecipes();

        this.tab = 'feed';
      }
    },

    async fetchRecentRecipes() {
      this.recipes = await axios
        .get(`${process.env.VUE_APP_API_URL}/recipes/recent`)
        .then((res) => res?.data?.recipes || [])
        .catch((error) => {
          console.error('ERROR fetching recent recipes', error);
          return [];
        });
    },

    async fetchfeedRecipes() {
      if (!this.getUserInfo?.id || this.feed?.length) return;

      this.feed = await axios
        .get(`${process.env.VUE_APP_API_URL}/feed/${this.getUserInfo.id}`)
        .then((res) => res?.data?.feed ?? [])
        .catch((error) => {
          console.error('ERROR fetching feed recipes', error);
          return [];
        });
    },

    async fetchTrendingRecipes() {
      this.trendingRecipes = await axios
        .get(`${process.env.VUE_APP_API_URL}/recipes/trending`)
        .then((res) => res?.data?.recipes ?? [])
        .catch((error) => {
          console.error('ERROR fetching recent recipes', error);
          return [];
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.web-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: block;
    padding: 1rem;
  }

  .sidenav {
    @media (min-width: 1024px) {
      width: 20%;
    }
  }

  .content {
    .tabs {
      margin-top: 1rem;
      margin-bottom: 1.25rem;
      display: flex;
      gap: 1rem;

      .tabs__button {
        background: none;
        border: none;
        padding: 0.5rem 0rem;
        transition: 0.3s;
        font-size: 1.25rem;
        position: relative;
        color: #7e7e7e;

        &--active {
          transition: 0.3s;
          color: var(--color-black);

          &::after {
            position: absolute;
            content: '';
            background: var(--color-highlight);
            bottom: -5%;
            left: 0%;
            z-index: 100;
            padding: 0.175rem 1.5rem;
          }
        }

        &:hover {
          color: var(--color-black);
        }
      }
    }

    @media (min-width: 1024px) {
      width: 60%;
      padding: 1rem 1.5rem 1.5rem;
      border-left: 1px solid rgb(239, 243, 244);
      border-right: 1px solid rgb(239, 243, 244);
    }

    .content__title {
      padding-bottom: 0.75rem;
    }

    .categories {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      margin: 0.75rem 0 2rem 0;

      @media (max-width: 1024px) {
        gap: 0.8rem;
      }
      .categories__icon:hover {
        transform: scale(1.5);
        filter: invert(59%) sepia(70%) saturate(6357%) brightness(109%) contrast(100%);
      }

      .categories__link {
        margin: 0 auto;
        text-align: center;

        @media (min-width: 1024px) {
          padding: 1rem 2rem;

          &:hover {
            background-color: #f7e8e855;
            border-radius: 10px;
          }
        }

        p {
          text-transform: capitalize;
        }
      }
    }
  }

  .search {
    display: none;
    height: 100%;
    position: sticky;
    top: 0;

    @media (min-width: 1024px) {
      display: block;
      width: 20%;
    }
  }
}

.slider__recipes {
  padding: 0.5rem 0;
}
</style>
