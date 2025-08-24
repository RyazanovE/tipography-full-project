<script setup lang="ts">
const supportRequests = [
  {
    id: 1,
    title: 'Проблема с качеством печати',
    description: 'Неудовлетворительное качество печати на последнем заказе. Прошу разобраться.',
    date: '26.04.2025',
    status: 'В процессе'
  },
  {
    id: 2,
    title: 'Запрос на изменение дизайна',
    description: 'Необходимо внести изменения в дизайн визиток. Просьба проверить и утвердить.',
    date: '24.04.2025',
    status: 'Закрыто'
  }
]


useInitiateBreadcrumbs([
  ...breadcrumbsDefaultValue,
  {
    title: 'Текущие обращения',
    to: '/my/tekushie-obrasheniya'
  }
])

</script>

<template>
  <MyWrapper>
    <section class="support">
      <div class="support__list">
        <div v-for="request in supportRequests" :key="request.id" class="support-card">
          <div class="support-card__content">
            <div class="support-card__header">
              <h3 class="support-card__title">{{ request.title }}</h3>
              <span class="support-card__status">{{ request.status }}</span>
            </div>
            <p class="support-card__description">{{ request.description }}</p>
            <p class="support-card__info">Дата: {{ request.date }}</p>
          </div>
        </div>
      </div>
    </section>
  </MyWrapper>
</template>

<style scoped lang="scss">
.support {
  &__title {
    font-weight: 600;
    margin-bottom: 16px;
    color: $dark_gray_text_color;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.support-card {
  display: flex;
  flex-direction: column;
  background-color: $white_background_color;
  border: 1px solid $primary_border_color;
  border-radius: $border_radius_small;
  padding: 16px;
  box-shadow: $box_shadow_flat;
  transition: $all-transition;

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__title {
    font-size: $font_size_large;
    font-weight: 600;
    color: $dark_gray_text_color;
  }

  &__status {
    font-size: $font_size_small;
    background-color: $secondary_bg;
    color: $text-color-secondary;
    padding: 4px 8px;
    border-radius: 6px;
  }

  &__description {
    font-size: $font_size_small;
    color: $dark_gray_text_color;
    margin-bottom: 8px;
  }

  &__info {
    font-size: $font_size_small;
    color: $light_gray_text_color;
  }
}
</style>
