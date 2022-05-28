<template>
  <h1 v-if="size === 'h1'">
    {{ text }}
  </h1>

  <h2 v-else-if="size === 'h2'">
    {{ text }}
  </h2>

  <h3 v-else-if="size === 'h3'" class="ellipsis">
    {{ text }}
  </h3>

  <h4 v-else-if="size === 'h4'">
    {{ text }}
  </h4>

  <h5 v-else-if="size === 'h5'">
    {{ text }}
  </h5>

  <h6 v-else>
    {{ text }}
  </h6>
</template>

<script>
export default {
  name: 'Title',

  props: {
    text: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      default: 'h6',
    },
  },
};
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.2;
}

h1 {
  @media (min-width: 640px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
  }

  @media (min-width: 1280px) {
    font-size: 2rem;
  }

  @media (min-width: 1536px) {
    font-size: 2.5rem;
  }
}

h2 {
  @media (min-width: 640px) {
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1280px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1536px) {
    font-size: 1.5rem;
  }
}

h3 {
  @media (min-width: 640px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.17rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.17rem;
  }

  @media (min-width: 1280px) {
    font-size: 1.17rem;
  }

  @media (min-width: 1536px) {
    font-size: 1rem;
  }
}
</style>
