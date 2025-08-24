<script lang="ts" setup>
import type { AddressInfo, TkInfo, DeliveryMethod, ConfirmationStep } from '~/types/orders'

const addressInfo = defineModel<AddressInfo>('addressInfo', { required: true })
const tkInfo = defineModel<TkInfo>('tkInfo', { required: true })
const selectedDeliveryMethod = defineModel<DeliveryMethod>('selectedDeliveryMethod', {
  required: true
})

const props = defineProps<{
  confirmationStep: ConfirmationStep
  errors: string[]
}>()

const onDeliveryMethodChange = (method: DeliveryMethod) => {
  if (props.confirmationStep === 1) {
    selectedDeliveryMethod.value = method
  }
}
</script>

<template>
  <UiCard class="order-confirmation__card">
    <template #title>Способ получения заказа</template>
    <div class="order-confirmation__delivery-choice">
      <ButtonOutline
        :active="selectedDeliveryMethod === 1"
        title="Самовывоз"
        text="Забрать из офиса"
        hover-icon="mdiMapMarker"
        icon="mdiOfficeBuildingMarkerOutline"
        :disabled="confirmationStep === 2"
        @click="onDeliveryMethodChange(1)"
      />
      <ButtonOutline
        :active="selectedDeliveryMethod === 2"
        title="Курьер"
        text="Доставка курьером по адресу"
        hover-icon="mdiMapMarker"
        icon="mdiTruckDeliveryOutline"
        :disabled="confirmationStep === 2"
        @click="onDeliveryMethodChange(2)"
      />
      <ButtonOutline
        :active="selectedDeliveryMethod === 3"
        title="Транспортная компания"
        text="Доставка выбранной ТК"
        hover-icon="mdiMapMarker"
        icon="mdiPlaneTrain"
        :disabled="confirmationStep === 2"
        @click="onDeliveryMethodChange(3)"
      />
    </div>

    <template v-if="1 === selectedDeliveryMethod">
      <h4>Самовывоз из офиса</h4>
      <p>г. Москва, ул. Строителей, 3</p>
      <p>Время работы: с 9:00 до 18:00</p>
      <Map :width="650" />
    </template>

    <template v-if="selectedDeliveryMethod === 2">
      <h4 class="order-confirmation__title">Введите адрес доставки</h4>
      <div class="order-confirmation__guest">
        <UiInput
          v-model="addressInfo.city"
          required
          :error="errors.includes('city')"
          label="Город"
          placeholder="Название города"
          id="city"
          :disabled="confirmationStep === 2"
        />
        <UiInput
          v-model="addressInfo.street"
          required
          :error="errors.includes('street')"
          label="Улица"
          placeholder="Название улицы"
          id="street"
          :disabled="confirmationStep === 2"
        />
        <UiInput
          v-model="addressInfo.house"
          required
          :error="errors.includes('house')"
          label="Дом"
          placeholder="Номер дома"
          id="house"
          :disabled="confirmationStep === 2"
        />
        <UiInput
          v-model="addressInfo.room"
          required
          :error="errors.includes('room')"
          label="Квартира/офис"
          placeholder="Номер квартиры"
          id="room"
          :disabled="confirmationStep === 2"
        />
        <UiInput
          v-model="addressInfo.comment"
          textarea
          label="Комментарий"
          placeholder="Комментарий к адресу"
          id="comment"
          :disabled="confirmationStep === 2"
        />
      </div>
    </template>

    <template v-if="selectedDeliveryMethod === 3">
      <h4 class="order-confirmation__title">Введите адрес пунтка выдачи СДЭК</h4>
      <div class="order-confirmation__guest">
        <UiInput
          :error="errors.includes('address')"
          v-model="tkInfo.address"
          required
          label="Адрес пункта выдачи"
          placeholder="Адрес"
          id="tk-address"
        />
      </div>
    </template>
  </UiCard>
</template>

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
