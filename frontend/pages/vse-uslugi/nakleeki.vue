<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
import { mail } from '~/assets/constants/global'
import mediumZoom from 'medium-zoom'
import { reviews, services } from '../../constants/pechat-vizitok'

const breadcrumbs = useBreadcrumbs()

const activeTab = ref(1)

const docOptions: { [key: string]: { label: string; value: string; cost?: number }[] } = {
  size: [
    {
      label: 'Евро (100x210 мм)',
      value: 'Евро (100x210 мм)'
    },
    {
      label: 'А7 (74x105 мм)',
      value: 'А7 (74x105 мм)'
    },
    {
      label: 'А6 (105x148 мм)',
      value: 'А6 (105x148 мм)'
    },
    {
      label: 'А5 (148x210 мм)',
      value: 'А5 (148x210 мм)'
    },
    {
      label: 'А4 (210x297 мм)',
      value: 'А4 (210x297 мм)'
    },
    {
      label: 'А3 (297x420 мм)',
      value: 'А3 (297x420 мм)'
    }
  ],
  color: [
    {
      label: 'Черно-белая',
      value: 'Черно-белая'
    },
    {
      label: 'Цветная',
      value: 'Цветная'
    }
  ],
  format: [
    {
      label: 'Односторонняя',
      value: 'Односторонняя'
    },
    {
      label: 'Двусторонняя',
      value: 'Двусторонняя'
    }
  ],
  lamination: [
    {
      label: 'Не выбрано',
      value: 'Не выбрано'
    },
    {
      label: 'Одностороннee',
      value: 'Одностороннee'
    },
    {
      label: 'Двустороннee',
      value: 'Двустороннee'
    }
  ],
  productionTime: [
    {
      label: 'Стандартное 1 день',
      value: 'Стандартное 1 день'
    },
    {
      label: 'Срочное до 4х часов',
      value: 'Срочное до 4х часов'
    }
  ]
}

onMounted(() => {
  mediumZoom('.zoomable', { background: 'rgba(0, 0, 0, 0.7)' })
})

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Печать наклеек',
    to: '/pechat-nakleek'
  }
]

const formValue = ref({
  size: 'Евро (100x210 мм)',
  format: 'Односторонняя',
  color: 'Черно-белая',
  productionTime: 'Стандартное 1 день',
  lamination: 'Не выбрано',
  amount: '1'
})
const file = ref<File | null>(null)

const summ = computed(() => {
  return Object.keys(formValue.value).reduce((acc, key) => {
    const value = formValue.value[key as keyof typeof formValue.value]

    const option = docOptions[key as keyof typeof docOptions]?.find((opt) => opt.value === value)

    if (option?.cost) {
      return acc + option.cost
    }

    return acc
  }, 21.32)
})
</script>

<template>
  <h1 class="title">Печать наклеек в Москве</h1>
  <section class="wrapper">
    <UiCard>
      <form class="calculation-form" @submit.prevent>
        <h3 class="calculation-form__title">Расчет стоимости</h3>

        <UiSelect
          v-model="formValue.size"
          class="calculation-form__select"
          label="Формат листовки"
          :options="docOptions.size"
          tooltop-text="sdf"
        />
        <UiSelect
          v-model="formValue.color"
          class="calculation-form__select"
          label="Цветность"
          :options="docOptions.color"
          tooltop-text="sdf"
        />
        <UiSelect
          v-model="formValue.format"
          class="calculation-form__select"
          label="Тип печати"
          :options="docOptions.format"
          tooltop-text="sdf"
        />
        <UiSelect
          v-model="formValue.lamination"
          class="calculation-form__select"
          label="Ламинирование"
          :options="docOptions.lamination"
          tooltop-text="sdf"
        />
        <UiSelect
          v-model="formValue.productionTime"
          class="calculation-form__select"
          label="Время изготовления"
          :options="docOptions.productionTime"
          tooltop-text="sdf"
        />
        <UiInput v-model="formValue.amount" placeholder="" id="amount" label="Количество" />

        <div class="calculation-form__comment">
          <div class="comment-label">
            <label class="comment-label__label">Комментарий к заказу</label>
            <UiTooltip class="material-label__tooltip"> sdfsfd </UiTooltip>
          </div>
          <UiInput textarea id="comment" placeholder="" class="comment-textarea" />
        </div>

        <MockupFile v-model="file" without-design without-prepeared-design />

        <div class="calculation-form__summ">
          <div class="summ">
            <span class="summ__value">от {{ summ * Number(formValue.amount) }} руб.</span>
            <UiTooltip> dsfsfd </UiTooltip>
          </div>
          <ButtonSolid> В корзину </ButtonSolid>
        </div>
      </form>
    </UiCard>

    <div class="mockup-container">
      <div class="mockup-img-wrapper">
        <NuxtPicture src="bumaga.png" :imgAttrs="{ class: 'zoomable mockup-img' }" />
      </div>
      <div class="mockup-info">
        <h2 class="mockup-info__header">
          Печать листовок и флаеров — ярко, быстро и с гарантией качества.
        </h2>
        <p class="mockup-info__text">
          <span class="text-part">
            Хотите привлечь внимание к акции, мероприятию или вашему бизнесу?
            <br />
            Мы поможем — печатаем листовки и флаеры на современном оборудовании с чёткой
            детализацией и яркими цветами.
          </span>
          <span class="text-part">
            Есть готовый макет?
            <br />
            Отлично! Загрузите файл, выберите бумагу, цветность, одностороннюю или двустороннюю
            печать — и мы сразу начнём работу.
          </span>
          <span class="text-part">
            Нужна помощь с дизайном?
            <br />
            Наши специалисты подскажут, как сделать листовку эффективной, помогут с версткой и
            подготовкой к печати.
          </span>
          Узнайте <ButtonLink>стоимость печати</ButtonLink> и оформите заказ онлайн. Предлагаем
          быструю печать, доставку и самовывоз.
        </p>
      </div>
    </div>
  </section>

  <section class="tabs section">
    <UiCard>
      <div class="tabs-nav-container">
        <ul class="tabs-nav">
          <li
            v-for="button in [
              { id: 1, name: 'Основная информация', icon: 'mdiInformationSlabBoxOutline' },
              { id: 2, name: 'Требования к макету документов', icon: 'mdiRuler' },
              { id: 3, name: 'Стоимость и сроки печати', icon: 'mdiCash100' },
              { id: 4, name: 'Оплата и доставка', icon: 'mdiTruckDelivery' },
              { id: 5, name: 'Отзывы', icon: 'mdiCommentQuoteOutline' }
            ]"
            class="tabs-nav__item"
            :key="button.name"
          >
            <ButtonIcon
              @click="activeTab = button.id"
              :icon="button.icon"
              class="tabs-item-button"
              :class="{ 'tabs-item-button_active': button.id === activeTab }"
            >
              {{ button.name }}
            </ButtonIcon>
          </li>
        </ul>
      </div>

      <div class="tabs__tab tab" :class="{ tabs__tab_active: activeTab === 1 }">
        <h3 class="tab__header">Как заказать печать листовок и флаеров?</h3>
        <p class="tab__text">
          Вы можете заказать печать в нашем копицентре без ожидания — просто приходите с готовым
          макетом на флешке или отправьте файл прямо на месте. Также доступен онлайн-заказ: через
          форму «Быстрый заказ» на сайте, по почте {{ mail }} или через телеграм-бот.
        </p>
        <p class="tab__text">
          Для расчёта стоимости и получения скидки 5% воспользуйтесь онлайн-калькулятором — бонус
          сразу будет зачислен на ваш счёт.
        </p>

        <h3 class="tab__header">Варианты и параметры печати</h3>
        <p class="tab__text">
          Мы печатаем листовки и флаеры разных форматов, тиражей и дизайнов. Вы можете выбрать:
        </p>
        <p class="tab__text">
          - Глянцевую или матовую бумагу (от 130 до 250 г/м²)<br />
          - Одностороннюю или двустороннюю печать<br />
          - Цветовую насыщенность и допечатную обработку<br />
          - Ламинацию, скругление углов, биговку, постпечатные услуги
        </p>
        <p class="tab__text">
          Готовую продукцию можно забрать самовывозом или заказать курьерскую доставку — возможно в
          тот же день.
        </p>

        <h3 class="tab__header">Почему заказывают у нас?</h3>
        <p class="tab__text">
          Яркая и качественная печать на профессиональном оборудовании. Индивидуальный подход и
          помощь в подготовке макета. Срочное изготовление, удобная оплата, доставка или самовывоз
          без ожидания.
        </p>
      </div>

      <div class="tabs__tab" :class="{ tabs__tab_active: activeTab === 2 }"></div>

      <div class="tabs__tab" :class="{ tabs__tab_active: activeTab === 3 }">
        <h3 class="price-table__title">Стоимость печати</h3>
        <table class="price-table">
          <thead class="price-table__head">
            <tr class="price-table__row">
              <th rowspan="2" class="price-table__header">
                <span class="price-table__cmyk">Формат / Цветность</span>
              </th>
              <th colspan="5" class="price-table__header price-table__header--center">
                Количество экземпляров и стоимость
              </th>
            </tr>
            <tr class="price-table__row">
              <th class="price-table__header">50 шт.</th>
              <th class="price-table__header">100 шт.</th>
              <th class="price-table__header">200 шт.</th>
              <th class="price-table__header">500 шт.</th>
              <th class="price-table__header">1000 шт.</th>
            </tr>
          </thead>
          <tbody class="price-table__body">
            <!-- A6 -->
            <tr class="price-table__row">
              <td class="price-table__cell">A6 цветн. односторонняя</td>
              <td class="price-table__cell">2240 ₽</td>
              <td class="price-table__cell">2450 ₽</td>
              <td class="price-table__cell">3355 ₽</td>
              <td class="price-table__cell">7160 ₽</td>
              <td class="price-table__cell">13200 ₽</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">A6 цветн. двусторонняя</td>
              <td class="price-table__cell">2500 ₽</td>
              <td class="price-table__cell">3110 ₽</td>
              <td class="price-table__cell">4510 ₽</td>
              <td class="price-table__cell">10270 ₽</td>
              <td class="price-table__cell">16665 ₽</td>
            </tr>

            <!-- A5 -->
            <tr class="price-table__row">
              <td class="price-table__cell">A5 цветн. односторонняя</td>
              <td class="price-table__cell">2640 ₽</td>
              <td class="price-table__cell">3380 ₽</td>
              <td class="price-table__cell">5450 ₽</td>
              <td class="price-table__cell">12570 ₽</td>
              <td class="price-table__cell">24120 ₽</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">A5 цветн. двусторонняя</td>
              <td class="price-table__cell">3250 ₽</td>
              <td class="price-table__cell">4150 ₽</td>
              <td class="price-table__cell">7900 ₽</td>
              <td class="price-table__cell">17750 ₽</td>
              <td class="price-table__cell">32850 ₽</td>
            </tr>

            <!-- A4 -->
            <tr class="price-table__row">
              <td class="price-table__cell">A4 цветн. односторонняя</td>
              <td class="price-table__cell">3520 ₽</td>
              <td class="price-table__cell">5600 ₽</td>
              <td class="price-table__cell">9650 ₽</td>
              <td class="price-table__cell">23250 ₽</td>
              <td class="price-table__cell">46380 ₽</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">A4 цветн. двусторонняя</td>
              <td class="price-table__cell">5555 ₽</td>
              <td class="price-table__cell">7810 ₽</td>
              <td class="price-table__cell">14860 ₽</td>
              <td class="price-table__cell">30350 ₽</td>
              <td class="price-table__cell">60390 ₽</td>
            </tr>

            <!-- A3 -->
            <tr class="price-table__row">
              <td class="price-table__cell">A3 цветн. односторонняя</td>
              <td class="price-table__cell">6930 ₽</td>
              <td class="price-table__cell">12990 ₽</td>
              <td class="price-table__cell">25170 ₽</td>
              <td class="price-table__cell">61750 ₽</td>
              <td class="price-table__cell">122820 ₽</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">A3 цветн. двусторонняя</td>
              <td class="price-table__cell">9740 ₽</td>
              <td class="price-table__cell">18540 ₽</td>
              <td class="price-table__cell">36210 ₽</td>
              <td class="price-table__cell">89200 ₽</td>
              <td class="price-table__cell">177585 ₽</td>
            </tr>
          </tbody>
        </table>

        <div class="price-table__info">
          <h3 class="price-table__info-title">Сроки изготовления</h3>
          <p class="price-table__info-text">
            Срок изготовления: на следующий день после утверждения макета.<br />
            Срочное изготовление: до 500 шт. в течение 3-х часов после утверждения макета. При
            срочном изготовлении стоимость увеличивается на 100%.
          </p>
        </div>
      </div>

      <div class="tabs__tab" :class="{ tabs__tab_active: activeTab === 4 }">
        <h3 class="price-table__title">Виды доставки</h3>
        <table class="price-table">
          <thead class="price-table__head">
            <tr class="price-table__row">
              <th class="price-table__header">Тип доставки</th>
              <th class="price-table__header">Стоимость</th>
              <th class="price-table__header">Сроки</th>
            </tr>
          </thead>
          <tbody class="price-table__body">
            <tr class="price-table__row">
              <td class="price-table__cell">
                Бесплатная доставка по Москве
                <br /><span class="price-table__note"
                  >* при заказе через сайт от 10 000 ₽ или через менеджеров от 20 000 ₽</span
                >
              </td>
              <td class="price-table__cell">0 ₽</td>
              <td class="price-table__cell">от 1 дня</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">Доставка курьером по Москве (в пределах МКАД)</td>
              <td class="price-table__cell">790 ₽</td>
              <td class="price-table__cell">от 1 до 3 дней</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">Доставка курьером за МКАД</td>
              <td class="price-table__cell">1000 ₽</td>
              <td class="price-table__cell">от 1 до 3 дней</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">
                Срочная доставка такси (Москва и область)
                <br /><span class="price-table__note">Максимальный вес заказа 20 кг</span>
              </td>
              <td class="price-table__cell">3000 ₽ (физ. лица)<br />5000 ₽ (юр. лица)</td>
              <td class="price-table__cell">день в день</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">Доставка СДЭК "до двери" по России</td>
              <td class="price-table__cell">от 790 ₽</td>
              <td class="price-table__cell">от 1 до 10 дней</td>
            </tr>
            <tr class="price-table__row">
              <td class="price-table__cell">Доставка до пункта самовывоза СДЭК</td>
              <td class="price-table__cell">от 790 ₽</td>
              <td class="price-table__cell">от 1 до 10 дней</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tabs__tab" :class="{ tabs__tab_active: activeTab === 5 }">
        <div class="reviews__container">
          <h2 class="reviews__title">Отзывы наших клиентов</h2>
          <Reviews :reviews="reviews" />
        </div>
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
  .materials-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc($normal_gap / 4);

    &__label {
      font-size: $font-size_normal;
    }
  }

  .materials {
    display: flex;
    gap: $normal_gap;
    margin-bottom: calc($normal_gap / 2);
    justify-content: space-between;

    &__material {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: calc($normal_gap / 4);

      &__txt-btn {
        transition: 0.3s ease;

        &_active {
          color: $primary_background_color;
        }
      }

      .material-btn {
        position: relative;
        border-radius: $border_radius_normal;
        overflow: hidden;

        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        border: 2px solid $white_background_color;

        &_active {
          border: 2px solid $primary_background_color;
        }

        &__img {
          max-: 60px;
          object-fit: cover;
          transition: 0.3s ease;
        }

        &__icon {
          position: absolute;
          height: 30px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: 0.3s ease;
          z-index: 10;
          transition: $all-transition;

          &:hover {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2);
          }

          & > * {
            fill: $white_background_color;
          }
        }

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          z-index: 9;
          transition: 0.3s ease;
        }

        &:hover {
          .material-btn__img {
            filter: blur(2px);
          }

          .material-btn__icon {
            opacity: 1;
          }

          &::after {
            opacity: 1;
          }
        }
      }
    }
  }

  &__additional-options {
    margin-bottom: calc($normal_gap / 2);

    .additional-options-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: calc($normal_gap / 4);

      &__label {
        display: block;
        font-size: $font-size_normal;
      }
    }

    .additional-options {
      display: flex;
      align-items: center;
      gap: $normal_gap;

      &__option {
        display: flex;
        align-items: center;
      }
    }
  }

  &__comment {
    margin-bottom: calc($normal_gap / 2);
    margin-top: calc($normal_gap / 2);

    .comment-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: calc($normal_gap / 4);

      &__label {
        display: block;
        font-size: $font-size_normal;
      }
    }
  }

  &__summ {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .summ {
      display: flex;
      align-items: center;
      gap: calc($normal_gap / 2);

      &__value {
        color: black;
        font-weight: 600;
        font-size: $font-size_larger;
      }
    }
  }

  &__title {
    margin-bottom: $normal_gap;
  }

  &__select {
    margin-bottom: calc($normal_gap/2);
  }

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
    display: flex;
    align-items: center;
    height: 200px;
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

.tabs {
  margin-top: $normal_gap;

  .tabs-nav-container {
    display: flex;
    justify-content: center;

    .tabs-nav {
      display: flex;
      gap: calc($normal_gap * 4);
      align-items: center;
      margin-bottom: $normal_gap;

      &__item {
        .tabs-item-button {
          &_active {
            background-color: $light_gray_background_color;
          }
        }
      }
    }
  }

  .tabs__tab {
    // Стили для вкладки
    display: none;
    margin-bottom: $normal_gap;

    &_active {
      // Стили для активной вкладки
      display: block;
    }

    .tab {
      &__header {
        margin-bottom: calc($normal_gap/2);
      }

      &__text {
        display: block;
        margin-bottom: calc($normal_gap/2);
      }
    }
  }

  .tab-technical-requirements {
    &__header {
      // Заголовок блока требований
      margin-bottom: $normal_gap;
    }

    &__content {
      // Обертка содержимого
    }
  }

  .technical-requirements {
    &__subheader {
      // Подзаголовки внутри требований
      margin-bottom: calc($normal_gap / 2);
    }

    &__images {
      // Изображения внутри требований
      display: flex;

      .technical-requirements-img {
        // Изображения внутри требований
        height: 50px;
      }
    }

    &__text {
      // Текстовые блоки
      font-size: $font-size_normal;
      display: block;
      margin-bottom: calc($normal_gap / 2);
    }

    .technical-requirements-format-list {
      list-style-type: none;
      display: flex;
      align-items: center;
      gap: calc($normal_gap / 4);
      margin-bottom: calc($normal_gap / 2);

      &__item {
        font-size: $font-size_normal;
        display: flex;
        gap: calc($normal_gap / 4);
        align-items: center;
        border-radius: 8px;

        .image {
          height: 40px;
        }
      }
    }

    &__important {
      // Особо важная информация
    }
  }

  .technical-requirements-list {
    list-style-type: disc;
    display: block;
    margin-bottom: calc($normal_gap / 2);

    &__item {
      font-size: $font-size_normal;
      margin-left: $normal_gap;
      font-size: $font-size_normal;
    }
  }

  .price-table {
    width: 100%;
    border-collapse: collapse;

    &__title {
      display: block;
      margin-bottom: $normal_gap;
      line-height: 24px;
    }

    &:first-of-type {
      margin-bottom: $normal_gap;
    }

    &__head {
      background-color: $light_gray_background_color;
    }

    &__row {
      border-bottom: 1px solid #ddd;
    }

    &__header {
      padding: 10px;
      font-weight: bold;
      text-align: center;

      &--center {
        text-align: center;
      }
    }

    &__body {
      background-color: #fff;
    }

    &__cell {
      padding: calc($normal_gap/2) $normal_gap;
      text-align: center;
    }

    &__cmyk {
      font-weight: bold;
      color: #333;
    }
  }

  .price-table__info {
    margin-top: $normal-gap;
    font-size: $font_size_large;
    line-height: 1.5;
    color: #333;
  }

  .price-table__info-title {
    font-size: $font_size_large;
    font-weight: bold;
    margin-bottom: $normal-gap;
    color: #222;
  }

  .price-table__info-text {
    margin-bottom: $normal-gap;
  }

  .price-table__services {
    list-style: disc inside;
    padding-left: $normal-gap;
  }

  .price-table__service {
    margin-bottom: calc($normal-gap/2);
  }

  .reviews {
    padding: $normal_gap * 3 $normal_gap;
    background-color: $light_gray_background_color;

    &__container {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    &__title {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: $normal_gap * 2;
      color: #333;
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
