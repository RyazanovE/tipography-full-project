<template>
  <UiHeader class="order-confirmation__title">Оформление заказа</UiHeader>
  <StepProgressBar :steps :current-step="confirmationStep" @step-click="() => {}" />
  <div style="display: flex; gap: 40px" v-if="cart.cartItems.value.length">
    <div>
      <div v-show="confirmationStep === 0" class="order-confirmation__container">
        <ClientInfo
          v-model:step="confirmationStep"
          v-model:selectedAuthMethod="selectedAuthMethod"
          v-model:clientInfo="clientInfo"
          :errors
        />
        <DeliveryInfo
          v-if="confirmationStep > 0"
          v-model:selectedDeliveryMethod="selectedDeliveryMethod"
          v-model:addressInfo="addressInfo"
          v-model:tkInfo="tkInfo"
          :confirmationStep
          :errors
        />
      </div>

      <UiCard v-show="confirmationStep === 1">
        <UiSubHeader class="order-confirmation__title">2. Добавление контактных данных</UiSubHeader>
        <div class="order-confirmation__guest">
          <UiInput
            v-model="clientInfo.fio"
            :disabled="confirmationStep === 2"
            required
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            id="fio"
            :error="errors.includes('fio')"
          />
          <UiInput
            v-model="clientInfo.email"
            :disabled="confirmationStep === 2"
            required
            label="Почта"
            placeholder="example@mail.com"
            id="email"
            :error="errors.includes('email')"
          />
          <UiInput
            v-model="clientInfo.phone"
            :disabled="confirmationStep === 2"
            required
            label="Телефон"
            placeholder="+7 (___) ___-__-__"
            mask="phone"
            id="room"
            :error="errors.includes('phone')"
          />
          <UiInput
            v-model="clientInfo.phone"
            :disabled="confirmationStep === 2"
            label="Телефон, если не дозвонимся"
            placeholder="+7 (___) ___-__-__"
            mask="phone"
            id="room"
            :error="errors.includes('phone')"
          />
        </div>

        <div style="margin-top: 20px; display: flex; justify-content: end">
          <ButtonSolid
            @click="validateClient"
            :disabled="!clientInfo.fio || !clientInfo.email || !clientInfo.phone"
          >
            Продолжить
          </ButtonSolid>
        </div>
      </UiCard>

      <div ref="stepTwoBlock" />
      <UiCard v-show="confirmationStep === 2">
        <UiSubHeader class="order-confirmation__title">3.1 Выберите способ получения</UiSubHeader>
        <div style="display: flex; gap: 20px">
          <ButtonOutline
            style="flex: 1"
            title="Самовывоз"
            hover-icon="mdiLogin"
            :active="deliveryType === 'pickup'"
            icon="mdiMapMarkerDown"
            @click="deliveryType = 'pickup'"
          />

          <ButtonOutline
            style="flex: 1"
            title="Доставка"
            :active="deliveryType === 'delivery'"
            hover-icon="mdiMapMarkerDown"
            icon="mdiTruckDeliveryOutline"
            @click="deliveryType = 'delivery'"
          />
        </div>

        <div v-show="deliveryType === 'pickup'">
          <UiSubHeader style="margin-top: 20px; margin-bottom: 20px"
            >Самовывоз из офиса</UiSubHeader
          >
          <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px">
            <div style="display: flex; flex-direction: column">
              <p>г. Москва, ул. Строителей, 3</p>
              <p>Время работы: с 9:00 до 18:00</p>
            </div>
          </div>
          <Map />
        </div>

        <div v-show="deliveryType === 'delivery'">
          <h4 class="order-confirmation__title" style="margin-top: 20px">Введите адрес доставки</h4>
          <div class="order-confirmation__guest">
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

        <div
          v-show="
            deliveryType === 'pickup' ||
            (deliveryType === 'delivery' &&
              Object.keys(addressInfo).every((key) => key === 'comment' || addressInfo[key]))
          "
        >
          <UiSubHeader style="margin-top: 40px" class="order-confirmation__title"
            >3.2 Выберите способ оплаты</UiSubHeader
          >
          <div style="display: flex; gap: 20px">
            <ButtonOutline
              style="flex: 1"
              :active="paymentType === 'cash'"
              title="Наличными или картой при получении"
              hover-icon="mdiLogin"
              icon="mdiCash100"
              @click="paymentType = 'cash'"
            />
            <ButtonOutline
              style="flex: 1"
              :active="paymentType === 'online'"
              title="Банковской картой онлайн"
              hover-icon="mdiIncognitoCircle"
              icon="mdiCreditCard"
              @click="paymentType = 'online'"
            />
            <ButtonOutline
              style="flex: 1"
              :active="paymentType === 'qr'"
              title="Система быстрых платежей - QR Code"
              hover-icon="mdiIncognitoCircle"
              icon="mdiQrcode"
              @click="paymentType = 'qr'"
            />
          </div>
          <div style="margin-top: 20px; display: flex; justify-content: end">
            <ButtonSolid :disabled="!paymentType" @click="confirmationStep = 3">
              Продолжить
            </ButtonSolid>
          </div>
        </div>
      </UiCard>
    </div>
    <div>dsfsdf</div>
  </div>
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

const deliveryType = ref<'delivery' | 'pickup' | null>('pickup')
const paymentType = ref<'cash' | 'online' | 'qr' | null>(null)

const breadcrumbs = useBreadcrumbs()
const auth = useAuth()
const cart = useCart()

const selectedDeliveryMethod = ref<DeliveryMethod>(null)
const selectedAuthMethod = ref<AuthMethod>(null)
const confirmationStep = ref<ConfirmationStep>(2)
const errors = ref<string[]>([])

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
    label: 'Получение и оплата',
    description: 'Выберите способ получения и оплаты'
  },
  {
    label: 'Подтверждение',
    description: 'Проверьте и подтвердите введенные данные'
  }
]

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

const validateClient = async () => {
  const validationDict = {
    fio: clientInfo.value.fio,
    phone: clientInfo.value.phone.length === 18,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientInfo.value.email)
    // street: addressInfo.value.street || selectedDeliveryMethod.value !== 2,
    // house: addressInfo.value.house || selectedDeliveryMethod.value !== 2,
    // room: addressInfo.value.room || selectedDeliveryMethod.value !== 2,
    // address: tkInfo.value.address || selectedDeliveryMethod.value !== 3
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
    margin-bottom: calc($normal_gap);
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
    flex-direction: column;
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
