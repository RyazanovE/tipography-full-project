<template>
  <div v-if="isPageShown" class="order-confirmation">
    <h1 class="order-confirmation__title">Заказ успешно оформлен!</h1>

    <UiCard class="order-confirmation__card">
      <template #title>Информация о заказе</template>

      <div class="order-success">
        <div class="order-success__number">
          Номер вашего заказа: <strong>{{ route.params.orderNumber }}</strong>
        </div>

        <p class="order-success__message">
          Спасибо за ваш заказ! Мы отправили подтверждение на email
          <strong>{{ order?.info.clientInfo.email }}</strong
          >. Вы можете отслеживать статус заказа в <ButtonLink><NuxtLink to='/my/tekushie-zakazy'>личном кабинете</NuxtLink></ButtonLink>.
        </p>

        <OrderInfo
          :addressInfo="order?.info.deliveryInfo.addressInfo ?? null"
          :cartItems="order?.items as never as CartItem[] ?? []"
          :tkInfo="order?.info.deliveryInfo.tkInfo ?? null"
          :clientInfo="order?.info.clientInfo as never as ClientInfo ?? null"
          :selectedDeliveryMethod="order?.info.deliveryInfo.deliveryMethod ?? null"
        />
      </div>
    </UiCard>

    <div class="order-confirmation__actions">
      <NuxtLink to="/">
        <ButtonSolid>Вернуться в каталог</ButtonSolid>
      </NuxtLink>
    </div>
  </div>

  <UiLoader v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBreadcrumbs } from '~/stores/breadcrumbs'
import type { ClientInfo, Order } from '~/types/orders'

const route = useRoute()
const ordersApi = useOrders()
const isPageShown = ref(false)
const order = ref<Order | null>(null)

useBreadcrumbs().value = [
  { title: 'Главная', to: '/' },
  { title: 'Корзина', to: '/korzina' },
  { title: 'Заказ оформлен', to: route.path }
]

const { data: orderData, error } = await useAsyncData(
  'order',
  async () => {
    const orderNumber = route.params.orderNumber as string
    const email = route.query.email as string

    if (!orderNumber || !email) {
      await navigateTo('/')
      return null
    }

    isPageShown.value = true

    try {
      return (await ordersApi.getSingleOrder(orderNumber, email)).data
    } catch (err) {
      console.error(err)
      return null
    }
  },
  {
    server: true // Включить загрузку на сервере для SSR
  }
)

order.value = orderData.value

// onMounted(async () => {
//   const orderNumber = route.params.orderNumber as string
//   const email = route.query.email as string

//   if (!orderNumber || !email) {
//     return navigateTo('/')
//   }

//   isPageShown.value = true

//   try {
//     order.value = (await ordersApi.getSingleOrder(orderNumber, email)).data
//   } catch (error) {
//     console.error(error)
//   }
// })
</script>

<style lang="scss" scoped>
.order-confirmation {
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: $normal_gap;
  }

  &__card {
    margin-bottom: $normal_gap;
  }

  &__actions {
    display: flex;
    justify-content: end;
    gap: $normal_gap;
  }
}

.order-success {
  text-align: center;

  &__number {
    font-size: 18px;
    margin-bottom: calc($normal_gap / 2);

    strong {
      font-weight: 600;
    }
  }

  &__message {
    margin-bottom: $normal_gap;

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $normal_gap;
    margin-bottom: $normal_gap;
    text-align: left;
  }

  &__summary {
    text-align: left;
    border-top: 1px solid $primary_border_color;
    padding-top: $normal_gap;

    h4 {
      margin-bottom: calc($normal_gap / 2);
      font-weight: 600;
    }
  }
}

.order-info-list {
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    margin-bottom: calc($normal_gap / 4);
    line-height: 1.5;

    strong {
      font-weight: 600;
    }
  }
}

.order-items-list {
  list-style: none;
  padding: 0;
  margin-bottom: $normal_gap;

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
