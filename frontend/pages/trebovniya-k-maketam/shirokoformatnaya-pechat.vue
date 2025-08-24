<template>
  <TechnicalRequirementsShirokoformatnayaPechat />
</template>

<script setup lang="ts">
import {  TechnicalRequirementsShirokoformatnayaPechat } from '#components'

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
    title: 'Широкоформатная печать',
    to: '/shirokoformatnaya-pechat'
  }
])
</script>
