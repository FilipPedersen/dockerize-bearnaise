<template>
  <div class="recipes">
    <RecipeCard
      v-for="(recipe, recipeIndex) of recipes"
      :key="recipeIndex"
      :title="recipe?.title"
      :time="recipe?.time"
      :tags="recipe?.tags?.map((t) => t?.tag)"
      :slug="recipe?.slug"
      :author="recipe?.author"
      :image="recipe?.coverImage || `https://picsum.photos/seed/${recipe.slug}/1000/1000`"
      :show-author="showAuthor"
      :avatar="recipe?.avatarUrl"
      class="recipes__card"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'RecipeGrid',

  components: {
    RecipeCard: defineAsyncComponent(() => import('@/components/RecipeCard.vue')),
  },

  props: {
    recipes: {
      type: Array,
      required: true,
    },
    showAuthor: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.recipes {
  width: 100%;
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  .recipes__card {
    width: 100%;
  }

  @media (min-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
