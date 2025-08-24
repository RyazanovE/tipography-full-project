<script setup lang="ts">
import mediumZoom from 'medium-zoom'
import { pechatVizitokPrices, services } from '../../constants/pechat-vizitok'
import { VizitkiAdditionalInfo, VizitkiForm } from '#components'

useInitiateBreadcrumbs([
  { title: 'Главная', to: '/' },
  { title: 'Все услуги', to: '/vse-uslugi' },
  { title: 'Печать визиток', to: '/vizitki' }
])

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

onMounted(() => mediumZoom('.zoomable', { background: 'rgba(0,0,0,0.7)' }))

const summ = computed(() => {
  try {
    const printColor = formValue.value.color === 'Черно-белая' ? 1 : 4
    const printTypeParsed =
      printColor + '+' + (formValue.value.format === 'Односторонняя' ? '0' : printColor)
    const amount = Number(formValue.value.amount)
    const index = Math.floor(amount / 100) - 1
    const prices = pechatVizitokPrices[formValue.value.material][printTypeParsed]
    return prices[index] ?? 0
  } catch {
    return 0
  }
})

const addToCart = async () => {
  if (!files.value) {
    isMockupError.value = true
    return
  }

  const payload = new FormData()
  Array.from(files.value).forEach((file) => payload.append('files', file))
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
  <main class="page-container">
    <UiHeader class="page-title">Печать визиток в Москве</UiHeader>

    <section class="content-grid">
      <div class="form-card">
        <VizitkiForm v-model="formValue" />
        <MockupFile
          v-model="files"
          :isMockupError
          @fileChange="onFileChange"
          without-design
          without-prepeared-design
        />
        <ConfirmButtons
          style="margin-top: 20px"
          :summ="summ"
          tooltip-text="sfsdf"
          @addToCart="addToCart"
        />
      </div>

      <aside class="mockup-preview">
        <div class="mockup-image">
          <NuxtPicture src="images/vizitki/vizitki_1.png" :imgAttrs="{ class: 'zoomable' }" />
        </div>
        <div class="mockup-info">
          <UiSubHeader>Изготовление визиток методом цифровой печати</UiSubHeader>
          <p>
            <span
              >Нужна оперативная печать визиток в Москве? Выполним заказ быстро и качественно — на
              современном цифровом оборудовании.</span
            >
            <span>У вас уже есть макет? <ButtonLink>Требования к макетам</ButtonLink></span>
            <span
              >Нет макета? <ButtonLink>Индивидуальный дизайн</ButtonLink>. Предоставьте контакты,
              логотип и детали, а макет сохраним.</span
            >
            <span
              >Узнайте <ButtonLink>стоимость услуг</ButtonLink> и сделайте заказ. Высокое качество и
              срочная печать с доставкой или самовывозом.</span
            >
          </p>
        </div>
      </aside>
    </section>

    <VizitkiAdditionalInfo />

    <section class="section-card">
      <UiCard>
        <h2>Офис типографии</h2>
        <Map />
      </UiCard>
    </section>

    <section class="section-card">
      <UiCard>
        <template #title> Рекомендуемые услуги </template>
        <Services :services="services" />
      </UiCard>
    </section>
  </main>
</template>

<style scoped lang="scss">
.page-container {
  max-width: $app_width;
  margin: 0 auto;
}

.page-title {
  line-height: 32px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $normal_gap * 2;
  margin-bottom: $normal_gap * 2;

  .form-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
  }

  .mockup-preview {
    display: flex;
    flex-direction: column;
    gap: $normal_gap;

    .mockup-image {
      border-radius: $border_radius_normal;
      overflow: hidden;
    }

    .mockup-info {
      h2 {
        margin-bottom: $normal_gap / 2;
        line-height: 28px;
      }
      p span {
        display: block;
        margin-bottom: $normal_gap / 2;
      }
    }
  }
}

.section-card {
  margin-bottom: $normal_gap * 2;

  h2 {
    line-height: 32px;
    margin-bottom: $normal_gap;
  }
}
</style>
