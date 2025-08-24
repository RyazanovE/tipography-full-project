<script lang="ts" setup>
import type { ClientInfo } from '~/types/orders'

defineProps<{
  clientInfo: ClientInfo | null
}>()
</script>

<template>
  <div class="order-success__details-block">
    <div class="order-final-info__card">
      <h4 class="order-final-info__title">Данные получателя</h4>
      <ul class="order-info-list">
        <li class="order-info-list__item">
          ФИО:
          <span class="order-info-list__item_bold">{{ clientInfo?.fio }}</span>
        </li>
        <li class="order-info-list__item">
          Телефон:
          <span class="order-info-list__item_bold">{{ clientInfo?.phone }}</span>
        </li>
        <li class="order-info-list__item">
          Почта:
          <span class="order-info-list__item_bold">{{ clientInfo?.email }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-info-list {
  display: flex;
  flex-direction: column;
  gap: calc($normal_gap / 4);

  &__item {
    &_bold {
      font-weight: bolder;
      margin-left: calc($normal_gap / 2);
    }
  }
}

.order-final-info__card {
  flex: 1;
  padding: $normal_gap;
  background-color: $light_gray_background_color;
  border-radius: $border_radius_normal;
  border: 1px solid $primary_border_color;
  font-size: $font-size_normal;
  line-height: 1.5;
  white-space: pre-line;
}

.order-final-info__title {
  margin-bottom: calc($normal_gap / 2);
}
</style>
