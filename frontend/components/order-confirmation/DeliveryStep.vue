<template>
  <UiCard class="delivery-step">
    <UiSubHeader class="delivery-step__title">
      3. Выберите способ получения
    </UiSubHeader>
    
    <!-- Delivery Type Selection -->
    <div class="delivery-step__delivery-options">
      <ButtonOutline
        class="delivery-step__delivery-option"
        title="Самовывоз"
        hover-icon="mdiLogin"
        :active="deliveryType === 'pickup'"
        icon="mdiMapMarkerDown"
        @click="$emit('update:deliveryType', 'pickup')"
      />
      <ButtonOutline
        class="delivery-step__delivery-option"
        title="Доставка"
        :active="deliveryType === 'delivery'"
        hover-icon="mdiMapMarkerDown"
        icon="mdiTruckDeliveryOutline"
        @click="$emit('update:deliveryType', 'delivery')"
      />
    </div>

    <!-- Pickup Information -->
    <div v-show="deliveryType === 'pickup'" class="delivery-step__pickup-info">
      <UiSubHeader class="delivery-step__section-title">
        Самовывоз из офиса
      </UiSubHeader>
      <div class="delivery-step__office-info">
        <div class="delivery-step__office-details">
          <p>г. Москва, ул. Строителей, 3</p>
          <p>Время работы: с 9:00 до 18:00</p>
        </div>
      </div>
      <div>
      <Map style='width: 800px; margin: 0 auto'/>
    </div>
    </div>

    <!-- Delivery Address Form -->
    <div v-show="deliveryType === 'delivery'" class="delivery-step__delivery-form">
      <h4 class="delivery-step__section-title">
        Введите адрес доставки
      </h4>
      <div class="delivery-step__form-fields">
        <UiInput
          v-model="addressInfo.city"
          required
          :error="errors.includes('city')"
          label="Город"
          placeholder="Название города"
          id="city"
        />
        <UiInput
          v-model="addressInfo.street"
          required
          :error="errors.includes('street')"
          label="Улица"
          placeholder="Название улицы"
          id="street"
        />
        <UiInput
          v-model="addressInfo.house"
          required
          :error="errors.includes('house')"
          label="Дом"
          placeholder="Номер дома"
          id="house"
        />
        <UiInput
          v-model="addressInfo.room"
          required
          :error="errors.includes('room')"
          label="Квартира/офис"
          placeholder="Номер квартиры"
          id="room"
        />
        <UiInput
          v-model="addressInfo.comment"
          textarea
          label="Комментарий"
          placeholder="Комментарий к адресу"
          id="comment"
        />
      </div>
    </div>

    <div class="delivery-step__actions">
      <ButtonSolid 
        :disabled="!isStepComplete" 
        @click="$emit('continue')"
      >
        Продолжить
      </ButtonSolid>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { AddressInfo } from '~/types/orders'

interface DeliveryStepProps {
  deliveryType: 'delivery' | 'pickup' | null
  addressInfo: AddressInfo
  errors: string[]
}

interface DeliveryStepEmits {
  continue: []
  'update:deliveryType': ['delivery' | 'pickup' | null]
  'update:addressInfo': [AddressInfo]
}

const props = defineProps<DeliveryStepProps>()
const emit = defineEmits<DeliveryStepEmits>()

const isStepComplete = computed(() => {
  if (props.deliveryType === 'pickup') return true
  
  if (props.deliveryType === 'delivery') {
    return Object.keys(props.addressInfo).every(
      (key) => key === 'comment' || props.addressInfo[key as keyof AddressInfo]
    )
  }
  
  return false
})
</script>

<style lang="scss" scoped>
.delivery-step {
  margin-bottom: $normal_gap;

  &__title {
    margin-bottom: $normal_gap;
    font-size: 1.1rem;
    font-weight: 600;
  }

  &__section-title {
    margin: 20px 0;
    font-size: 1rem;
    font-weight: 500;
  }

  &__delivery-options {
    display: flex;
    gap: 20px;
    margin-bottom: $normal_gap;
  }

  &__delivery-option {
    flex: 1;
  }

  &__pickup-info {
    margin-top: 20px;
  }

  &__office-info {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  &__office-details {
    display: flex;
    flex-direction: column;
    text-align: center;
    
    p {
      margin: 0;
      line-height: 1.5;
    }
  }

  &__delivery-form {
    margin-top: 20px;
  }

  &__form-fields {
    display: flex;
    flex-direction: column;
    gap: $normal_gap;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    &__delivery-options {
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>
