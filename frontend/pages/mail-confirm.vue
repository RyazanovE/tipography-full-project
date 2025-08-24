<template>
  <UiCard class="confirmation-container">
    <h1 class="title">Подтверждение Email</h1>

    <div v-if="status === 'pending'" class="status loading">⏳ Подтверждение...</div>
    <div v-else-if="status === 'error' && error" class="status error">
      {{ error.data?.message || 'Произошла ошибка' }}
    </div>
    <div v-else-if="status === 'success' && data" class="status success">
      <div>{{ data.message }}</div>
      <ButtonSolid class="success-button" @click="isLoginModalShownState = true">
        Войти
      </ButtonSolid>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
import { useLoginModal } from '~/stores/login-modal'

const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Подтверждение Email',
    to: '/mail-confirm'
  }
]

const route = useRoute()
const config = useRuntimeConfig()

const isLoginModalShownState = useLoginModal()

const { data, error, status } = await useFetch<{ message: string }>(
  `${config.public.API_BASE_URL}/user/confirm/?token=${route.query.token}`
)
</script>

<style scoped lang="scss">
.confirmation-container {
  height: 400px;
  text-align: center;
  font-family: system-ui, sans-serif;
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
