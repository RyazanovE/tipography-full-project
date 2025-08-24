<script setup lang="ts">
import type { AddressInfo, ClientInfo } from '~/types/orders'
import { ref, watch, onMounted } from 'vue'

const auth = useAuth()

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

const addressInfoErrors = ref<string[]>([])
const clientInfoErrors = ref<string[]>([])

const isClientInfoEditing = ref(false)
const isAddressEditing = ref(false)
const isPhoneInputVisible = ref(false)

// Функция для инициализации clientInfo и addressInfo из auth.user
function initUserInfo() {
  const user = auth.user.value
  if (!user) return

  clientInfo.value = {
    fio: user.name ?? '',
    phone: user.phone ?? '',
    email: user.email ?? ''
  }

  if (user.address) {
    addressInfo.value = { ...user.address }
  } else {
    addressInfo.value = {
      city: '',
      street: '',
      house: '',
      room: '',
      comment: ''
    }
  }

  isPhoneInputVisible.value = Boolean(user.phone)
}

// Валидация для любой формы по ключам
function validateFields(
  fields: Record<string, any>,
  errorsRef: typeof addressInfoErrors | typeof clientInfoErrors
): boolean {
  errorsRef.value = []
  for (const key in fields) {
    if (!fields[key]) {
      errorsRef.value.push(key)
    }
  }
  return errorsRef.value.length === 0
}

// Обновление clientInfo при изменении user.id
watch(() => auth.user.value?.id, initUserInfo)
onMounted(initUserInfo)

async function saveNewAddressInfo() {
  console.log(addressInfo.value)
  if (
    !validateFields(
      {
        city: addressInfo.value.city,
        street: addressInfo.value.street,
        house: addressInfo.value.house,
        room: addressInfo.value.room
      },
      addressInfoErrors
    )
  ) {
    return
  }

  try {
    await auth.updateUserAddress(addressInfo.value)
    alert('Информация обновлена')
    isAddressEditing.value = false
  } catch (error) {
    console.error(error)
  }
}

async function saveNewClientInfo() {
  // phone валиден либо если он заполнен, либо если поле скрыто
  const phoneValid = clientInfo.value.phone || !isPhoneInputVisible.value

  if (
    !validateFields(
      {
        fio: clientInfo.value.fio,
        phone: phoneValid,
        email: clientInfo.value.email
      },
      clientInfoErrors
    )
  ) {
    return
  }

  try {
    await auth.updateUserInfo(clientInfo.value)
    alert('Информация обновлена')
    isClientInfoEditing.value = false
  } catch (error) {
    console.error(error)
  }
}

function cancelEditing(form: 'clientInfo' | 'address') {
  if (form === 'clientInfo') {
    isClientInfoEditing.value = false
    isPhoneInputVisible.value = !!auth.user.value?.phone

    clientInfo.value = {
      fio: '',
      phone: '',
      email: ''
    }
  } else {
    isAddressEditing.value = false
    addressInfo.value = {
      city: '',
      street: '',
      house: '',
      room: '',
      comment: ''
    }
  }
}
</script>

<template>
  <div class="account">
    <div class="account__section">
      <div class="account__section-header">
        <h3 class="account__section-title">Контактная информация</h3>
        <ButtonText @click="isClientInfoEditing = true">Изменить</ButtonText>
      </div>
      <div class="account__info">
        <UiInput
          v-model="clientInfo.fio"
          :disabled="!isClientInfoEditing"
          :required="isClientInfoEditing"
          label="ФИО"
          placeholder="Иванов Иван Иванович"
          id="fio"
          :error="clientInfoErrors.includes('fio')"
        />
        <UiInput
          v-model="clientInfo.email"
          :disabled="!isClientInfoEditing"
          :required="isClientInfoEditing"
          label="Почта"
          placeholder="example@mail.com"
          id="email"
          :error="clientInfoErrors.includes('email')"
        />
        <ButtonIcon
          v-if="isClientInfoEditing && !isPhoneInputVisible"
          style="margin-top: 10px"
          inline
          icon="mdiPlusBox"
          @click="isPhoneInputVisible = true"
          >Добавить телефон</ButtonIcon
        >

        <UiInput
          v-if="isPhoneInputVisible"
          v-model="clientInfo.phone"
          :disabled="!isClientInfoEditing"
          label="Телефон"
          placeholder="+7 (___) ___-__-__"
          mask="phone"
          id="room"
          :error="clientInfoErrors.includes('phone')"
        />
        <div
          v-if="isClientInfoEditing"
          style="display: flex; justify-content: flex-end; gap: 20px; margin-top: 20px"
        >
          <ButtonSolid variant="secondary" @click="cancelEditing('clientInfo')"
            >Отменить</ButtonSolid
          >
          <ButtonSolid @click="saveNewClientInfo">Сохранить</ButtonSolid>
        </div>
      </div>
    </div>

    <div class="account__section">
      <div class="account__section-header">
        <h3 class="account__section-title">Адрес доставки</h3>
        <ButtonText @click="isAddressEditing = true">Изменить</ButtonText>
      </div>
      <div class="account__info">
        <UiInput
          v-model="addressInfo.city"
          :required="isAddressEditing"
          :disabled="!isAddressEditing"
          :error="addressInfoErrors.includes('city')"
          label="Город"
          placeholder="Название города"
          id="city"
        />
        <UiInput
          v-model="addressInfo.street"
          :required="isAddressEditing"
          :disabled="!isAddressEditing"
          :error="addressInfoErrors.includes('street')"
          label="Улица"
          placeholder="Название улицы"
          id="street"
        />
        <UiInput
          v-model="addressInfo.house"
          :required="isAddressEditing"
          :disabled="!isAddressEditing"
          :error="addressInfoErrors.includes('house')"
          label="Дом"
          placeholder="Номер дома"
          id="house"
        />
        <UiInput
          v-model="addressInfo.room"
          :required="isAddressEditing"
          :disabled="!isAddressEditing"
          :error="addressInfoErrors.includes('room')"
          label="Квартира/офис"
          placeholder="Номер квартиры"
          id="room"
        />
        <UiInput
          v-model="addressInfo.comment"
          textarea
          :disabled="!isAddressEditing"
          label="Комментарий"
          placeholder="Комментарий к адресу"
          id="comment"
        />
        <div
          v-if="isAddressEditing"
          style="display: flex; justify-content: flex-end; gap: 20px; margin-top: 20px"
        >
          <ButtonSolid variant="secondary" @click="cancelEditing('address')">Отменить</ButtonSolid>
          <ButtonSolid @click="saveNewAddressInfo">Сохранить</ButtonSolid>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account {
  display: flex;
  flex-direction: column;
  gap: $normal_gap;

  &__title {
    font-size: $font_size_large;
    font-weight: bold;
    color: $dark_gray_text_color;
    margin-bottom: $normal_gap;
  }

  &__section {
    background-color: $white_background_color;
    border: 1px solid $primary_border_color;
    border-radius: $border_radius_small;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: calc($normal_gap/2);
    box-shadow: $box_shadow_flat;
  }

  &__section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__section-title {
    font-size: 18px;
    font-weight: 600;
    color: $dark_gray_text_color;
  }

  &__info p,
  &__address p {
    // font-size: $font_size_base;
    // color: $gray_text_color;
  }

  &__addresses {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__address {
    padding: 8px 0;
    border-bottom: 1px solid $light_gray_background_color;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
