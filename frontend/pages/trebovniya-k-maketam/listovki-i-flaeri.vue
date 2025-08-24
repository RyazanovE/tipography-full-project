<template>
  <TechnicalRequirementsListovki />
</template>

<script setup lang="ts">
import { TechnicalRequirementsListovki } from '#components'

useInitiateBreadcrumbs([
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Требования к макетам',
    to: '/trebovniya-k-maketam'
  },
  {
    title: 'Листовки и флаеры',
    to: '/pechat-listovok-i-flaerov'
  }
])
</script>
