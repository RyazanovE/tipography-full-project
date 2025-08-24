<script lang="ts" setup>
import Services from '~/components/Services.vue'

useInitiateBreadcrumbs([
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Требования к макетам',
    to: '/trebovniya-k-maketam'
  }
])

const generalInfo = [
  {
    title: 'Общие требования к макетам',
    img: './images/categories/visiting-cards.png',
    to: '/trebovniya-k-maketam/obshchie-trebovaniya-k-maketam',
    icon: 'mdiInformationSlabBox'
  },
  {
    title: 'Частые ошибки при подготовке макетов',
    img: './images/categories/listovki-i-flaeri.png',
    to: './trebovniya-k-maketam/chastye-oshibki-pri-podgotovke-maketov',
    icon: 'mdiAlertCircle'
  },
  {
    title: 'Частые вопросы при подготовке макетов',
    img: './images/categories/buklet.png',
    to: './trebovniya-k-maketam/chastye-voprosy-pri-podgotovke-maketov',
    icon: 'mdiHelpBox'
  },
  {
    title: 'Как подготовить макет для печати',
    img: './images/categories/poster.png',
    icon: 'mdiPrinter',
    disabled: true
  }
]

const categories = [
  {
    title: 'Визитки',
    img: './images/categories/visiting-cards.png',
    to: '/trebovniya-k-maketam/vizitki',
    icon: 'mdiCardAccountDetails',
    disabled: false
  },
  {
    title: 'Листовки и флаеры',
    img: './images/categories/listovki-i-flaeri.png',
    to: './trebovniya-k-maketam/listovki-i-flaeri',
    icon: 'mdiFileDocument',
    disabled: false
  },
  {
    title: 'Буклеты и лифлеты',
    img: './images/categories/buklet.png',
    to: './trebovniya-k-maketam/bukleti',
    icon: 'mdiBookOpenVariant',
    disabled: false
  },
  {
    title: 'Широкоформатная печать',
    img: './images/categories/poster.png',
    to: '/trebovniya-k-maketam/shirokoformatnaya-pechat',
    icon: 'mdiPrinter',
    disabled: true
  },
  {
    title: 'Открытки',
    img: './images/categories/envelope.png',
    to: './trebovniya-k-maketam/otkrytki',
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

const formatTypes = [
  {
    title: 'Adobe Illustrator',
    img: './images/categories/visiting-cards.png',
    to: '/trebovniya-k-maketam/adobe-illustrator',
    text: 'AI',
    icon: 'mdiCardAccountDetails'
  },
  {
    title: 'Corel Draw',
    img: './images/categories/buklet.png',
    icon: 'mdiBookOpenVariant',
    to: '/trebovniya-k-maketam/corel-draw',
    text: 'CDR'
  },
  {
    title: 'Adobe Photoshop',
    img: './images/categories/poster.png',
    icon: 'mdiPrinter',
    to: '/trebovniya-k-maketam/adobe-photoshop',
    text: 'PSD'
  }
]
</script>

<template>
  <UiHeader>Требования к макетам</UiHeader>
  <div name="title">
    <h3 class="services__title" style="margin-top: 20px">Общая информация по подготовке макетов</h3>
    <Services
      :services="generalInfo"
      styles="background-color: white"
      style="margin-top: 20px; margin-bottom: 40px"
    />
    <h3 class="services__title">По видам продукции</h3>
    <section class="services">
      <Services :services="categories" styles="background-color: white" />
      <h3 class="services__title" style="margin-top: 40px">
        Информация по подготовки макетов соответствующего формата
      </h3>
      <Services :services="formatTypes" styles="background-color: white" style="margin-top: 20px" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.services {
  &__title {
    margin-top: 40px;
    margin-bottom: 20px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    .service-card {
      height: 200px;
      padding: $normal_gap;
      background-color: white;
      border-radius: $border_radius_large;
      position: relative;
      cursor: pointer;
      transition: $box-shadow-transition;

      &:hover {
        box-shadow: 0 0 0 1px #0000000a, 0 4px 4px #0000000a, 0 20px 40px #00000014;
      }

      &__title {
        margin-bottom: 10px;
      }

      &__body {
        display: flex;
        gap: 20px;
      }

      &__img {
        height: 140px;
        object-fit: cover;
        margin: 0 auto;
      }

      &__link {
        color: $dark_gray_text_color;
        font-weight: 300;
        text-align: start;
      }
    }
  }
}
</style>
