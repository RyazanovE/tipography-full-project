<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
import mediumZoom from 'medium-zoom'
import { pechatVizitokPrices, services } from '../constants/pechat-vizitok'

const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Печать визиток',
    to: '/vizitki'
  }
]

const cart = useCart()
const isMockupError = ref(false)
const files = ref<FileList | null>(null)
const { notify } = useNotification()

const formValue = ref({
  material: 'Мелованная бумага',
  size: '90x50 мм',
  designType: 'Использовать свой макет',
  color: 'Черно-белая',
  format: 'Двусторонняя',
  amount: '100',
  productionTime: 'Стандартное 1-2 рабочих дня',
  lamination: 'Не требуется',
  corners: false,
  holes: false
})

onMounted(() => {
  mediumZoom('.zoomable', { background: 'rgba(0, 0, 0, 0.7)' })
})

const summ = computed(() => {
  const printColor = formValue.value.color === 'Черно-белая' ? 1 : 4
  const printTypeParsed =
    printColor + '+' + (formValue.value.format === 'Односторонняя' ? '0' : printColor)
  console.log('🚀 ~ printTypeParsed:', printTypeParsed)
  const amount = Number(formValue.value.amount)
  const index = Math.floor(amount / 100) - 1
  const prices = pechatVizitokPrices[formValue.value.material][printTypeParsed]
  let price = prices[index]

  return price ?? 0
})

const addToCart = async () => {
  if (!files.value) {
    isMockupError.value = true
    return
  }

  const payload = new FormData()

  if (files.value) {
    Array.from(files.value).forEach((file) => payload.append('files', file))
  }
  payload.append(
    'options',
    JSON.stringify({
      ...formValue.value,
      summ: summ.value,
      type: 'Печать визиток',
      timestamp: Date.now()
    })
  )

  try {
    await cart.addToCart(payload)
    notify('Товар добавлен в корзину', 'success')
  } catch (error) {
    console.error(error)
  }
}

const onFileChange = () => {
  isMockupError.value = false
}
</script>

<template>
  <h1 class="title">Печать визиток в Москве</h1>
  <section class="wrapper">
    <UiCard>
      <PechatVizitokForm v-model="formValue" />

      <MockupFile v-model="files" :isMockupError @fileChange="onFileChange" />

      <ConfirmButtons tooltip-text="sfsdf" :summ @addToCart="addToCart" />
    </UiCard>

    <div class="mockup-container">
      <div class="mockup-img-wrapper">
        <NuxtPicture src="bumaga.png" :imgAttrs="{ class: 'zoomable mockup-img' }" />
      </div>
      <div class="mockup-info">
        <h2 class="mockup-info__header">Изготовление визиток методом цифровой печати.</h2>
        <p class="mockup-info__text">
          <span class="text-part">
            Нужна оперативная печать визиток в Москве? Выполним заказ быстро и качественно — на
            современном цифровом оборудовании, с соблюдением всех стандартов.
          </span>
          <span class="text-part">
            У вас уже есть макет?
            <br />
            Отлично — выберите бумагу и ознакомьтесь с
            <ButtonLink>требованиями к макетам</ButtonLink>, чтобы избежать задержек при печати.
          </span>
          <span class="text-part">
            Нет макета?
            <br />
            Мы разработаем для вас <ButtonLink>индивидуальный дизайн</ButtonLink>. Всё, что
            потребуется — предоставить информацию: контакты, логотип и другие важные детали. Дизайн
            визитки займёт немного времени, а готовый макет мы сохраним для будущих заказов.
          </span>
          Узнайте <ButtonLink>стоимость услуг</ButtonLink> и сделайте заказ. Мы гарантируем высокое
          качество и срочную печать визиток с доставкой или самовывозом.
        </p>
      </div>
    </div>
  </section>

  <PechatVizitokAdditionalInfo />

  <section class="section">
    <UiCard>
      <h2 class="section__header">Офис типографии</h2>
      <div class="section__content">
        <Map />
      </div>
    </UiCard>
  </section>

  <section class="section">
    <UiCard>
      <h2 class="section__header">Рекомендуемые услуги</h2>
      <div class="section__content">
        <Services :services="services" />
      </div>
    </UiCard>
  </section>
</template>

<style>
.medium-zoom-overlay {
  z-index: 998;
}

.medium-zoom-image--opened {
  z-index: 999;
}
</style>

<style scoped lang="scss">
.wrapper,
.title,
.section {
  max-width: $app_width;
  margin: 0 auto;
}

.title {
  margin-bottom: $normal_gap;
  line-height: 32px;
}

.services {
  margin-bottom: $normal_gap;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(2 * $normal_gap);
  margin-bottom: calc(2 * $normal_gap);
}

.calculation-form {
  &__mockups {
    .mockups-label {
      margin-bottom: calc($normal_gap / 2);
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__label {
        font-size: $font-size_normal;
      }
    }

    .mockups-container {
      display: flex;
      gap: $normal_gap;
      margin-bottom: calc($normal_gap/2);
      border-radius: $border_radius_normal;
    }

    .mockup {
      position: relative;
      height: 100px;
      padding: calc($normal_gap / 2) $normal_gap;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: $border_radius_normal;
      flex: 1;
      background-color: $light_gray_background_color;
      cursor: pointer;
      border: 1px solid $primary_border_color;

      &__file-icon {
        position: absolute;
        height: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: 0.3s ease;
        z-index: 10;
        transition: $all-transition;

        &_with-delete {
          left: 65%;
        }

        &_delete {
          transform: translate(-50%, -50%);
          top: 50%;
          left: 35%;
        }

        &:hover {
          transform: translate(-50%, -50%) scale(1.2);
        }

        & > * {
          fill: $white_background_color;
        }
      }

      &::before {
        content: '';
        position: absolute;
        inset: 0; // top:0; right:0; bottom:0; left:0;
        backdrop-filter: blur(2px);
        opacity: 0;
        transition: $all-transition;
        pointer-events: none;
        z-index: 1;
      }

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        opacity: 0;
        z-index: 9;
        transition: $all-transition;
        border-radius: $border_radius_normal;
      }

      &:hover {
        .mockup__file-icon {
          opacity: 1;
        }

        &::after,
        &::before {
          opacity: 1;
        }
      }

      .mockup__title {
        font-size: $font-size_normal;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .ready-mockup {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__icon {
          height: 40px;
        }

        &__text {
          padding-left: calc($normal_gap / 4);
          font-size: $font_size_small;
        }
      }

      .mockup-imgs {
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;

        &__img {
          height: 38px;
        }

        .mockup-file {
          display: flex;
          margin-top: 10px;
          justify-content: space-between;
          height: 80px;

          &__img {
            height: 40px;
          }

          &__name {
            font-size: 12px;
          }
        }
      }
    }
  }
}

.mockup-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .mockup-img-wrapper {
    border-radius: $border_radius_normal;
    overflow: hidden;
  }

  .mockup-info {
    &__header {
      line-height: 24px;
      margin-bottom: $normal_gap;
    }

    &__text {
      .text-part {
        display: block;
        margin-bottom: calc($normal_gap / 2);
      }
    }
  }
}

.section {
  margin-bottom: calc($normal_gap * 2);

  &__header {
    line-height: 32px;
  }

  &__content {
    margin-top: $normal_gap;
  }
}
</style>
