<template>
  <div class="order-summary">
    <UiCard class="order-summary__card">
      <UiSubHeader class="order-summary__title">
        Итоги заказа
      </UiSubHeader>
      
             <!-- Cart Items -->
       <div class="order-summary__items">
         <div class="order-summary__items-header">
           <h4>Товары в заказе ({{ totalItems }})</h4>
         </div>
         
         <CartList :readonly="true" />
       </div>

      <!-- Pricing Breakdown -->
      <div class="order-summary__pricing">
        <div class="order-summary__pricing-row">
          <span>Стоимость товаров:</span>
          <span>{{ formatPrice(totalSum) }} ₽</span>
        </div>
        <div class="order-summary__pricing-row">
          <span>Доставка:</span>
          <span>{{ deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost) + ' ₽' }}</span>
        </div>
        <div class="order-summary__pricing-row order-summary__pricing-row--total">
          <span>Итого к оплате:</span>
          <span>{{ formatPrice(totalWithDelivery) }} ₽</span>
        </div>
      </div>

      <!-- Order Info -->
      <div class="order-summary__order-info">
        <div class="order-summary__info-section">
          <h5 class="order-summary__info-title">
            <MdiIcon icon="mdiAccount" size="16px" />
            Получатель
          </h5>
                     <div class="order-summary__info-content">
             <p>{{ clientInfo?.fio || 'Не указано' }}</p>
             <p>{{ clientInfo?.phone || 'Не указано' }}</p>
             <p v-if="clientInfo?.phoneBackup">{{ clientInfo.phoneBackup }}</p>
             <p>{{ clientInfo?.email || 'Не указано' }}</p>
           </div>
        </div>

        <div class="order-summary__info-section">
          <h5 class="order-summary__info-title">
            <MdiIcon icon="mdiPackageVariant" size="16px" />
            Способ получения
          </h5>
          <div class="order-summary__info-content">
            <p v-if="deliveryType === 'pickup'">
              <strong>Самовывоз</strong><br>
              г. Москва, ул. Строителей, 3<br>
              Время работы: с 9:00 до 18:00
            </p>
            <p v-else-if="deliveryType === 'delivery' && addressInfo">
              <strong>Доставка</strong><br>
              {{ addressInfo.city }}, {{ addressInfo.street }}, {{ addressInfo.house }}
              <span v-if="addressInfo.room">, кв. {{ addressInfo.room }}</span>
              <span v-if="addressInfo.comment"><br>{{ addressInfo.comment }}</span>
            </p>
            <p v-else>Способ доставки не выбран</p>
          </div>
        </div>

        <div class="order-summary__info-section">
          <h5 class="order-summary__info-title">
            <MdiIcon icon="mdiCreditCard" size="16px" />
            Оплата
          </h5>
          <div class="order-summary__info-content">
            <p v-if="paymentType === 'cash'">
              <strong>Наличными или картой при получении</strong>
            </p>
            <p v-else-if="paymentType === 'online'">
              <strong>Банковской картой онлайн</strong>
            </p>
            <p v-else-if="paymentType === 'qr'">
              <strong>Система быстрых платежей - QR Code</strong>
            </p>
            <p v-else>Способ оплаты не выбран</p>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="order-summary__actions">
        <ButtonSolid 
          class="order-summary__confirm-button"
          :disabled="!isOrderComplete"
          @click="$emit('confirm-order')"
        >
          <MdiIcon icon="mdiCheck" size="18px" />
          Подтвердить заказ
        </ButtonSolid>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import type { ClientInfo, AddressInfo } from '~/types/orders'

interface OrderSummaryProps {
  clientInfo?: ClientInfo
  addressInfo?: AddressInfo
  deliveryType?: 'delivery' | 'pickup' | null
  paymentType?: 'cash' | 'online' | 'qr' | null
}

interface OrderSummaryEmits {
  'confirm-order': []
}

const props = withDefaults(defineProps<OrderSummaryProps>(), {
  deliveryType: null,
  paymentType: null
})

const emit = defineEmits<OrderSummaryEmits>()

const cart = useCart()

const totalItems = computed(() => {
  return cart.cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const totalSum = computed(() => {
  return cart.cartItems.value.reduce((sum, item) => sum + (item.options.summ * item.quantity), 0)
})

const deliveryCost = computed(() => {
  // Free delivery for orders over 5000 rubles, otherwise 500 rubles
  return totalSum.value >= 5000 ? 0 : 500
})

const totalWithDelivery = computed(() => {
  return totalSum.value + deliveryCost.value
})

const isOrderComplete = computed(() => {
  return props.clientInfo?.fio && 
         props.clientInfo?.phone && 
         props.clientInfo?.email &&
         props.deliveryType &&
         props.paymentType
})

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price)
}
</script>

<style lang="scss" scoped>
.order-summary {
  width: 100%;
  max-width: 100%;
  height: fit-content;

  &__card {
    padding: $normal_gap;
  }

  &__title {
    margin-bottom: $normal_gap;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1f2937;
  }

  &__items {
    margin-bottom: $normal_gap;
  }

  &__items-header {
    margin-bottom: 12px;
    
    h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }
  }



  &__pricing {
    border-top: 2px solid #e5e7eb;
    border-bottom: 2px solid #e5e7eb;
    padding: $normal_gap 0;
    margin-bottom: $normal_gap;
  }

  &__pricing-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;

    &:last-child {
      margin-bottom: 0;
    }

    &--total {
      font-weight: 600;
      font-size: 16px;
      color: #1f2937;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #e5e7eb;
    }
  }

  &__order-info {
    margin-bottom: $normal_gap;
  }

  &__info-section {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__info-title {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
  }

  &__info-content {
    p {
      margin: 0 0 4px 0;
      font-size: 13px;
      line-height: 1.4;
      color: #6b7280;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__actions {
    margin-top: $normal_gap;
  }

  &__confirm-button {
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
}
</style>
