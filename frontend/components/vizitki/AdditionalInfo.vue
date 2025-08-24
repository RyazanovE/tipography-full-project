<template>
  <section class="tabs section">
    <UiCard class="tabs-card">
      <UiSubHeader>Дополнительная информация</UiSubHeader>

      <div class="tabs-nav-container section__content">
        <div class="tabs-nav">
          <button
            v-for="button in tabButtons"
            :key="button.id"
            class="tabs-nav__item"
            :class="{ 'tabs-nav__item--active': button.id === activeTab }"
            @click="activeTab = button.id"
          >
            <MdiIcon :icon="button.icon" class="tabs-nav__icon" />
            <span class="tabs-nav__text">{{ button.name }}</span>
            <div class="tabs-nav__indicator"></div>
          </button>
        </div>
      </div>

      <div class="tabs-content">
        <!-- Tab 1 -->
        <div class="tab-panel" :class="{ 'tab-panel--active': activeTab === 1 }">
          <div class="tab-content">
            <h3 class="tab-content__header">Как оформить заказ на срочную печать визиток?</h3>
            <p class="tab-content__text">
              У нас есть несколько удобных вариантов оформления заказа: вы можете прийти в наш
              копицентр и распечатать визитки сразу, без ожидания. Либо оформить заказ дистанционно
              — через форму «Быстрый заказ» на сайте, отправив письмо на почту {{ mail }} или
              воспользовавшись нашим телеграм-ботом.
            </p>
            <p class="tab-content__text">
              Чтобы быстро узнать стоимость и сразу получить скидку 5%, воспользуйтесь
              онлайн-калькулятором. Бонус будет зачислен на ваш личный счёт.
            </p>

            <h3 class="tab-content__header">Форматы и материалы для визиток</h3>
            <p class="tab-content__text">
              Мы предлагаем популярные форматы визиток: 90×50 мм 85×55 мм 90×55 мм В качестве
              материалов для печати используются:
            </p>
            <p class="tab-content__text">
              Мелованная бумага, Color Copy, Лён, Тач Пейпер, Крафт и другие. Типы бумаги: Матовая
              (300 г/м²) — для элегантных визиток. Глянцевая (300 г/м²) — для ярких и блестящих
              цветов. Color Copy — для насыщенных цветов. А для идеального внешнего вида визиток мы
              предлагаем:
            </p>
            <p class="tab-content__text">
              Ламинирование (одностороннее и двустороннее). Кругление углов для стильного и
              аккуратного вида. После печати вы можете забрать визитки в наших пунктах выдачи или
              заказать доставку через СДЭК или курьером в день заказа.
            </p>

            <h3 class="tab-content__header">Почему выбирают нас?</h3>
            <p class="tab-content__text">
              Срочная печать визиток. Широкий выбор форматов и материалов. Дополнительные услуги для
              улучшения визиток. Гибкие варианты доставки, включая срочную доставку в день заказа.
            </p>
          </div>
        </div>

        <!-- Tab 2 -->
        <div class="tab-panel" :class="{ 'tab-panel--active': activeTab === 2 }">
          <div class="tab-content">
            <TechnicalRequirementsVizitki/>
          </div>
        </div>

        <!-- Tab 3 -->
        <div class="tab-panel" :class="{ 'tab-panel--active': activeTab === 3 }">
          <div class="tab-content">
            <PriceTable :rows="priceRows" />

            <div class="price-info">
              <h3 class="price-info__title">Сроки изготовления</h3>
              <p class="price-info__text">
                Срок изготовления: на следующий день после утверждения макета.<br />
                Срочное изготовление: до 500 шт. в течение 3-х часов после утверждения макета. При
                срочном изготовлении стоимость увеличивается на 100%.
              </p>

              <h3 class="price-info__title">Условия и дополнительные услуги</h3>
              <p class="price-info__text">
                В стоимость входит печать на мелованной бумаге плотностью 300 г/м². Стоимость тиража
                применяется к одному виду макета.
              </p>
              <ul class="services-list">
                <li class="services-list__item">
                  Ламинирование визитки (глянцевое/матовое) — +14 руб./шт. (срочное изготовление до
                  200 шт.)
                </li>
                <li class="services-list__item">
                  Ламинация Soft Touch — +20 руб./шт. (премиум покрытие с эффектом бархата,
                  плотность 35 мкм)
                </li>
                <li class="services-list__item">Закругление углов — +7 руб./шт.</li>
                <li class="services-list__item">Пробивное отверстие (6 мм) — +10 руб./шт.</li>
                <li class="services-list__item">
                  Выборочное лакирование (на бумаге Touch Cover) — 1300 руб./100 шт.
                </li>
                <li class="services-list__item">
                  Изготовление цветопробы — от 500 руб. (формат A4)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Tab 4 -->
        <div class="tab-panel" :class="{ 'tab-panel--active': activeTab === 4 }">
          <div class="tab-content">
            <DelivertyTable :deliveries="deliveries" />
          </div>
        </div>

        <!-- Tab 5 -->
        <div class="tab-panel" :class="{ 'tab-panel--active': activeTab === 5 }">
          <div class="tab-content">
            <div class="reviews-container">
              <Reviews :reviews="reviews" />
            </div>
          </div>
        </div>
      </div>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
import { TechnicalRequirementsVizitki } from '#components'
import { mail } from '~/assets/constants/global'
import { priceRows, deliveries, reviews } from '~/constants/pechat-vizitok'

const activeTab = ref(1)

const tabButtons = [
  { id: 1, name: 'Основная информация', icon: 'mdiInformationSlabBoxOutline' },
  { id: 2, name: 'Требования к макету', icon: 'mdiRuler' },
  { id: 3, name: 'Стоимость и сроки', icon: 'mdiCash100' },
  { id: 4, name: 'Оплата и доставка', icon: 'mdiTruckDelivery' },
  { id: 5, name: 'Отзывы', icon: 'mdiCommentQuoteOutline' }
]
</script>

<style scoped lang="scss">
.tabs {
  margin-top: 48px;
  margin-bottom: 40px;

  &-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
  }

  .section {
    &__header {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      text-align: center;
      margin-bottom: 32px;
      background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &__content {
      margin-top: 0;
    }
  }

  .tabs-nav-container {
    display: flex;
    justify-content: center;
    background: #f8fafc;
    padding: 24px;
    border-bottom: 1px solid #e2e8f0;
  }

  .tabs-nav {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 24px;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 200px;
      text-align: left;

      &:hover {
        border-color: #3b82f6;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
      }

      &--active {
        border-color: #3b82f6;
        background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
        color: white;

        & > * {
          color: white;

          & > * {
            color: white;
          }
        }

        .tabs-nav__icon {
          color: white;
        }

        .tabs-nav__indicator {
          opacity: 1;
          transform: scaleX(1);
        }
      }
    }

    &__icon {
      color: #6b7280;
      transition: color 0.3s ease;
      font-size: 20px;
    }

    &__text {
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
    }

    &__indicator {
      position: absolute;
      bottom: -2px;
      left: 8px;
      right: 8px;
      height: 3px;
      background: linear-gradient(90deg, #8b5cf6, #ec4899);
      border-radius: 2px;
      opacity: 0;
      transform: scaleX(0);
      transition: all 0.3s ease;
    }
  }

  .tabs-content {
    padding: 32px;
  }

  .tab-panel {
    display: none;
    animation: fadeIn 0.5s ease;

    &--active {
      display: block;
    }
  }

  .tab-content {
    &__header {
      font-size: 22px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e2e8f0;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 60px;
        height: 2px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      }
    }

    &__text {
      font-size: 16px;
      line-height: 1.7;
      color: #4b5563;
      margin-bottom: 20px;
      padding-left: 20px;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #3b82f6;
        font-weight: bold;
      }
    }
  }

  .price-info {
    background: #f8fafc;
    padding: 24px;
    border-radius: 12px;
    margin-top: 32px;
    border: 1px solid #e2e8f0;

    &__title {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
    }

    &__text {
      font-size: 16px;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 24px;
    }
  }

  .services-list {
    list-style: none;
    padding: 0;

    &__item {
      padding: 12px 16px;
      margin-bottom: 8px;
      background: white;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
      font-size: 14px;
      color: #4b5563;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateX(4px);
      }
    }
  }

  .reviews-container {
    text-align: center;

    .reviews-title {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 32px;
      background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .tabs {
    margin-top: 32px;

    .tabs-nav {
      flex-direction: column;
      gap: 12px;

      &__item {
        min-width: auto;
        width: 100%;
        justify-content: center;
        text-align: center;
      }
    }

    .tabs-content {
      padding: 24px 16px;
    }

    .section__header {
      font-size: 24px;
      margin-bottom: 24px;
    }

    .tab-content__header {
      font-size: 20px;
    }
  }
}
</style>
