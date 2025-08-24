<script lang="ts" setup>
import type { AddressInfo, DeliveryMethod, TkInfo } from '~/types/orders'
import { phone } from '~/assets/constants/global'

defineProps<{
  selectedDeliveryMethod: DeliveryMethod
  addressInfo: AddressInfo | null
  tkInfo: TkInfo | null
}>()
</script>

<template>
  <div v-if="selectedDeliveryMethod === 1" class="order-final-info__card">
    <h4 class="order-final-info__title">Способ получения заказа</h4>
    <ul class="order-info-list">
      <li>
        Способ получения:
        <span class="order-info-list__item_bold">Самовывоз</span>
      </li>
      <li class="order-info-list__item">
        Адрес офиса
        <span class="order-info-list__item_bold"> г. Москва, ул. Строителей, 3</span>
      </li>
      <li class="order-info-list__item">
        Контантый телефон офиса<span class="order-info-list__item_bold">{{ phone }}</span>
      </li>
    </ul>
  </div>
  <div v-else-if="selectedDeliveryMethod === 2" class="order-final-info__card">
    <h4 class="order-final-info__title">Способ получения заказа</h4>
    <ul class="order-info-list">
      <li>
        Способ получения:
        <span class="order-info-list__item_bold">Доставка курьером по адресу</span>
      </li>
      <li class="order-info-list__item">
        Адрес доставки:
        <span class="order-info-list__item_bold">
          г. {{ addressInfo?.city }}, ул. {{ addressInfo?.street }}, д. {{ addressInfo?.house }},
          {{ addressInfo?.room }}
        </span>
      </li>
      <li>
        Комментарий к адресу
        <span class="order-info-list__item_bold">
          {{ addressInfo?.comment }}
        </span>
      </li>
    </ul>
  </div>
  <div v-else-if="selectedDeliveryMethod === 3" class="order-final-info__card">
    <h4 class="order-final-info__title">Способ получения заказа</h4>
    <ul class="order-info-list">
      <li>
        Способ получения:
        <span class="order-info-list__item_bold">Доставка курьером по адресу</span>
      </li>
      <li class="order-info-list__item">
        Адрес доставки:
        <span class="order-info-list__item_bold">
          {{ tkInfo?.address }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
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

.order-final-info__content {
  display: flex;
  gap: $normal_gap;
  margin-bottom: $normal_gap;
}

.order-final-info__title {
  margin-bottom: calc($normal_gap/2);
}

.order-final-info__cart {
  margin-bottom: $normal_gap;
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

order-final-info__client-info {
  display: flex;
  flex-direction: column;
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
