<script setup lang="ts">
interface Props {
  services: Array<{
    title: string
    img?: string
    to?: string
    icon?: string
    disabled: boolean
    text?: string
  }>
}

defineProps<Props>()
</script>

<template>
  <div class="footer-sections">
    <section class="footer-sections__recommended">
      <UiCard>
        <template #title>
          Рекомендуемые услуги
        </template>
        <Services style='margin-top: 40px' :services="services" />
      </UiCard>
    </section>

    <section class="footer-sections__office" >
      <UiSubHeader class="footer-sections__office-title" subtitle='Москва, Большая Якиманка, 27'>
        Офис типографии
      </UiSubHeader>
      <Map />
    </section>
  </div>
</template>

<style scoped lang="scss">
.footer-sections {

  &__recommended {
    margin-bottom: 40px;
  }

  &__office-title {
    margin-bottom: 40px;
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4;
  }
}
</style>
