<template>
  <TechnicalRequirementsOtkritky />
</template>

<script setup lang="ts">
import { TechnicalRequirementsOtkritky } from '#components'

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
    title: 'Открытки',
    to: '/otkrytki'
  }
])
</script>
