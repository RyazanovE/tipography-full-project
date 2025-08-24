<script setup lang="ts">
defineProps<{
  title: string
  text?: string
  hoverIcon: any
  icon: any
  active?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <div :class="{ mockup_active: active, mockup_disabled: disabled }" class="mockup">
    <div class="mockup__title">
      <span> {{ title }} </span>
    </div>
    <div class="ready-mockup">
      <MdiIcon class="ready-mockup__icon" :icon="icon" size="60px" />
      <span v-if="text" class="ready-mockup__text"> {{ text }} </span>
      <MdiIcon class="mockup__file-icon" :icon="hoverIcon" size="40px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.mockup {
  position: relative;
  height: 100px;
  padding: calc($normal_gap / 2) $normal_gap;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: $border_radius_normal;
  flex: 1;
  background-color: $light_gray_background_color;
  cursor: pointer;
  border: 1px solid $primary_border_color;
  transition: $all-transition;
  overflow: hidden;

  &_active {
    border-color: black;
  }

  &_disabled {
    cursor: not-allowed;
    opacity: 0.7;

    &::before,
    &::after {
      opacity: 0 !important;
    }

    .mockup__file-icon {
      opacity: 0 !important;
    }
  }

  &__file-icon {
    position: absolute;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: 0.3s ease;
    z-index: 10;
    transition: $all-transition;

    &_with-delete {
      left: 65%;
    }

    &_delete {
      transform: translate(-50%, -50%);
      top: 50%;
      left: 35%;
    }

    &:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }

    & > * {
      fill: $white_background_color;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0; // top:0; right:0; bottom:0; left:0;
    opacity: 0;
    transition: $all-transition;
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    z-index: 9;
    transition: $all-transition;
    border-radius: $border_radius_normal;
  }

  &:hover {
    .mockup__file-icon {
      opacity: 1;
    }

    &::after,
    &::before {
      opacity: 1;
    }
  }

  .mockup__title {
    font-size: $font-size_normal;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ready-mockup {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__icon {
      height: 40px;
    }

    &__text {
      padding-left: calc($normal_gap / 4);
      font-size: $font_size_small;
    }
  }

  .mockup-imgs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    &__img {
      height: 38px;
    }

    .mockup-file {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      height: 80px;

      &__img {
        height: 40px;
      }

      &__name {
        font-size: 12px;
      }
    }
  }
}
</style>
