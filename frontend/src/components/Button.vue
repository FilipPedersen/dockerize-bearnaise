<template>
  <button class="button" :class="`button--${kind || 'primary'}`" :type="type || 'button'" @click="detectClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'button',
    },
    kind: {
      type: String,
      default: 'primary',
    },
  },

  emits: ['clicked'],

  methods: {
    detectClick() {
      this.$emit('clicked');
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: var(--color-black);
  border: 2px solid var(--color-black);
  font-weight: 700;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &--primary {
    background: var(--color-highlight);
    border: 2px solid var(--color-highlight);
    color: #fff;
  }

  &--secondary {
    background: none;
    border: 2px solid var(--color-highlight);
    color: var(--color-highlight);
  }
}
</style>
