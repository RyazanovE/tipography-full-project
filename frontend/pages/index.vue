<script setup lang="ts">
definePageMeta({
  layout: 'main'
})

import { useBreadcrumbs } from '~/stores/breadcrumbs'
import { services } from '../constants/pechat-vizitok'

const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = []
</script>

<template>
  <div class="main-container">
    <IndexSliders />
    <h2 class="services-title">Основные категории услуг</h2>
    <Services class="services" :services="services" />
    <h2 class="services-title">Офис типографии</h2>
    <Map class="map" />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  padding-top: $normal_gap;
  max-width: $app_width;
  margin: 0 auto;
}

.services-title {
  margin-top: calc(2 * $normal_gap);
  margin-bottom: $normal_gap;
}

.services {
  margin-bottom: calc(2 * $normal_gap);
}

.reviews {
  margin-bottom: calc(2 * $normal_gap);
}

.map {
  margin-bottom: calc(2 * $normal_gap);
}
</style>
