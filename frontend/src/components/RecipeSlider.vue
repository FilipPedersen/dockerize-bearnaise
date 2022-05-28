<template>
  <div class="slider">
    <router-link v-for="(card, cardIndex) of recipes" :key="cardIndex" :to="`/${card.author}/${card.slug}`">
      <Image :src="card.coverImage" class="slider__image" />

      <Title class="slider__text" size="h3" :text="card.title" />
    </router-link>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'RecipeSlider',

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
  },

  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  gap: 2rem;
  height: fit-content;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    margin-bottom: 2.5rem;
  }

  &::-webkit-scrollbar {
    background-color: rgba(#000, 0.02);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999999px;
    background-color: #7e7e7e70;
  }

  .slider__image {
    object-fit: cover;
    border-radius: var(--border-radius);

    // mobile
    @media (max-width: 1024px) {
      height: 10rem;
      width: 15rem;
    }

    // dekstop
    @media (min-width: 1024px) {
      height: 15rem;
      width: 25rem;
    }
  }

  .slider__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 25rem;

    @media (max-width: 1024px) {
      width: 15rem;
    }
  }
}
</style>
