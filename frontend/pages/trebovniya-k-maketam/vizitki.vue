<template>
  <TechnicalRequirementsVizitki />
</template>

<script setup lang="ts">
import { TechnicalRequirementsVizitki } from '#components'

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
    title: 'Визитки',
    to: '/trebovniya-k-maketam/vizitki'
  }
])
</script>
