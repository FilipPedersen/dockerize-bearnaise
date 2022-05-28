<template>
  <input type="text" placeholder="Search for something..." class="searchbar" />
</template>

<script>
export default {
  name: 'SearchBar',
};
</script>

<style lang="scss" scoped>
.searchbar {
  display: none;

  @media (min-width: 1024px) {
    text-align: center;
    border-radius: 4px;
    border: solid 1px var(--color-black);
    width: 100%;
    height: 2rem;
    margin-bottom: 1.5rem;
    padding: 0.2rem;
    gap: 1rem;
    height: fit-content;
    margin-top: 1rem;
    display: block;
  }
}
</style>
