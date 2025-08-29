<template>
  <template v-if="!isLoading">
    <h1 class="title">Узнать статус заказа</h1>

    <UiCard>
      <NuxtLink v-if="auth.isAuthorized.value" to='/my'
        ><ButtonSolid>Перейти в личный кабинет для отслеживания заказа</ButtonSolid></NuxtLink
      >
      <div v-else class="order-status-container">
        <form class="order-status-form" @submit.prevent>
          <UiInput
            required
            placeholder="your@email.here"
            id="email"
            label="Почта"
            v-model="formValues.email"
          />
          <UiInput
            v-model="formValues.orderNumber"
            required
            id="order-number"
            label="Номер заказа"
            placeholder="1111-1111-1111"
          />
          <ButtonSolid @click="getOrderStatus">Узнать статус заказа</ButtonSolid>
          <span v-if="error" class="order-status-form__error"> Заказ не найден </span>
        </form>
        <div class="order-status-in-cabinet">
          <p>
            Вы также можете узнать статус заказа в
            <ButtonLink><NuxtLink to='/my/glavnaya'>личном кабинете</NuxtLink></ButtonLink>
          </p>
          <ul class="order-status-in-cabinet__list">
            <li>информация о статусе</li>
            <li>изменение способа оплаты и получения</li>
            <li>история заказов</li>
          </ul>
          <ButtonSolid @click="isLoginModalShown = true">Войти</ButtonSolid>
        </div>
      </div>
    </UiCard>
  </template>
  <UiLoader v-else />
</template>

<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
import { useLoginModal } from '~/stores/login-modal'
import type { Order } from '~/types/orders'

const auth = useAuth()
const breadcrumbs = useBreadcrumbs()
const isLoginModalShown = useLoginModal()
const isLoading = ref(false)
const error = ref(false)
const order = ref<Order | null>(null)

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Отслеживание заказа',
    to: '/otslezhivaniye-zakaza'
  }
]

const formValues = ref({
  orderNumber: '',
  email: ''
})

const getOrderStatus = async () => {
  const api = useApi()

  error.value = false
  isLoading.value = true
  try {
    order.value = (
      await api.get(`/orders/${formValues.value.orderNumber}`, {
        params: { email: formValues.value.email }
      })
    ).data
  } catch (e) {
    error.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.title {
  margin-bottom: $normal_gap;
}

.order-status-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: $normal_gap;

  .order-status-form {
    display: flex;
    flex-direction: column;
    gap: $normal_gap;

    &__error {
      color: red;
    }
  }

  .order-status-in-cabinet {
    background-color: $light_gray_background_color;
    border-radius: $border_radius_normal;
    padding: $normal_gap;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    &__list {
      margin-left: $normal_gap;
      font-size: $font-size_normal;
      list-style-type: disc;
    }
  }
}
</style>
