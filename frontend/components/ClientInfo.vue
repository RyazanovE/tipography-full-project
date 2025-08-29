<script lang="ts" setup>
import { useLoginModal } from '~/stores/login-modal'
import type { AuthMethod  } from '~/types/orders'

const auth = useAuth()
const isLoginModalShownState = useLoginModal()

defineProps<{
  errors: string[]
}>()

const step = defineModel<number>('step', { required: true })
const selectedAuthMethod = defineModel<AuthMethod>('selectedAuthMethod', { required: true })

const login = () => {
  selectedAuthMethod.value = null
  isLoginModalShownState.value = true
}
</script>

<template>
  <UiCard class="order-confirmation__card">
    <template #title>1. Данные получателя</template>
    <div v-if="!auth.user.value" class="order-confirmation__content">
      <div  class="order-confirmation__delivery-choice">
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
          @click="step = 1"
        />
      </div>
      <UiList
        title="Войдите, чтобы иметь возможность:"
        :listItems="[
          `Отслеживать статус заказа`,
          'Накапливать персональные бонусы',
          'Сохранять информацию об оплате и адресе доставки',
          'Иметь доступ к сохранённым макетам',
          'Просматривать историю заказов'
        ]"
      />
    </div>
    
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

    & > * {
      flex: 1;
    }
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
