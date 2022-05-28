<template>
  <div class="tos-wrapper">
    <Title class="tos-wrapper__title" text="Terms of Service" size="h2" />
    <Title text="Gyldigt fra" size="h3" />
    <p class="tos-wrapper__p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis necessitatibus non dolores mollitia, commodi
      quos harum debitis consectetur incidunt nisi expedita error maxime enim assumenda at, nihil vero velit natus.
    </p>
    <Title text="1. lorem" size="h3" />
    <p class="tos-wrapper__p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis necessitatibus non dolores mollitia, commodi
      quos harum debitis consectetur incidunt nisi expedita error maxime enim assumenda at, nihil vero velit natus.
    </p>
    <Title text="2. lorem" size="h3" />
    <p class="tos-wrapper__p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis necessitatibus non dolores mollitia, commodi
      quos harum debitis consectetur incidunt nisi expedita error maxime enim assumenda at, nihil vero velit natus.
    </p>
    <Title text="3. lorem" size="h3" />
    <p class="tos-wrapper__p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis necessitatibus non dolores mollitia, commodi
      quos harum debitis consectetur incidunt nisi expedita error maxime enim assumenda at, nihil vero velit natus.
    </p>
    <Title text="4. lorem" size="h3" />
    <p class="tos-wrapper__p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis necessitatibus non dolores mollitia, commodi
      quos harum debitis consectetur incidunt nisi expedita error maxime enim assumenda at, nihil vero velit natus.
    </p>
    <Title text="5. lorem" size="h3" />
    <p class="tos-wrapper__p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis necessitatibus non dolores mollitia, commodi
      quos harum debitis consectetur incidunt nisi expedita error maxime enim assumenda at, nihil vero velit natus.
    </p>
    <Title text="6. lorem" size="h3" />
    <p class="tos-wrapper__p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis necessitatibus non dolores mollitia, commodi
      quos harum debitis consectetur incidunt nisi expedita error maxime enim assumenda at, nihil vero velit natus.
    </p>
    <Title text="7. lorem" size="h3" />
    <p class="tos-wrapper__p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis necessitatibus non dolores mollitia, commodi
      quos harum debitis consectetur incidunt nisi expedita error maxime enim assumenda at, nihil vero velit natus.
    </p>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'TermOfService',

  components: {
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
  },
};
</script>

<style lang="scss" scoped>
.tos-wrapper__title {
  text-align: center;
}
</style>
