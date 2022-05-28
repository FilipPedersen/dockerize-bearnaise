<template>
  <div class="container">
    <div style="width: 100%">
      <router-view />
    </div>
  </div>
  <MobileNav />
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapActions } from 'vuex';

export default {
  components: {
    MobileNav: defineAsyncComponent(() => import('@/components/MobileNav.vue')),
  },

  created() {
    this.initStore();
  },

  methods: {
    ...mapActions(['initStore']),
  },
};
</script>

<style lang="scss">
:root {
  --color-black: #101010;
  --color-highlight: #ff7d61;
  --color-bg: #f7e8e8;
  --border-radius: 0.4rem;
  --font-primary: 'Open Sans', sans-serif;
  --font-secondary: 'Poppins', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  transition: 0.4s;
  line-height: 1.6;
  color: var(--color-black);

  &::before,
  &::after {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.6;
  }
}

*,
body,
html {
  font-family: var(--font-primary);
}

body,
html {
  scroll-behavior: smooth;
  height: 100%;
  padding-top: 0;
  width: 100%;
  color: var(--color-black);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-secondary);
}

.container {
  width: 100%;
  margin: auto;
  padding-bottom: 5rem;

  @media (max-width: 625px) {
  }

  @media (min-width: 640px) {
    max-width: min(80vw, 640px);
  }

  @media (min-width: 768px) {
    max-width: min(80vw, 768px);
  }

  @media (min-width: 1024px) {
    max-width: min(80vw, 1024px);
  }

  @media (min-width: 1280px) {
    max-width: min(80vw, 1280px);
  }

  @media (min-width: 1536px) {
    max-width: min(80vw, 1536px);
  }
}

a,
button {
  cursor: pointer;
}

a {
  text-decoration: none;
}

.bold {
  font-weight: 700;
}

.capitalize {
  text-transform: capitalize;
}
</style>
