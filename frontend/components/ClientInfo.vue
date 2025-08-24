<script lang="ts" setup>
import { useLoginModal } from '~/stores/login-modal'
import type { AuthMethod, ClientInfo } from '~/types/orders';

const auth = useAuth()
const isLoginModalShownState = useLoginModal()

defineProps<{
  confirmationStep: number
  errors: string[]
}>()

const selectedAuthMethod = defineModel<AuthMethod>('selectedAuthMethod', { required: true })
const clientInfo = defineModel<ClientInfo>('clientInfo', { required: true })

const login = () => {
  selectedAuthMethod.value = null
  isLoginModalShownState.value = true
}
</script>

<template>
  <UiCard class="order-confirmation__card">
    <template #title>Данные получателя</template>
    <template v-if="!auth.user.value" #subtitle>Войдите, чтобы иметь возможность:</template>
    <div v-if="!auth.user.value" class="order-confirmation__content">
      <ul class="order-confirmation__list">
        <li>Отслеживать статус заказа</li>
        <li>Накапливать персональные бонусы</li>
        <li>Сохранять информацию об оплате и адресе доставки</li>
        <li>Иметь доступ к сохранённым макетам</li>
        <li>Просматривать историю заказов</li>
      </ul>
      <div class="order-confirmation__delivery-choice">
        <ButtonOutline
          title="Войти в аккаунт"
          hover-icon="mdiLogin"
          icon="mdiAccountArrowRightOutline"
          @click="login"
        />
        <ButtonOutline
          :active="selectedAuthMethod === 2"
          title="Продолжить как гость"
          hover-icon="mdiIncognitoCircle"
          icon="mdiIncognito"
          @click="selectedAuthMethod = 2"
        />
      </div>
    </div>
    <template v-if="selectedAuthMethod === 2 || auth.user.value">
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
          v-model="clientInfo.email"
          :disabled="confirmationStep === 2"
          required
          label="Почта"
          placeholder="example@mail.com"
          id="email"
          :error="errors.includes('email')"
        />
      </div>
    </template>
  </UiCard>
</template>

<style scoped lang="scss">
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
    flex-direction: column;
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
