<template>
  <UiCard class="confirmation-container">
    <h1 class="title">Сброс пароля</h1>
    <UiInput
      class="confirmation-input"
      v-model="newPassword"
      :error="isError"
      id="password"
      placeholder="Новый пароль"
      type="password"
    />
    <UiInput
      class="confirmation-input"
      v-model="confirmNewPassword"
      :error="isError"
      id="password"
      placeholder="Подтвердите новый пароль"
      type="password"
    />
    <ButtonSolid class="success-button" @click="confirmReset">
      Подтвердить изменение пароля
    </ButtonSolid>
  </UiCard>
</template>

<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'

const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Сброс пароля',
    to: '/confirm'
  }
]

const isError = ref(false)

const newPassword = ref('')
const confirmNewPassword = ref('')

const { notify } = useNotification()

const route = useRoute()
const config = useRuntimeConfig()

const authApi = useAuth()

const confirmReset = async () => {
  try {
    if (newPassword.value === confirmNewPassword.value) {
      await authApi.confirmResetPassword(route.query.token as string, newPassword.value)
      notify('Пароль успешно изменен', 'success')
      setTimeout(() => {
        navigateTo('/')
      }, 3000)
    } else {
      console.error('Пароли не совпадают')
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  } catch (error) {
    console.error(error)
  } 
}
</script>

<style scoped lang="scss">
.confirmation-container {
  height: 400px;
  text-align: center;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $normal-gap;

  .confirmation-input {
    width: 50%;
  }
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.status {
  font-size: 18px;
  padding: 10px 0;
}

.loading {
  color: #999;
}

.success {
  color: #2e7d32;

  .success-button {
    margin-top: 20px;
  }
}

.error {
  color: #c62828;
}
</style>
