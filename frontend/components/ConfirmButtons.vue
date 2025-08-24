<template>
  <div class="calculation-form__summ">
    <div class="summ">
      <span class="summ__value">от {{ summ }} руб.</span>
      <UiTooltip> {{tooltipText}} </UiTooltip>
    </div>
    <ButtonSolid style='color: white' @click="$emit('addToCart')"> В корзину </ButtonSolid>
  </div>
</template>

<script setup lang="ts">
defineProps<{ summ: number, tooltipText: string }>()
</script>

<style scoped lang="scss">
  .calculation-form__summ {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .summ {
      display: flex;
      align-items: center;
      gap: calc($normal_gap / 2);

      &__value {
        color: black;
        font-weight: 600;
        font-size: $font-size_larger;
      }
    }
  }
</style>
