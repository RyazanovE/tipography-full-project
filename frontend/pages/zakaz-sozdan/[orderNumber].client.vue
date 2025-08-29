<template>
  <div v-if="isPageShown" class="order-success-page">
    <!-- Header -->
    <UiHeader class="order-success-page__title">Заказ успешно оформлен!</UiHeader>
    
    <!-- Success Message Card -->
    <UiCard class="order-success-page__success-card">
      <div class="order-success-page__success-content">
        <div class="order-success-page__success-icon">
          <MdiIcon icon="mdiCheckCircle" size="64px" color="#10b981" />
        </div>
        
        <div class="order-success-page__success-text">
          <h2 class="order-success-page__order-number">
            Заказ №{{ route.params.orderNumber }}
          </h2>
          
          <p class="order-success-page__message">
            Спасибо за ваш заказ! Мы отправили подтверждение на email
            <strong>{{ order?.info.clientInfo.email }}</strong>.
          </p>
          
          <p class="order-success-page__tracking">
            Вы можете отслеживать статус заказа в 
            <ButtonLink v-if='auth.isAuthorized.value'>
              <NuxtLink to='/my/tekushie-zakazy'>личном кабинете</NuxtLink>.
            </ButtonLink>
            <ButtonLink v-else>
              <NuxtLink to='/otslezhivaniye-zakaza' @click='isLoginModalShown = true'>вкладке отслеживания заказа</NuxtLink>.
            </ButtonLink>
          </p>
        </div>
      </div>
    </UiCard>

    <!-- Order Details -->
    <div class="order-success-page__layout">
      <!-- Left Column - Order Info -->
      <div class="order-success-page__order-details">
        <OrderInfo
          :addressInfo="order?.info.deliveryInfo.addressInfo ?? null"
          :cartItems="order?.items as never as CartItem[] ?? []"
          :tkInfo="order?.info.deliveryInfo.tkInfo ?? null"
          :clientInfo="order?.info.clientInfo as never as ClientInfo ?? null"
          :selectedDeliveryMethod="order?.info.deliveryInfo.deliveryMethod ?? null"
        />
      </div>

      <!-- Right Column - Actions -->
      <div class="order-success-page__actions">
        <UiCard class="order-success-page__actions-card">
          <UiSubHeader class="order-success-page__actions-title">
            Что дальше?
          </UiSubHeader>
          
          <div class="order-success-page__action-buttons">
            <NuxtLink to="/" class="order-success-page__action-link">
              <ButtonSolid class="order-success-page__action-button">
                <MdiIcon icon="mdiHome" size="18px" />
                Вернуться в каталог
              </ButtonSolid>
            </NuxtLink>
            
            <NuxtLink v-if='auth.isAuthorized.value' to="/my/tekushie-zakazy" class="order-success-page__action-link">
              <ButtonOutline
                title="Мои заказы"
                icon="mdiClipboardList"
                hover-icon="mdiClipboardListOutline"
              />
            </NuxtLink>
            <NuxtLink v-else  class="order-success-page__action-link">
              <ButtonOutline
                title="Войти в личный кабинет"
                icon="mdiLogin"
                hover-icon="mdiClipboardListOutline"
                @click='isLoginModalShown = true'
              />
            </NuxtLink>
            
            <NuxtLink to="/" class="order-success-page__action-link">
              <ButtonOutline
                title="Продолжить покупки"
                icon="mdiShopping"
                hover-icon="mdiShoppingOutline"
              />
            </NuxtLink>
          </div>
          
          <div class="order-success-page__help-info">
            <h5 class="order-success-page__help-title">
              <MdiIcon icon="mdiHelpCircle" size="16px" />
              Нужна помощь?
            </h5>
            <p class="order-success-page__help-text">
              Если у вас есть вопросы по заказу, свяжитесь с нашей службой поддержки
            </p>
            <ButtonLink class="order-success-page__help-link">
              <NuxtLink to="/kontakty">Связаться с поддержкой</NuxtLink>
            </ButtonLink>
          </div>
        </UiCard>
      </div>
    </div>
  </div>

  <UiLoader v-else />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBreadcrumbs } from '~/stores/breadcrumbs'
import { useLoginModal } from '~/stores/login-modal'
import type { ClientInfo, Order } from '~/types/orders'

const route = useRoute()
const ordersApi = useOrders()
const isPageShown = ref(false)
const order = ref<Order | null>(null)
const auth = useAuth()
const isLoginModalShown = useLoginModal()

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
    server: false // Включить загрузку на сервере для SSR
  }
)

order.value = orderData.value
</script>

<style lang="scss" scoped>
.order-success-page {
  &__title {
    margin-bottom: $normal_gap;
    text-align: center;
    color: #10b981;
  }

  &__success-card {
    margin-bottom: $normal_gap;
    text-align: center;
  }

  &__success-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $normal_gap;
    padding: $normal_gap 0;
  }

  &__success-icon {
    margin-bottom: calc($normal_gap / 2);
  }

  &__success-text {
    max-width: 600px;
  }

  &__order-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: calc($normal_gap / 2);
  }

  &__message {
    font-size: 1.1rem;
    color: #4b5563;
    margin-bottom: calc($normal_gap / 2);
    line-height: 1.6;

    strong {
      color: #1f2937;
      font-weight: 600;
    }
  }

  &__tracking {
    font-size: 1rem;
    color: #6b7280;
    line-height: 1.5;
  }

  &__layout {
    display: flex;
    gap: 40px;
    margin-top: $normal_gap;
  }

  &__order-details {
    flex: 1;
  }

  &__actions {
    flex: 0 0 350px;
  }

  &__actions-card {
    position: sticky;
    top: 20px;
    height: fit-content;
  }

  &__actions-title {
    margin-bottom: $normal_gap;
    font-size: 1.1rem;
  }

  &__action-buttons {
    display: flex;
    flex-direction: column;
    gap: calc($normal_gap / 2);
    margin-bottom: $normal_gap;
  }

  &__action-link {
    text-decoration: none;
    display: block;
  }

  &__action-button {
    width: 100%;
    justify-content: center;
    gap: calc($normal_gap / 3);
  }

  &__help-info {
    padding-top: $normal_gap;
    border-top: 1px solid $primary_border_color;
  }

  &__help-title {
    display: flex;
    align-items: center;
    gap: calc($normal_gap / 3);
    margin-bottom: calc($normal_gap / 2);
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
  }

  &__help-text {
    font-size: 0.9rem;
    color: #6b7280;
    line-height: 1.5;
    margin-bottom: calc($normal_gap / 2);
  }

  &__help-link {
    font-size: 0.9rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    &__layout {
      flex-direction: column;
      gap: 20px;
    }
    
    &__actions {
      flex: none;
    }
    
    &__actions-card {
      position: static;
    }
    
    &__success-content {
      padding: calc($normal_gap / 2) 0;
    }
    
    &__order-number {
      font-size: 1.3rem;
    }
    
    &__message {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    &__success-content {
      gap: calc($normal_gap / 2);
    }
    
    &__order-number {
      font-size: 1.2rem;
    }
    
    &__message {
      font-size: 0.95rem;
    }
    
    &__tracking {
      font-size: 0.9rem;
    }
  }
}
</style>
