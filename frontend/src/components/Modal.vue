<template>
  <div class="modal" @click="close">
    <div @click.stop>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  emits: ['close'],

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
