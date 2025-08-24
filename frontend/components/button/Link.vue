<script setup lang='ts'>

</script>

<template>
  <button type='button' class='button'>
    <slot />
  </button>
</template>

<style scoped lang='scss'>
.button {
  transition: opacity 0.3s ease;
  cursor: pointer;
  color: $primary_background_color;
  text-decoration: dashed underline;
  text-underline-position: under;

  &:hover {
    opacity: 0.6;
  }
}
</style>