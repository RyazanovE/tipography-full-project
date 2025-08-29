<template>
  <div class="order-confirmation">
    <!-- Header and Progress -->
    <UiHeader class="order-confirmation__title">Оформление заказа</UiHeader>
    <StepProgressBar 
      :steps="steps" 
      :current-step="confirmationStep" 
      :disabled="auth.user.value ? [0] : false"
      @step-click="handleStepClick" 
    />

    <!-- Main Content -->
    <div v-if="cart.cartItems.value.length" class="order-confirmation__layout">
      <!-- Left Column - Form Steps -->
      <div :style="{  flex:  confirmationStep === 4 ? 'none' : '1' }">
        <!-- Step 0: Authentication -->
        <div v-show="confirmationStep === 0" class="order-confirmation__container">
          <ClientInfo
            v-model:step="confirmationStep"
            v-model:selected-auth-method="selectedAuthMethod"
            v-model:client-info="clientInfo"
            :errors="errors"
          />
          <DeliveryInfo
            v-if="confirmationStep > 0"
            v-model:selected-delivery-method="selectedDeliveryMethod"
            v-model:address-info="addressInfo"
            v-model:tk-info="tkInfo"
            :confirmation-step="confirmationStep"
            :errors="errors"
          />
        </div>

        <!-- Step 1: Contact Information -->
        <OrderConfirmationContactInfo
          v-show="confirmationStep === 1"
          v-model:client-info="clientInfo"
          :errors="errors"
          :disabled="confirmationStep > 1"
          @continue="validateClient"
        />

        <!-- Step 2: Delivery -->
        <OrderConfirmationDeliveryStep
          v-show="confirmationStep === 2"
          v-model:delivery-type="deliveryType"
          v-model:address-info="addressInfo"
          :errors="errors"
          @continue="confirmationStep = 3"
        />

        
        <!-- Step 3: Payment -->
        <OrderConfirmationPaymentStep
          v-show="confirmationStep === 3"
          v-model:payment-type="paymentType"
          @continue="confirmationStep = 4"
        />
      </div>

      <!-- Right Column - Order Summary -->
      <div :style="{  flex:  confirmationStep === 4 ? '1' : '0 0 400px' }" class="order-confirmation__summary">
        <OrderConfirmationOrderSummary 
          :client-info="clientInfo"
          :address-info="addressInfo"
          :delivery-type="deliveryType"
          :payment-type="paymentType"
          @confirm-order="confirmOrder"
        />
      </div>
    </div>


    <!-- Loading State -->
    <UiLoader v-else />
  </div>
</template>

<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
import { formOrderPayload } from '~/helpers/podtverzhdenie-zakaza'
import type {
  DeliveryMethod,
  AuthMethod,
  ConfirmationStep,
  ClientInfo,
  AddressInfo,
  TkInfo
} from '~/types/orders'

// Reactive State
const deliveryType = ref<'delivery' | 'pickup' | null>('pickup')
const paymentType = ref<'cash' | 'online' | 'qr' | null>(null)
const selectedDeliveryMethod = ref<DeliveryMethod>(null)
const selectedAuthMethod = ref<AuthMethod>(null)
const confirmationStep = ref<ConfirmationStep>(0)
const errors = ref<string[]>([])



// Composables
const breadcrumbs = useBreadcrumbs()
const auth = useAuth()
const cart = useCart()

// Form Data
const clientInfo = ref<ClientInfo>({
  fio: '',
  phone: '',
  email: '',
  phoneBackup: ''
})

const addressInfo = ref<AddressInfo>({
  city: '',
  street: '',
  house: '',
  room: '',
  comment: ''
})

const tkInfo = ref<TkInfo>({
  address: ''
})

// Constants
const steps = [
  {
    label: 'Войти в аккаунт?',
    description: 'Войдите или продолжите оформление как гость'
  },
  {
    label: 'Данные получателя',
    description: 'Заполните основную информацию о себе'
  },
  {
    label: 'Способ получения',
    description: 'Выберите способ получения товара'
  },
  {
    label: 'Способ оплаты',
    description: 'Выберите способ оплаты'
  },
  {
    label: 'Подтверждение',
    description: 'Проверьте и подтвердите введенные данные'
  }
]

// Computed Properties
const isClientFormValid = computed(() => {
  return clientInfo.value.fio && 
         clientInfo.value.email && 
         clientInfo.value.phone
})

// Lifecycle
onMounted(async () => {
  setupBreadcrumbs()
  updateUserInfo()
  await cart.refreshCart()

  if (cart.cartItems.value.length === 0) {
    navigateTo('/korzina')
  }

  // If user is authorized, skip step 0 and go directly to step 1
  if (auth.user.value) {
    confirmationStep.value = 1
  }
})

// Watchers
watch(() => auth.user.value?.id, updateUserInfo)

// Methods
function setupBreadcrumbs() {
  breadcrumbs.value = [
    { title: 'Главная', to: '/' },
    { title: 'Корзина', to: '/korzina' },
    { title: 'Подтверждение заказа', to: '/podtverzhdenie-zakaza' }
  ]
}

function updateUserInfo() {
  const user = auth.user.value
  if (!user) return

  clientInfo.value = {
    fio: user.name ?? '',
    phone: user.phone ?? '',
    email: user.email ?? '',
    phoneBackup: ''
  }

  if (user.address) {
    addressInfo.value = { ...user.address }
  }
}

const handleStepClick = (stepIndex: number) => {
  // If user is authorized, prevent navigation to step 0 (authentication)
  if (auth.user.value && stepIndex === 0) {
    return
  }
  
  // Only allow navigation to completed steps or the current step
  if (stepIndex <= confirmationStep.value) {
    confirmationStep.value = stepIndex as ConfirmationStep
  }
}

const validateClient = async () => {
  const validationRules = {
    fio: clientInfo.value.fio,
    phone: clientInfo.value.phone.length === 18,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientInfo.value.email)
  }

  errors.value = Object.entries(validationRules)
    .filter(([, isValid]) => !isValid)
    .map(([field]) => field)

  if (errors.value.length === 0) {
    confirmationStep.value = 2
  }
}

const confirmOrder = async () => {
  try {
    const payload = formOrderPayload(
      clientInfo.value,
      addressInfo.value,
      tkInfo.value,
      selectedDeliveryMethod.value
    )

    const { data: { orderNumber, email } } = await cart.createOrder(payload)
    await cart.refreshCart()
    navigateTo(`/zakaz-sozdan/${orderNumber}?email=${email}`)
  } catch (error) {
    console.error('Error creating order:', error)
  }
}


</script>

<style lang="scss" scoped>
.order-confirmation__title {
  margin-bottom: $normal_gap;
}

.order-confirmation__layout {
  display: flex;
  gap: 40px;
  margin-top: $normal_gap;
}

.order-confirmation__form {
  flex: 1;
}

.order-confirmation__summary {
  flex: 0 0 400px;
  position: sticky;
  top: 20px;
  height: fit-content;
}

/* Responsive Design */
@media (max-width: 768px) {
  .order-confirmation__layout {
    flex-direction: column;
    gap: 20px;
  }
  
  .order-confirmation__summary {
    flex: none;
    position: static;
    order: -1;
  }
}
</style>
