<template>
  <p class="tag" :style="`background-color: ${generateRandomColor()}`">
    {{ label }}
  </p>
</template>

<script>
import generatePseudoRandomColor from '@/helpers/generatePseudoRandomColor';

export default {
  name: 'Tag',

  props: {
    label: {
      type: String,
      default: '',
    },
  },

  methods: {
    /**
     * @summary generates a psuedo random color.
     * Will always return the same if a text is passed
     */
    generateRandomColor() {
      return generatePseudoRandomColor(null, 100, 70, this.label);
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  padding: 0.5rem;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  color: rgba(0, 0, 0, 0.8);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
