<template>
  <div v-if="users" class="container">
    <div>
      <Title text="Who to follow" size="h2" class="container__title" />
    </div>

    <div v-for="user in users" :key="user.id" class="list">
      <div>
        <router-link :to="`/${user.username}`">
          <img :src="user.avatarUrl" :alt="`${user.username || ''} profile image`" class="list__avatar" />
        </router-link>
      </div>
      <div class="list__users">
        <router-link :to="`/${user.username}`" class="displayname">
          {{ user?.displayName || user?.username }}
        </router-link>
        <router-link :to="`/${user.username}`" class="username"> @{{ user.username }} </router-link>
      </div>
      <Button
        :label="user?.following ? 'Unfollow' : 'Follow'"
        class="button"
        type="button"
        kind="primary"
        @click="followUser(user.id)"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'RecommendedFollow',

  components: {
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
  },

  data() {
    return {
      users: null,
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  created() {
    this.getUserToFollow();
  },

  methods: {
    async getUserToFollow() {
      this.users = await axios
        .get(`${process.env.VUE_APP_API_URL}/user/who-to-follow/${this.getUserInfo.id}`)
        .then((res) => res?.data?.users || [])
        .catch((error) => {
          console.error('Error fetching user to follow', error);
          return [];
        });
    },

    /**
     * @param {number} userId
     */
    async checkIfFollowing(userId) {
      const followerId = this.getUserInfo.id;

      const following = await axios
        .get(`${process.env.VUE_APP_API_URL}/user/follow/${userId}/${followerId}`)
        .then((res) => res?.data?.following || false)
        .catch((error) => {
          console.error('Error checking if following', error);
          return false;
        });

      const userIndex = this.users.findIndex((u) => u?.id === userId);
      if (userIndex > -1) {
        this.users[userIndex].following = following;
      }
    },

    async followUser(userId) {
      const followerId = this.getUserInfo.id;

      await axios
        .post(`${process.env.VUE_APP_API_URL}/user/follow/${userId}/${followerId}`)
        .then((res) => res?.data?.following || false)
        .catch((error) => {
          console.error('Error checking following user', error);
          return false;
        });

      this.checkIfFollowing(userId);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: none;

  @media (min-width: 1024px) {
    border-radius: 10px;
    padding: 0.8rem;
    display: block;

    .container__title {
      padding-bottom: 0.8rem;
    }

    .list {
      display: flex;
      place-items: center;
      width: 100%;
      gap: 1rem;
      padding: 0.6rem 0rem;

      .list__users {
        display: flex;
        flex-direction: column;
        .displayname {
          text-transform: capitalize;
          font-size: 0.85rem;
        }
        .username {
          font-size: 0.8rem;
        }
      }

      .list__avatar {
        width: 2.5rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
      }

      .button {
        padding: 0.15rem 0.4rem;
        margin-left: auto;
      }
    }
  }
}
</style>
