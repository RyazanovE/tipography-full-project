<script setup lang='ts'>

</script>

<template>
  <button type='button' class='button'>
    <slot />
  </button>
</template>

<style scoped lang='scss'>
.button {
  font-size: 0.875rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.6;
  }
}
</style>