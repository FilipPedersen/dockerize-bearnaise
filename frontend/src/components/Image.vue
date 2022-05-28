<template>
  <img v-lazy="src" :alt="alt" />
</template>

<script>
export default {
  name: 'Image',

  props: {
    src: { type: String, default: 'https://picsum.photos/1000/1000' },
    alt: { type: String, default: null },
  },
};
</script>
