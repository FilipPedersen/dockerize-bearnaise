<template>
  <div class="card">
    <router-link v-if="image?.length" :to="`/${author}/${slug}`">
      <Image class="card__image" :src="image" />
    </router-link>

    <router-link :to="`/${author}/${slug}`" class="card__title">
      <Title :text="title" size="h3" />
    </router-link>

    <router-link v-if="showAuthor" :to="`/${author}/`">
      <div class="flex">
        <img v-if="avatar?.length" :src="avatar" :alt="`${author} profile image`" class="card__avatar" />
        <p class="card__author">{{ author }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'RecipeCard',

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
      default: null,
    },
    showAuthor: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    time: {
      type: Number,
      default: null,
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  border: 1px solid #eff3f4;
  border-radius: var(--border-radius);
  box-shadow: 0 1px 5px rgb(0 0 0 / 5%);
  padding-bottom: 0.5rem;

  .card__image {
    width: 100%;
    aspect-ratio: 3/2;
    height: auto;
    object-fit: cover;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__avatar {
    width: 2rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin-left: 0.5rem;
  }

  .flex {
    display: flex;
    place-items: center;
    gap: 0.5rem;

    .card__author {
      color: #7e7e7e;
      margin: 1rem 0rem;
      text-transform: capitalize;

      &:hover {
        filter: brightness(0.15);
      }
    }
  }

  .card__icon {
    display: flex;
    gap: 0.5rem;
    align-content: center;
    align-items: center;
  }

  .card__title > * {
    max-width: 100%;
    word-wrap: break-word;
    font-weight: 200;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 16rem;
    margin-left: 0.5rem;

    @media (max-width: 1700px) {
      width: 13rem;
    }

    @media (max-width: 820px) {
      width: 18rem;
    }
  }
}
</style>
