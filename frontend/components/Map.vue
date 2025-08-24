<template>
  <div class='map'>
    <ClientOnly>
      <div style="position: relative; overflow: hidden">
        <a
          href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
          style="color: #eee; font-size: 12px; position: absolute; top: 0px"
          >Москва</a
        ><a
          href="https://yandex.ru/maps/213/moscow/?ll=37.582096%2C55.877571&utm_medium=mapframe&utm_source=maps&z=14"
          style="color: #eee; font-size: 12px; position: absolute; top: 14px"
          >Яндекс Карты — транспорт, навигация, поиск мест</a
        ><iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.582096%2C55.877571&z=14&pt=37.582096,55.877571,pm2rdm"
          :width="width ?? 1400"
          height="400"
          frameborder="0"
          allowfullscreen="true"
          style="position: relative"
        ></iframe>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang='ts'>
defineProps<{ width?: number }>()
</script>

<style scoped lang="scss">
.map {
  border-radius: $border_radius_normal;
  overflow: hidden;
}
</style>
