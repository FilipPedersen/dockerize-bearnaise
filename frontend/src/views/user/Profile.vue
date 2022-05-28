<template>
  <div class="web-layout">
    <div class="sidenav">
      <SideNav />
    </div>

    <div class="content">
      <div v-if="!loading && !user">
        <!-- TODO: pimp up this shit -->
        <h1>:(</h1>
        <h1>User with the name of {{ $route.params.username }} was not found</h1>
      </div>

      <div v-else>
        <Image :src="avatarUrl" class="content__avatar" />

        <div class="content__social">
          <div>
            <h1 size="h1" class="content__name">
              {{ user?.displayName || user?.username || $route.params.username }}
            </h1>

            <p class="content__username">@{{ user?.username || $route.params.username }}</p>
          </div>

          <Button
            v-if="user?.id !== getUserInfo?.id"
            :label="following ? 'Unfollow' : 'Follow'"
            class="follow-button"
            type="button"
            kind="primary"
            @click="followUser"
          />
        </div>

        <p v-if="user?.description" class="description">
          {{ user.description }}
        </p>

        <div class="content__stats">
          <p>
            <span>
              {{ followerCount || 0 }}
            </span>
            followers
          </p>

          <p>
            <span>
              {{ followingCount || 0 }}
            </span>
            following
          </p>
        </div>

        <div class="tabs">
          <button
            class="tabs__button"
            :class="tab === 'recipes' ? 'tabs__button--active' : ''"
            @click="switchTab('recipes')"
          >
            Recipes
          </button>

          <button
            class="tabs__button"
            :class="tab === 'bookmarks' ? 'tabs__button--active' : ''"
            @click="switchTab('bookmarks')"
          >
            Bookmarks
          </button>
        </div>

        <keep-alive>
          <div v-if="tab === 'recipes'">
            <RecipeGrid v-if="recipes?.length" :recipes="recipes" :show-author="false" />
            <p v-else>User has no recipes :(</p>
          </div>
        </keep-alive>

        <keep-alive>
          <div v-if="tab === 'bookmarks'">
            <RecipeGrid v-if="bookmarks?.length" :recipes="bookmarks" />

            <p v-else>User has no bookmarks :(</p>
          </div>
        </keep-alive>
      </div>
    </div>

    <div class="search">
      <input type="text" placeholder="Search for something..." class="searchbar" />
    </div>
  </div>

  <!-- Hacky way to set meta title -->
  <Teleport to="head">
    <title>{{ metaTitle || 'Bearnaisee' }}</title>
    <meta name="title" :content="metaTitle || 'Bearnaisee'" />
    <meta name="description" :content="metaDescription" />

    <meta property="og:type" content="website" />
    <meta property="og:url" :content="`https://bearnais.ee/${$route.params.username}`" />
    <meta property="og:title" :content="metaTitle || 'Bearnaisee'" />
    <meta property="og:description" :content="metaDescription" />
    <meta property="og:image" :content="avatarUrl || null" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" :content="`https://bearnais.ee/${$route.params.username}`" />
    <meta property="twitter:title" :content="metaTitle || 'Profile | Bearnaisee'" />
    <meta property="twitter:description" :content="metaDescription" />
    <meta property="twitter:image" :content="avatarUrl || null" />
  </Teleport>
</template>

<script>
import { mapGetters } from 'vuex';
import md5 from 'md5';
import { defineAsyncComponent } from 'vue';
import axios from 'axios';
import abbreviateNumber from '@/helpers/abbreviateNumber';

export default {
  name: 'Profile',

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
    RecipeGrid: defineAsyncComponent(() => import('@/components/RecipeGrid.vue')),
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
    SideNav: defineAsyncComponent(() => import('@/components/SideNav.vue')),
  },

  data() {
    return {
      tab: 'recipes',
      loading: true,
      user: null,
      followerCount: 0,
      followingCount: 0,
      following: false,
      recipes: [],
      bookmarks: [],
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),

    avatarUrl() {
      if (this.user?.avatarUrl) {
        return this.user.avatarUrl;
      }

      if (this.user?.email) {
        const emailHash = md5(this.user.email.toLowerCase());

        return `https://gravatar.com/avatar/${emailHash}?s=192`;
      }

      return 'http://www.gravatar.com/avatar/?d=mp&s=192';
    },

    metaTitle() {
      return `${this?.user?.username || this?.$route?.params?.username} (@${
        this?.$route?.params?.username
      }) | Bearnaisee`;
    },

    metaDescription() {
      return process?.env?.VUE_APP_META_DESC;
    },
  },

  watch: {
    '$route.hash': {
      handler() {
        if (this.$route?.hash?.toLowerCase() === '#bookmarks') {
          this.tab = 'bookmarks';
        } else {
          this.tab = 'recipes';
        }
      },
    },
  },

  created() {
    this.fetchUserInfo();
    this.fetchUserRecipes();
  },

  methods: {
    /**
     * @param {string} tab
     */
    switchTab(tab) {
      if (tab === 'recipes') {
        this.tab = 'recipes';
        window.location.hash = '';
      } else if (tab === 'bookmarks') {
        this.tab = 'bookmarks';
        window.location.hash = '#bookmarks';
      }
    },

    async fetchUserInfo() {
      this.user = await axios
        .get(`${process.env.VUE_APP_API_URL}/user/${this.$route.params.username}`)
        .then((res) => res?.data)
        .catch((error) => {
          console.error('Error fetching userinfo', error);
        });

      this.loading = false;

      if (this.user?.id) {
        this.fetchUserStats();

        this.fetchLikedRecipes();

        if (this.getUserInfo?.id && this.user.id !== this.getUserInfo.id) {
          this.checkIfFollowing();
        }
      }
    },

    async fetchUserRecipes() {
      this.recipes = await axios
        .get(`${process.env.VUE_APP_API_URL}/recipes/user/${this.$route.params.username}`)
        .then((res) => res?.data?.recipes || [])
        .catch((error) => {
          console.error('Error fetching recipes', error);
          return [];
        });
    },

    async fetchLikedRecipes() {
      this.bookmarks = await axios
        .get(`${process.env.VUE_APP_API_URL}/user/liked/recipes/${this.user.id}`)
        .then((res) => res?.data?.recipes || [])
        .catch((error) => {
          console.error('Error fetching liked recipes', error);
          return [];
        });
    },

    async fetchUserStats() {
      if (this.user.id) {
        const stats = await axios
          .get(`${process.env.VUE_APP_API_URL}/user/stats/${this.user.id}`)
          .then((res) => res?.data)
          .catch((error) => {
            console.error('Error fetching user stats', error);
          });

        this.followerCount = abbreviateNumber(stats?.followerCount || 0);
        this.followingCount = abbreviateNumber(stats?.followingCount || 0);
      }
    },

    async checkIfFollowing() {
      const userId = this.user.id;
      const followerId = this.getUserInfo.id;

      this.following = await axios
        .get(`${process.env.VUE_APP_API_URL}/user/follow/${userId}/${followerId}`)
        .then((res) => res?.data?.following || false)
        .catch((error) => {
          console.error('Error checking if following', error);
          return false;
        });
    },

    async followUser() {
      const userId = this.user.id;
      const followerId = this.getUserInfo.id;

      await axios
        .post(`${process.env.VUE_APP_API_URL}/user/follow/${userId}/${followerId}`)
        .then((res) => res?.data?.following || false)
        .catch((error) => {
          console.error('Error checking following user', error);
          return false;
        });

      this.checkIfFollowing();
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

    .content__stats {
      display: flex;
      gap: 1rem;

      span {
        font-weight: 700;
      }
    }

    .content__avatar {
      width: 12rem;
      aspect-ratio: 1/1;
      border-radius: 50%;
    }

    .content__social {
      display: flex;
      gap: 2.5rem;
      place-items: center;

      .content__name {
        font-size: 1.5rem;
      }

      .content__username {
        font-size: 1.25rem;
      }

      .follow-button {
        margin-left: auto;
        height: fit-content;
        margin: 20px 0px;
      }
    }

    @media (min-width: 1024px) {
      width: 60%;
      margin-top: 2.5rem;
    }
  }

  .search {
    display: none;

    .searchbar {
      border-radius: 4px;
      border: solid 1px var(--color-black);
      width: 100%;
      height: 2rem;
      padding-left: 0.25rem;
    }

    @media (min-width: 1024px) {
      display: block;
      width: 20%;
      padding-top: 2.5rem;
      height: fit-content;
      gap: 1rem;
    }
  }
}
</style>
