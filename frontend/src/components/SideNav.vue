<template>
  <div class="nav">
    <router-link to="/"><Title text="Bearnaisee" size="h1" /> </router-link>

    <router-link to="/" class="nav__link"> Home </router-link>

    <router-link v-if="getUserInfo?.username" :to="`/${getUserInfo.username}`" class="nav__link"> Profile </router-link>

    <router-link v-if="getUserInfo?.username" :to="`/${getUserInfo.username}#bookmarks`" class="nav__link">
      Bookmarks
    </router-link>

    <router-link v-if="getUserInfo?.id" to="/settings" class="nav__link"> Settings </router-link>

    <button v-if="getUserInfo?.id" type="button" class="nav__button" @click="logout">Log out</button>

    <button v-if="getUserInfo?.id" class="add" @click="goToCreateRecipe">Create Recipe</button>

    <div v-if="!getUserInfo" class="buttons">
      <Button kind="secondary" label="Signup" @clicked="switchLoginModal(false)" />

      <Button kind="primary" label="Login" @clicked="switchLoginModal(true)" />
    </div>
  </div>

  <LoginModal v-if="showLoginModal" :start-tab="startTab" @close="switchLoginModal" />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'SideNav',

  components: {
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
    LoginModal: defineAsyncComponent(() => import('@/components/LoginModal.vue')),
  },

  data() {
    return {
      showLoginModal: false,
      startTab: null,
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  methods: {
    ...mapMutations(['setUserInfo', 'setEditRecipeId']),

    /**
     * @param {boolean | null} tab
     */
    switchLoginModal(tab = null) {
      this.startTab = tab;
      this.showLoginModal = !this.showLoginModal;
    },

    logout() {
      this.setUserInfo(null);
      localStorage.clear();
      window.location.reload();
    },

    goToCreateRecipe() {
      this.setEditRecipeId(null);
      this.$router.push('/create');
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  width: fit-content;
  flex-direction: column;
  padding-top: 1rem;
  position: sticky;
  top: 0px;

  .buttons {
    display: none;

    @media (min-width: 1024px) {
      display: flex;
      padding-top: 1.5rem;
      width: 100%;
      margin: auto;
      gap: 1rem;
      align-items: center;
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }

  .nav__link {
    font-size: 1.25rem;
    text-decoration: none;
    width: 100%;
    color: var(--color-highlight);

    @media (min-width: 1024px) {
      margin-top: 1.25rem;
    }
  }

  .nav__button {
    margin-top: 1.25rem;
    border: 1px solid var(--color-highlight);
    background-color: #fff;
    font-size: 1.25rem;
    color: var(--color-highlight);
    text-align: left;
    width: fit-content;
    padding: 0.2rem 1rem;
    border-radius: 4px;

    &:hover {
      transition: 0.2s;
      background-color: var(--color-highlight);
      color: #fff;
    }
  }

  .add {
    background-color: var(--color-highlight);
    width: fit-content;
    padding: 0.75rem 1.5rem;
    margin-top: 1.25rem;
    color: #fff;
    font-size: 1.25rem;
    text-decoration: none;
    text-align: center;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    border: none;
  }
}
</style>
