<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Оплата и доставка',
    to: '/oplata-i-dostavka'
  }
]

const deliveries = [
  {
    type: 'Бесплатная доставка по Москве',
    note: '* при заказе через сайт от 10 000 ₽ или через менеджеров от 20 000 ₽',
    cost: '0 ₽',
    time: 'от 1 дня'
  },
  {
    type: 'Доставка курьером по Москве (в пределах МКАД)',
    cost: '790 ₽',
    time: 'от 1 до 3 дней'
  },
  {
    type: 'Доставка курьером за МКАД',
    cost: '1000 ₽',
    time: 'от 1 до 3 дней'
  },
  {
    type: 'Срочная доставка такси (Москва и область)',
    note: 'Максимальный вес заказа 20 кг',
    cost: '3000 ₽ (физ. лица)<br>5000 ₽ (юр. лица)',
    time: 'день в день'
  },
  {
    type: 'Доставка СДЭК "до двери" по России',
    cost: 'от 790 ₽',
    time: 'от 1 до 10 дней'
  },
  {
    type: 'Доставка до пункта самовывоза СДЭК',
    cost: 'от 790 ₽',
    time: 'от 1 до 10 дней'
  }
]

const paymentGroups = [
  {
    title: 'Онлайн',
    methods: [
      {
        title: 'Онлайн-банкинг',
        description: 'Оплата на сайте банковской картой или через онлайн-сервисы.',
        icon: 'mdiBankTransfer'
      },
      {
        title: 'Безналичная оплата',
        description: 'Оплата по безналичному расчету.',
        icon: 'mdiCreditCard'
      }
    ]
  },
  {
    title: 'В копицентре',
    methods: [
      {
        title: 'Наличными',
        description: 'Вы можете оплатить заказ наличными при получении.',
        icon: 'mdiCash'
      },
      {
        title: 'QR-код',
        description: 'Быстрая оплата по QR-коду в копицентре.',
        icon: 'mdiQrcode'
      },
      {
        title: 'Безналичная оплата',
        description: 'Оплата банковской картой через терминал.',
        icon: 'mdiCreditCard'
      }
    ]
  },
  {
    title: 'Юридическим лицам и партнерам',
    methods: [
      {
        title: 'Счет на оплату',
        description: 'Выставим счет для оплаты по реквизитам.',
        icon: 'mdiFileDocumentOutline'
      }
    ]
  }
]
</script>

<template>
  <UiCard class="services">
    <template #title>Виды доставки</template>
    <DelivertyTable :deliveries />
  </UiCard>

  <UiCard class="services">
    <template #title>Способы оплаты</template>
    <div class="payment-methods">
      <div v-for="(group, index) in paymentGroups" :key="index" class="payment-group">
        <h3 v-if="group.title" class="payment-group__title">{{ group.title }}</h3>

        <div v-for="(method, idx) in group.methods" :key="idx" class="payment-method">
          <MdiIcon :icon="method.icon" class="payment-method__icon" size="32" />
          <div class="payment-method__content">
            <h4 class="payment-method__title">{{ method.title }}</h4>
            <p class="payment-method__description">{{ method.description }}</p>
          </div>
        </div>
      </div>
      <div class="payment-group">
        <h3>Важно!</h3>
        <div class="payment-method">
          <MdiIcon icon="mdiAlertCircleOutline" class="payment-method__icon" size="32" />
          <p class="payment-method__description">
            Оплата производится только после согласования заказа с менеджером: необходимо
            подтвердить наличие всех материалов, согласовать загрузку производства, определить
            площадку изготовления и окончательно утвердить сроки выполнения.
          </p>
        </div>
      </div>
    </div>
  </UiCard>

  <UiCard class="services">
    <template #title>Самовывоз из офиса</template>
    <template #subtitle>г. Москва, ул. Строителей, 3</template>
    <p class="services__text">Время работы: с 9:00 до 18:00</p>
    <Map class="map" />
  </UiCard>
</template>

<style scoped lang="scss">
.services:not(:last-child) {
  margin-bottom: calc(2 * $normal_gap);
}

.services__text {
  margin-bottom: $normal_gap;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.payment-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.payment-group__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.payment-method {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: #f5f7fa;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.payment-method__icon {
  flex-shrink: 0;
  color: #444;
}

.payment-method__content {
  display: flex;
  flex-direction: column;
}

.payment-method__title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.payment-method__description {
  font-size: 0.875rem;
  color: #666;
}
</style>
