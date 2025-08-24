<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()

const modelValue = defineModel()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>


<template>
  <label class="checkbox">
    <input class="checkbox__input" type="checkbox" v-model="modelValue" :disabled="disabled" />
    <span class="checkbox__box"></span>
    <span class="checkbox__label">
      <slot />
    </span>
  </label>
</template>


<style scoped lang="scss">
.checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  user-select: none;
  height: 20px;

  &__input {
    display: none;
  }

  &__box {
    width: 20px;
    height: 20px;
    border: 2px solid $light_gray_background_color;
    border-radius: 4px;
    background-color: $light_gray_background_color;
    transition: 0.3s ease;
    position: relative;
    transition: $all-transition;
    border: 1px solid $primary_border_color;


    &:hover {
      box-shadow: $box_shadow_normal;
    }
  }

  &__input:checked+&__box {
    background-color: $primary_background_color;
    border-color: $primary_background_color;
  }

  &__input:checked+&__box::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 2px;
    width: 6px;
    height: 12px;
    border: solid $white_background_color;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &__label {
    font-size: 14px;
  }

  &:has(&__input:disabled) {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
