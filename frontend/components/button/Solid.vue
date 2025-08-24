<script setup lang="ts">

defineProps<{ variant?: "primary" | "secondary" | 'outline', isLoading?: boolean, disabled?: boolean }>()
</script>

<template>
  <button type="button" :disabled class="button" :class="[`button_${variant ?? 'primary'}`, disabled ? 'button_disabled' : '']">
    <slot v-if='!isLoading' />
    <UiLoader v-else style='transform: scale(0.6); padding: 0px' />
</button>
</template>

<style scoped lang="scss">
// Переменные для кнопки


.button {
  height: 44px;
  padding: $button-padding-y $button-padding-x;
  font-size: $button-font-size;
  font-weight: $button-font-weight;
  border-radius: $button-border-radius;
  border: none;
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;

  &_primary {
    background: $primary-background-color;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      background: $primary_dark_background;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &_disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &_secondary {
    background-color: $secondary-bg;
    color: $text-color-secondary;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: $secondary-hover-bg;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &_outline {
    border: 1px solid $primary_background_color;
    color: $primary_background_color;
    background-color: $white-color;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: $primary_background_color;
      color: $white-color;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
