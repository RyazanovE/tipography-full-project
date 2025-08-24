<script setup lang="ts">
defineProps<{
  services: {
    title: string
    img?: string
    to?: string
    icon?: string
    disabled: boolean
    text?: string
  }[]
  styles?: string
}>()
</script>

<template>
  <section class="services">
    <div class="services__cards">
      <NuxtLink
        v-for="(service, i) in services"
        :key="i"
        :to="service.disabled ? undefined : service.to"
        class="service-card"
        :class="{ 'service-card--disabled': service.disabled }"
        :style="styles"
        tabindex="0"
        @click.prevent="service.disabled && $event.preventDefault()"
      >
        <h3 class="service-card__title">
          {{ service.title }}
        </h3>
        <span style='font-size: 100px; line-height: 120px; bottom: 0; font-weight: bold;' class='chevron-icon' v-if='service.text'>
          {{ service.text }}
        </span>
        <MdiIcon v-else-if="service.icon" :icon="service.icon" size="120px" class="chevron-icon" />
        <nuxt-img v-else :src="service.img" alt="" class="service-card__img" />
      </NuxtLink>
    </div>
  </section>
</template>


<style scoped lang="scss">
.chevron-icon {
  position: absolute;
  bottom: 10px;
  right: 20px;
}

.services {
  &__title {
    margin-top: calc($normal_gap * 2);
    margin-bottom: $normal_gap;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    .service-card {
      height: 200px;
      padding: $normal_gap;
      background-color: $light_gray_background_color;
      border-radius: $border_radius_large;
      position: relative;
      cursor: pointer;
      transition: $box-shadow-transition;

      &--disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      &:hover {
        box-shadow: 0 0 0 1px #0000000a, 0 4px 4px #0000000a, 0 20px 40px #00000014;
      }

      &__title {
        margin-bottom: 10px;
      }

      &__body {
        display: flex;
        gap: 20px;
      }

      &__img {
        height: 140px;
        object-fit: cover;
        margin: 0 auto;
      }

      &__link {
        color: $dark_gray_text_color;
        font-weight: 300;
        text-align: start;
      }
    }
  }
}
</style>
