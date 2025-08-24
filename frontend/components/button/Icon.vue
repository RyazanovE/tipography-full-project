<script setup lang="ts">
const props = defineProps<{
  inline?: boolean
  icon: any
  primary?: boolean
  row?: boolean
  active?: boolean
  iconActiveColorChange?: boolean
  solid?: boolean
}>()
</script>

<template>
  <button
    :class="{ button_row: props.row, button_active: props.active, button_inline: props.inline, button_solid: props.solid }"
    type="button"
    class="button"
  >
    <MdiIcon
      :class="{ button__icon_active: props.iconActiveColorChange && props.active }"
      class="button__icon"
      :icon="props.icon"
      size="25px"
    />
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  padding: 10px;

  display: flex;
  align-items: center;
  flex-direction: column;

  font-size: $font_size_normal;
  font-weight: normal;
  border-radius: $border_radius_small;

  transition: background-color 0.3s ease;
  

  &:active {
    transform: scale(0.98);
  }

  &_inline {
    flex-direction: row;
    gap: calc($normal_gap/2);
  }

  &_solid {
    background: $primary_background;
    color: $white-text-color;

    .button__icon > * {
      color: $white-text-color;
    }

    &:hover {
      background: $primary_dark_background;
    }
  }

  &_row {
    flex-direction: row;
  }

  &_active {
    background-color: $light_gray_background_color;
  }

  &:hover {
    background-color: $light_gray_background_color;
  }

  &__icon > * {
    color: $light_gray_text_color;
  }

  &__icon_active > * {
    color: $primary_background_color;
  }
}
</style>
