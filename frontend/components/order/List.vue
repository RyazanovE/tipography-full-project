<script setup lang="ts">
import { orderStatusDict } from '~/constants/order'
import type { Order } from '~/types/orders'

defineProps<{ orders: Order[] }>()

const getTotalSumm = (order: Order) => order.items.reduce((acc, item) => acc + item.options.summ, 0)
</script>

<template>
  <div class="orders">
    <ul v-if="orders.length" class="orders__list">
      <li
        v-for="order in orders"
        :key="order.id"
        class="order-card"
        @click="$emit('openOrder', order)"
      >
        <!-- <img :src="order.image" alt="Order preview" class="order-card__image" /> -->
        <div class="order-card__content">
          <div class="order-card__header">
            <h3 class="order-card__title">{{ order.orderNumber }}</h3>
            <span
              class="order-card__status"
              :style="{ backgroundColor: orderStatusDict[order.status].color }"
              >{{ orderStatusDict[order.status].text }}</span
            >
          </div>
          <div class="order-card__info-container">
            <span class="order-card__info"
              >Дата: {{ new Date(order.createdAt).toLocaleDateString() }}
            </span>
            <span class="order-card__info"> Стоимость: {{ getTotalSumm(order) }} руб. </span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="orders__empty">
      <p>Нет заказов</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.orders {
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

.order-card {
  display: flex;
  gap: 16px;
  background-color: $white_background_color;
  border: 1px solid $primary_border_color;
  border-radius: $border_radius_small;
  padding: 16px;
  transition: $all-transition;
  cursor: pointer;

  &:hover {
    box-shadow: $box_shadow_normal;
    border-color: $hover_border_color;
  }

  &__info-container {
    display: flex;
    justify-content: space-between;
  }

  &__image {
    width: 80px;
    height: 80px;
    border-radius: $border_radius_small;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    font-weight: 600;
    background-color: $secondary_bg;
    color: $text-color-secondary;
    padding: 4px 8px;
    border-radius: 6px;
  }

  &__info {
    font-size: $font_size_normal;
    color: $light_gray_text_color;
  }
}
</style>
