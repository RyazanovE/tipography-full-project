<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Политика конфиденциальности',
    to: '/politika-konfidencialnosti'
  }
]

</script>

<template>
<UiCard>
  <template #title>Политика конфиденциальности персональных данных</template>

</UiCard>
</template>

<style scoped lang="scss">

</style>
