<template>
  <Modal @close="closeModal">
    <div class="modal__inner">
      <div class="modal__header">
        <button class="modal__header-button" @click="closeModal">X</button>
      </div>

      <Title size="h1" :text="loginTab ? 'Sign in to Bearnaisee' : 'Sign up to Bearnaisee'" class="modal__title" />

      <form class="modal__form" @submit.prevent="loginTab ? login() : register()">
        <input
          v-if="!loginTab"
          v-model.trim="username"
          type="username"
          placeholder="Username"
          required
          class="modal__form-input"
        />

        <input v-model.trim="email" type="email" placeholder="Email" required class="modal__form-input" />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="modal__form-input"
          minlength="6"
        />

        <p class="modal__form-disclaimer">
          By using Bearnaise, you agree to our
          <a href="/terms-of-service" target="_blank"> Terms of Service </a>
          & <a href="/privacy-policy" target="_blank"> Privacy Policy </a>
        </p>

        <Button type="submit" :label="loginTab ? 'Sign in' : 'Sign up'" kind="primary" class="modal__form-button" />

        <Title size="h4" text="Or" class="modal__title" />

        <Button
          type="button"
          :label="loginTab ? 'Sign up' : 'Sign in'"
          kind="secondary"
          class="modal__form-button"
          @click="loginTab = !loginTab"
        />
      </form>
    </div>
  </Modal>
</template>

<script>
import axios from 'axios';
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import log from '@/helpers/log';

export default {
  name: 'LoginModal',

  components: {
    Modal: defineAsyncComponent(() => import('@/components/Modal.vue')),
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
  },

  props: {
    startTab: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],

  data() {
    return {
      loginTab: this.startTab,
      username: '',
      email: '',
      password: '',
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  methods: {
    ...mapActions(['saveUserInfo']),

    closeModal() {
      this.$emit('close');
    },

    async login() {
      if (this.email?.length && this.password?.length) {
        const result = await axios
          .post(`${process.env.VUE_APP_API_URL}/user/login`, {
            email: this.email,
            password: this.password,
          })
          .then((res) => res?.data)
          .catch((error) => {
            if (error?.response?.data?.msg) {
              this.$swal({
                icon: 'error',
                title: error?.response?.data?.msg,
                timer: 800,
                showConfirmButton: false,
              });
            } else {
              this.$swal({
                icon: 'error',
                title: 'Something went wrong, please try again later',
                timer: 800,
                showConfirmButton: false,
              });
            }

            return error?.response?.data || error?.response || error;
          });

        log('result', result);

        if (result?.user) {
          this.saveUserInfo(result.user);

          this.$swal({
            icon: 'success',
            title: 'Logged in successfully',
            showConfirmButton: false,
            timer: 1000,
          });

          this.$emit('close');
        }
      }
    },

    async register() {
      if (this.username?.length && this.email?.length && this.password?.length) {
        const result = await axios
          .post(`${process.env.VUE_APP_API_URL}/users`, {
            username: this.username,
            email: this.email,
            password: this.password,
          })
          .then((res) => res?.data)
          .catch((error) => {
            if (error?.response?.data?.msg) {
              this.$swal({
                icon: 'error',
                title: error?.response?.data?.msg,
                timer: 800,
                showConfirmButton: false,
              });
            } else {
              this.$swal({
                icon: 'error',
                title: 'Something went wrong, please try again later',
                timer: 800,
                showConfirmButton: false,
              });
            }

            return error?.response?.data || error?.response || error;
          });

        log('result', result);

        if (result?.user) {
          this.saveUserInfo(result.user);

          this.$swal({
            icon: 'success',
            title: 'Created user successfully',
            showConfirmButton: false,
            timer: 1000,
          });

          this.$emit('close');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal__inner {
  background: #fff;
  width: 100vw;
  min-height: 100vh;
  height: 100%;

  .modal__header {
    width: 100%;
    display: flex;

    .modal__header-button {
      margin: 0 2rem 0 auto;
      background: none;
      border: none;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  .modal__title {
    text-align: center;
  }

  .modal__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;

    .modal__form-input {
      width: 100%;
      border: 1px solid #7e7e7e;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;

      &::placeholder {
        color: #7e7e7e;
      }
    }

    .modal__form-button {
      font-size: 1.25rem;
    }

    .modal__form-disclaimer {
      font-size: 0.75rem;
      text-align: center;

      a {
        font-weight: bold;
      }
    }
  }

  @media (min-width: 1024px) {
    width: 50vh;
    min-height: 0;
    border-radius: var(--border-radius);
  }
}

body {
  overflow-y: hidden;
}
</style>
