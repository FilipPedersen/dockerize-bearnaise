<template>
  <div class="nav">
    <router-link to="/" class="nav__link">
      <Icon icon="home" width="25" height="25" />
    </router-link>

    <!-- TODO: implement search -->
    <router-link v-if="getUserInfo?.id" to="/settings" class="nav__link">
      <Icon icon="settings" width="30" height="30" />
    </router-link>

    <router-link v-if="getUserInfo?.id" to="/create" class="nav__link">
      <Icon icon="create" width="40" height="40" color="var(--color-highlight)" />
    </router-link>

    <router-link v-if="getUserInfo?.id" :to="`/${getUserInfo.username}#bookmarks`" class="nav__link">
      <Icon icon="bookmark" width="25" height="25" />
    </router-link>

    <router-link v-if="getUserInfo?.id" :to="`/${getUserInfo.username}#profile`" class="nav__link">
      <Icon icon="profile" width="25" height="25" />
    </router-link>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'MobileNav',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-around;
    background-color: var(--color-bg);
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0.05rem 10rem;
    align-items: center;
  }

  @media (max-width: 640px) {
    padding: 0.05rem 3rem;
  }

  @media (max-width: 425px) {
    padding: 0.05rem 1rem;
  }

  @media (max-width: 390px) {
    padding: 0.05rem 0.5rem;
  }
}
</style>
