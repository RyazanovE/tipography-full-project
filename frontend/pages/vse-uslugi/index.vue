<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Все услуги',
    to: '/vse-uslugi'
  }
]

const advertisement = [
  {
    title: 'Визитки',
    to: '/vse-uslugi/vizitki',
    icon: 'mdiCardAccountDetails',
    disabled: false
  },
  {
    title: 'Листовки и флаеры',
    to: './vse-uslugi/listovki-i-flaeri',
    icon: 'mdiFileDocument',
    disabled: false
  },
  {
    title: 'Буклеты и лифлеты',
    to: './vse-uslugi/bukleti',
    icon: 'mdiBookOpenVariant',
    disabled: false
  },
  {
    title: 'Широкоформатная печать',
    to: '/vse-uslugi/shirokoformatnaya-pechat',
    icon: 'mdiPrinter',
    disabled: true
  },
  {
    title: 'Открытки',
    to: './vse-uslugi/otkrytki',
    icon: 'mdiEmailOpen',
    disabled: true
  },
  {
    title: 'Наклейки и стикерпаки',
    img: './images/categories/sticker.png',
    to: '/pechat-nakleek',
    icon: 'mdiStickerText',
    disabled: true
  },
  {
    title: 'Документы и чертежи',
    img: './images/categories/docs.png',
    to: './listovie-stikerpaki',
    icon: 'mdiPrinterPos',
    disabled: true
  },
  {
    title: 'Фото',
    img: './images/categories/photo.png',
    to: './listovie-stikerpaki',
    icon: 'mdiImage',
    disabled: true
  }
]
const stickers = [
  {
    title: 'Круглая наклейка',
    img: './images/categories/visiting-cards.png',
    to: '/pechat-vizitok'
  },
  {
    title: 'Наклейки на бумаге',
    img: './images/categories/listovki-i-flaeri.png',
    to: './pechat-listovok-i-flaerov'
  },
  {
    title: 'Наклейка на пленке',
    img: './images/categories/buklet.png'
  },
  {
    title: 'Широкоформатная наклейка',
    img: './images/categories/poster.png'
  },
  {
    title: 'Уличная наклейка',
    img: './images/categories/envelope.png',
    to: '/pechat-nakleek'
  },
  {
    title: 'Стикерпак',
    img: './images/categories/envelope.png',
    to: '/pechat-nakleek'
  }
]
const business = [
  {
    title: 'Блокноты',
    img: './images/categories/visiting-cards.png',
    to: '/pechat-vizitok'
  },
  {
    title: 'Папки',
    img: './images/categories/listovki-i-flaeri.png',
    to: './pechat-listovok-i-flaerov'
  },
  {
    title: 'Бланки',
    img: './images/categories/buklet.png'
  },
  {
    title: 'Конверты',
    img: './images/categories/poster.png'
  },
  {
    title: 'Брошюры, каталоги',
    img: './images/categories/envelope.png',
    to: '/pechat-nakleek'
  },
  {
    title: 'Календари',
    img: './images/categories/envelope.png',
    to: '/pechat-nakleek'
  }
]
</script>

<template>
  <UiCard class="services">
    <template #title>Рекламная продукция</template>
    <template #subtitle
      >Мощные инструменты для яркого представления и продвижения ваших товаров и услуг — от
      раздаточной продукции до брендированных носителей.</template
    >
    <Services class="services" :services="advertisement" />
  </UiCard>
  <UiCard class="services">
    <template #title>Наклейки</template>
    <template #subtitle
      >Мощные инструменты для яркого представления и продвижения ваших товаров и услуг — от
      раздаточной продукции до брендированных носителей.</template
    >
    <Services class="services" :services="stickers" />
  </UiCard>
  <UiCard class="services">
    <template #title>Деловая полиграфия</template>
    <template #subtitle
      >Эффективные носители фирменного стиля и корпоративной айдентики для укрепления имиджа вашей
      компании.</template
    >
    <Services class="services" :services="business" />
  </UiCard>
</template>

<style scoped lang="scss">
.services:not(:last-child) {
  margin-bottom: calc(2 * $normal_gap);
}
</style>
