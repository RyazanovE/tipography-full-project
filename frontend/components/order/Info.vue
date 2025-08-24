<script lang="ts" setup>
import type { ClientInfo, DeliveryMethod, AddressInfo, TkInfo } from '~/types/orders'

const emits = defineEmits(['changeConfirmationStep'])

const props = defineProps<{
  cartItems: CartItem[]
  clientInfo: ClientInfo
  selectedDeliveryMethod: DeliveryMethod
  addressInfo: AddressInfo | null
  tkInfo: TkInfo | null
}>()

const deliveryPrice = 200
const cartItemsSum = computed(() =>
  props.cartItems.reduce((acc, item) => acc + item.options.summ, 0)
)
</script>

<template>
  <div class="order-final-info">
    <div class="order-final-info__content">
      <OrderClientInfo :clientInfo />
      <OrderDeliveryInfo :selectedDeliveryMethod :addressInfo :tkInfo />
    </div>

    <div class="order-success__summary">
      <h4>Состав заказа</h4>
      <ul class="order-items-list">
        <li v-for="item in cartItems" :key="item.id" class="order-items-list__item">
          {{ item.type }} {{ item.options.amount }}шт.
          <br />
          кол-во: {{ item.quantity }} x {{ item.options.summ }} ₽
          <strong>{{ item.quantity * item.options.summ }} ₽</strong>
        </li>
      </ul>

      <div class="order-total">
        <div class="order-total__row">
          <span>Товары:</span>
          <strong>{{ cartItemsSum }} ₽</strong>
        </div>
        <div class="order-total__row">
          <span>Доставка:</span>
          <strong>{{ deliveryPrice }} ₽</strong>
        </div>
        <div class="order-total__row order-total__row--main">
          <span>Итого:</span>
          <strong>{{ cartItemsSum + deliveryPrice }} ₽</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-final-info {
  text-align: left;

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $normal_gap;
    margin-bottom: $normal_gap;
  }

  &__header {
    margin-bottom: $normal_gap;
  }

  &__title {
    margin-bottom: $normal_gap;
  }

  &__cart {
    margin-bottom: $normal_gap;
  }

  &__client-info {
    display: flex;
    flex-direction: column;
  }

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
}

.order-items-list {
  list-style: none;
  padding: 0;
  margin: 0 0 $normal_gap 0;

  &__item {
    display: flex;
    justify-content: space-between;
    padding: calc($normal_gap / 2) 0;
    border-bottom: 1px solid $light_gray_background_color;

    strong {
      font-weight: 600;
    }
  }
}

.order-success__summary {
  border-top: 1px solid $primary_border_color;
  padding-top: $normal_gap;
  text-align: left;

  h4 {
    margin-bottom: calc($normal_gap / 2);
    font-weight: 600;
  }
}

.order-total {
  &__row {
    display: flex;
    justify-content: space-between;
    padding: calc($normal_gap / 3) 0;

    &--main {
      margin-top: calc($normal_gap / 2);
      padding-top: calc($normal_gap / 2);
      border-top: 1px solid $primary_border_color;
      font-size: 18px;
    }
  }
}
</style>
