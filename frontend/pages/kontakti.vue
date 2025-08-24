<script setup lang="ts">
import { mail, phone } from '~/assets/constants/global'
import { useBreadcrumbs } from '~/stores/breadcrumbs'
import { useFastPurchaseModal } from '~/stores/fast-purchase-modal'
const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Контакты',
    to: '/kontakti'
  }
]

const isFastPurchaseModalShown = useFastPurchaseModal()
</script>

<template>
  <h1 class="title">Москва, Контактная информация и адрес</h1>

  <UiCard class="services">
    <template #subtitle>Онлайн-заказы принимаем круглосуточно!</template>

    <div class="contact-info">
      <div class="info-block">
        <MdiIcon icon="mdiPhone" size="20px" class="icon" />
        <div class="info-content">
          <span class="label">Номер горячей линии:</span>
          <a :href="`tel:${phone}`" class="link">{{ phone }}</a>
          <span class="note">Рабочие дни с 9:00 до 19:00 (Мск), звонок бесплатный</span>
        </div>
      </div>

      <div class="info-block">
        <MdiIcon icon="mdiEmail" size="20px" class="icon" />
        <div class="info-content">
          <span class="label">Почта:</span>
          <a :href="`mailto:${mail}`" class="link">{{ mail }}</a>
        </div>
      </div>
    </div>

    <ButtonSolid class="services__button" @click="isFastPurchaseModalShown = true">
      Форма обратной связи
    </ButtonSolid>
  </UiCard>

  <UiCard class="services">
    <template #title>Офис</template>
    <template #subtitle>г. Москва, ул. Строителей, 3</template>
    <p class="services__text"><MdiIcon icon="mdiClock" size="20px" class="icon" /> Время работы: с 9:00 до 18:00</p>
    <Map class="map" />
  </UiCard>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: $normal_gap;
  font-size: 24px;
  font-weight: 700;
  color: #222;
}

.services:not(:last-child) {
  margin-bottom: calc(2 * $normal_gap);
}

.services__text {
  display: flex;
  gap: calc($normal_gap/2);

  margin-bottom: $normal_gap;
  font-size: 14px;
  color: #555;
}

.services__button {
  margin-top: $normal_gap;
  padding-left: 1.2em;
  padding-right: 1.2em;
  font-weight: 500;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;

  .info-block {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .icon {
    font-size: 20px;
    margin-top: 2px;
  }

  .info-content {
    display: flex;
    flex-direction: column;
  }

  .label {
    font-weight: 600;
    margin-bottom: 2px;
  }

  .link {
    color: #007bff;
    text-decoration: none;
    margin-bottom: 4px;

    &:hover {
      text-decoration: underline;
    }
  }

  .note {
    color: #666;
    font-size: 13px;
  }
}

</style>
