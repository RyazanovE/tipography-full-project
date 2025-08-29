<template>
  <UiCard class="payment-step">
    <UiSubHeader class="payment-step__title">
      4. Выберите способ оплаты
    </UiSubHeader>
    
    <div class="payment-step__payment-options">
      <ButtonOutline
        class="payment-step__payment-option"
        :active="paymentType === 'cash'"
        title="Наличными или картой при получении"
        hover-icon="mdiLogin"
        icon="mdiCash100"
        @click="$emit('update:paymentType', 'cash')"
      />
      <ButtonOutline
        class="payment-step__payment-option"
        :active="paymentType === 'online'"
        title="Банковской картой онлайн"
        hover-icon="mdiIncognitoCircle"
        icon="mdiCreditCard"
        @click="$emit('update:paymentType', 'online')"
      />
      <ButtonOutline
        class="payment-step__payment-option"
        :active="paymentType === 'qr'"
        title="Система быстрых платежей - QR Code"
        hover-icon="mdiIncognitoCircle"
        icon="mdiQrcode"
        @click="$emit('update:paymentType', 'qr')"
      />
    </div>
    
    <div class="payment-step__actions">
      <ButtonSolid 
        :disabled="!paymentType" 
        @click="$emit('continue')"
      >
        Продолжить
      </ButtonSolid>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
interface PaymentStepProps {
  paymentType: 'cash' | 'online' | 'qr' | null
}

interface PaymentStepEmits {
  continue: []
  'update:paymentType': ['cash' | 'online' | 'qr' | null]
}

defineProps<PaymentStepProps>()
defineEmits<PaymentStepEmits>()
</script>

<style lang="scss" scoped>
.payment-step {
  margin-bottom: $normal_gap;

  &__title {
    margin-bottom: $normal_gap;
    font-size: 1.1rem;
    font-weight: 600;
  }

  &__payment-options {
    display: flex;
    gap: 20px;
    margin-bottom: $normal_gap;
  }

  &__payment-option {
    flex: 1;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    &__payment-options {
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>
