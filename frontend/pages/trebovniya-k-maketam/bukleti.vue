<script setup lang="ts">
import {  TechnicalRequirementsBukleti } from '#components'

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
    title: 'Буклеты и лифлеты',
    to: '/trebovniya-k-maketam/bukleti'
  }
])
</script>

<template>
  <TechnicalRequirementsBukleti />
</template>
