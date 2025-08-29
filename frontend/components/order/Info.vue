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

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price)
}
</script>

<template>
  <div class="order-final-info">
    <!-- Client and Delivery Info -->
    <div class="order-final-info__content">
      <!-- Client Info Card -->
      <UiCard class="order-final-info__card">
        <UiSubHeader class="order-final-info__card-title">
          <MdiIcon icon="mdiAccount" size="18px" />
          Данные получателя
        </UiSubHeader>
        
        <div class="order-final-info__info-list">
          <div class="order-final-info__info-item">
            <span class="order-final-info__info-label">ФИО:</span>
            <span class="order-final-info__info-value">{{ clientInfo?.fio || 'Не указано' }}</span>
          </div>
          <div class="order-final-info__info-item">
            <span class="order-final-info__info-label">Телефон:</span>
            <span class="order-final-info__info-value">{{ clientInfo?.phone || 'Не указано' }}</span>
          </div>
          <div class="order-final-info__info-item">
            <span class="order-final-info__info-label">Email:</span>
            <span class="order-final-info__info-value">{{ clientInfo?.email || 'Не указано' }}</span>
          </div>
        </div>
      </UiCard>

      <!-- Delivery Info Card -->
      <UiCard class="order-final-info__card">
        <UiSubHeader class="order-final-info__card-title">
          <MdiIcon icon="mdiTruckDelivery" size="18px" />
          Способ получения
        </UiSubHeader>
        
        <div class="order-final-info__info-list">
          <div class="order-final-info__info-item">
            <span class="order-final-info__info-label">Тип доставки:</span>
            <span class="order-final-info__info-value">
              {{ selectedDeliveryMethod === 1 ? 'Самовывоз' : 
                 selectedDeliveryMethod === 2 ? 'Курьер' : 
                 selectedDeliveryMethod === 3 ? 'Транспортная компания' : 'Не указано' }}
            </span>
          </div>
          
          <div v-if="selectedDeliveryMethod === 1" class="order-final-info__info-item">
            <span class="order-final-info__info-label">Адрес офиса:</span>
            <span class="order-final-info__info-value">г. Москва, ул. Строителей, 3</span>
          </div>
          
          <div v-if="selectedDeliveryMethod === 2 && addressInfo" class="order-final-info__info-item">
            <span class="order-final-info__info-label">Адрес доставки:</span>
            <span class="order-final-info__info-value">
              г. {{ addressInfo.city }}, ул. {{ addressInfo.street }}, д. {{ addressInfo.house }}, кв. {{ addressInfo.room }}
            </span>
          </div>
          
          <div v-if="selectedDeliveryMethod === 3 && tkInfo" class="order-final-info__info-item">
            <span class="order-final-info__info-label">ТК адрес:</span>
            <span class="order-final-info__info-value">{{ tkInfo.address }}</span>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- Order Summary -->
    <UiCard class="order-final-info__summary-card">
      <UiSubHeader class="order-final-info__card-title">
        <MdiIcon icon="mdiClipboardList" size="18px" />
        Состав заказа
      </UiSubHeader>
      
      <div class="order-final-info__items-list">
        <div v-for="item in cartItems" :key="item.id" class="order-final-info__item">
          <div class="order-final-info__item-info">
            <div class="order-final-info__item-name">
              {{ item.type }} {{ item.options.amount }}шт.
            </div>
            <div class="order-final-info__item-details">
              {{ item.quantity }} × {{ formatPrice(item.options.summ) }} ₽
            </div>
          </div>
          <div class="order-final-info__item-total">
            {{ formatPrice(item.quantity * item.options.summ) }} ₽
          </div>
        </div>
      </div>

      <!-- Pricing Summary -->
      <div class="order-final-info__pricing">
        <div class="order-final-info__pricing-row">
          <span>Товары:</span>
          <span>{{ formatPrice(cartItemsSum) }} ₽</span>
        </div>
        <div class="order-final-info__pricing-row">
          <span>Доставка:</span>
          <span>{{ formatPrice(deliveryPrice) }} ₽</span>
        </div>
        <div class="order-final-info__pricing-row order-final-info__pricing-row--total">
          <span>Итого:</span>
          <span>{{ formatPrice(cartItemsSum + deliveryPrice) }} ₽</span>
        </div>
      </div>
    </UiCard>
  </div>
</template>

<style scoped lang="scss">
.order-final-info {
  display: flex;
  flex-direction: column;
  gap: $normal_gap;

  &__content {
    display: grid;
    align-items: stretch;
    grid-template-columns: 1fr 1fr;
    gap: $normal_gap;
  }

  &__card {
  }

  &__card-title {
    display: flex;
    align-items: center;
    gap: calc($normal_gap / 3);
    margin-bottom: $normal_gap;
    font-size: 1.1rem;
    color: #1f2937;
  }

  &__info-list {
    display: flex;
    flex-direction: column;
    gap: calc($normal_gap / 2);
  }

  &__info-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: calc($normal_gap / 3) 0;
    border-bottom: 1px solid #f3f4f6;
    
    &:last-child {
      border-bottom: none;
    }
  }

  &__info-label {
    font-weight: 500;
    color: #6b7280;
    min-width: 120px;
    flex-shrink: 0;
  }

  &__info-value {
    font-weight: 600;
    color: #1f2937;
    text-align: right;
    word-break: break-word;
  }

  &__summary-card {
    margin-top: calc($normal_gap / 2);
  }

  &__items-list {
    display: flex;
    flex-direction: column;
    gap: calc($normal_gap / 2);
    margin-bottom: $normal_gap;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc($normal_gap / 2);
    background-color: #f9fafb;
    border-radius: $border_radius_small;
    border: 1px solid #e5e7eb;
  }

  &__item-info {
    flex: 1;
  }

  &__item-name {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: calc($normal_gap / 4);
  }

  &__item-details {
    font-size: 0.9rem;
    color: #6b7280;
  }

  &__item-total {
    font-weight: 700;
    color: #1f2937;
    font-size: 1.1rem;
  }

  &__pricing {
    border-top: 2px solid #e5e7eb;
    padding-top: $normal_gap;
  }

  &__pricing-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc($normal_gap / 3) 0;
    font-size: 1rem;

    &--total {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1f2937;
      border-top: 1px solid #e5e7eb;
      margin-top: calc($normal_gap / 2);
      padding-top: calc($normal_gap / 2);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    &__content {
      grid-template-columns: 1fr;
      gap: calc($normal_gap / 2);
    }

    &__info-item {
      flex-direction: column;
      align-items: flex-start;
      gap: calc($normal_gap / 4);
    }

    &__info-label {
      min-width: auto;
    }

    &__info-value {
      text-align: left;
    }

    &__item {
      flex-direction: column;
      align-items: flex-start;
      gap: calc($normal_gap / 3);
    }

    &__item-total {
      align-self: flex-end;
    }
  }
}
</style>
