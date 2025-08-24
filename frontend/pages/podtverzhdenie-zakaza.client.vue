<template>
  <template v-if="auth.isAuthorized.value">
    <div ref="stepOneBlock" />
    <h1 class="order-confirmation__title">Подтверждение заказа</h1>
    <div class="order-confirmation__container">
      <ClientInfo
        v-model:selectedAuthMethod="selectedAuthMethod"
        v-model:clientInfo="clientInfo"
        :confirmationStep
        :errors
      />
      <DeliveryInfo
        v-model:selectedDeliveryMethod="selectedDeliveryMethod"
        v-model:addressInfo="addressInfo"
        v-model:tkInfo="tkInfo"
        :confirmationStep
        :errors
      />
    </div>

    <div v-if="confirmationStep === 1" class="order-confirmation__button-container">
      <ButtonSolid @click="validateAddressAndClient">Продолжить </ButtonSolid>
    </div>

    <div ref="stepTwoBlock" />
    <UiCard v-show="confirmationStep === 2">
      <template #title>Информация о заказе</template>
      <OrderInfo
        :cartItems="cart.cartItems.value"
        :clientInfo
        :addressInfo
        :selectedDeliveryMethod
        :tkInfo
        @changeConfirmationStep="confirmationStep = $event"
      />
      <div class="order-confirmation__button-container">
        <ButtonSolid variant="secondary" @click="editInfo">Редатировать данные</ButtonSolid>
        <ButtonSolid @click="confirmOrder">Оформить заказ </ButtonSolid>
      </div>
    </UiCard>
  </template>
  <UiLoader v-else />
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

const stepOneBlock = ref<HTMLHeadingElement | null>(null)
const stepTwoBlock = ref<HTMLHeadingElement | null>(null)

const breadcrumbs = useBreadcrumbs()
const auth = useAuth()
const cart = useCart()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Корзина',
    to: '/korzina'
  },
  {
    title: 'Подтверждение заказа',
    to: '/podtverzhdenie-zakaza'
  }
]

const selectedDeliveryMethod = ref<DeliveryMethod>(null)
const selectedAuthMethod = ref<AuthMethod>(null)
const confirmationStep = ref<ConfirmationStep>(1)
const errors = ref<string[]>([])

const clientInfo = ref<ClientInfo>({
  fio: '',
  phone: '',
  email: ''
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

onMounted(async () => {
  updateInfo()
  await cart.refreshCart()

  const isCartEmpty = cart.cartItems.value.length === 0

  if (isCartEmpty) {
    navigateTo('/korzina')
  }
})

watch(() => auth.user.value?.id, updateInfo)

function updateInfo() {
  const user = auth.user.value
  if (!user) return

  clientInfo.value = {
    fio: user.name ?? '',
    phone: user.phone ?? '',
    email: user.email ?? ''
  }

  if (user.address) {
    addressInfo.value = { ...user.address }
  }
}

const editInfo = () => {
  scrollToSection(stepOneBlock.value)
  confirmationStep.value = 1
}

const validateAddressAndClient = async () => {
  const validationDict = {
    fio: clientInfo.value.fio,
    phone: clientInfo.value.phone.length === 18,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientInfo.value.email),
    street: addressInfo.value.street || selectedDeliveryMethod.value !== 2,
    house: addressInfo.value.house || selectedDeliveryMethod.value !== 2,
    room: addressInfo.value.room || selectedDeliveryMethod.value !== 2,
    address: tkInfo.value.address || selectedDeliveryMethod.value !== 3
  }

  errors.value = []
  for (const key in validationDict) {
    if (!validationDict[key as keyof typeof validationDict]) errors.value.push(key)
  }

  const isValid = errors.value.length === 0

  if (isValid) {
    confirmationStep.value = 2

    await nextTick()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToSection(stepTwoBlock.value)
      })
    })
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

    const {
      data: { orderNumber, email }
    } = await cart.createOrder(payload)
    cart.refreshCart()
    navigateTo(`/zakaz-sozdan/${orderNumber}?email=${email}`)
  } catch (error) {
    console.error(error)
  }
}

const scrollToSection = (targetRef: HTMLDivElement | null) => {
  if (targetRef) {
    const headerHeight = 106

    nextTick(() => {
      requestAnimationFrame(() => {
        const offsetTop = targetRef.getBoundingClientRect().top + window.scrollY - headerHeight

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.order-final-info {
  &__content {
    display: flex;
    gap: $normal_gap;
    margin-bottom: $normal_gap;
  }

  &__title {
    margin-bottom: $normal_gap;
  }

  &__cart {
    margin-bottom: $normal_gap;
  }

  .order-info-list {
    display: flex;
    flex-direction: column;
    gap: calc($normal_gap/4);

    &__item {
      &_bold {
        font-weight: bolder;
        margin-left: calc($normal_gap/2);
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

  &__client-info {
    display: flex;
    flex-direction: column;
  }
}

.order-confirmation {
  &__title {
    margin-bottom: calc($normal_gap/2);
  }

  &__delivery-choice {
    display: flex;
    gap: $normal_gap;
    margin-bottom: $normal-gap;
  }

  &__button-container {
    display: flex;
    justify-content: end;
    gap: $normal-gap;
    margin-top: $normal-gap;
  }

  &__subtitle {
    margin-bottom: calc($normal_gap/4);
    font-size: 14px;
  }

  &__container {
    display: flex;
    margin-bottom: $normal_gap;
    gap: $normal_gap;
  }

  &__card {
    flex: 1;
  }

  &__guest {
    display: flex;
    flex-direction: column;
    gap: $normal_gap;
  }

  &__content {
    display: flex;
    gap: $normal_gap;
  }

  &__list {
    list-style: disc inside;
    padding-left: 1rem;
    font-size: 14px;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
  }
}
</style>
