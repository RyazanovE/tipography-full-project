<template>
  <div class="card">
    <UiSubHeader v-if="titleSlot" class="card__title">
      <slot name="title" />
    </UiSubHeader>
    <p v-if="subtitleSlot" class="card__subtitle">
      <slot name="subtitle" />
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">

const titleSlot = useSlots().title
const subtitleSlot = useSlots().subtitle
</script>

<style scoped lang="scss">
.card {
  background-color: $white_background_color;
  padding: 32px;
  border-radius: $border_radius_normal;
  box-shadow: $box_shadow_flat;

  &__title {
    margin-bottom: 20px;
  }

  &__subtitle {
    margin-bottom: $normal_gap;
  }
}
</style>
