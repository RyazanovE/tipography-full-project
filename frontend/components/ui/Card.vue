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
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;

    /* &:hover {
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    } */
  }
</style>
