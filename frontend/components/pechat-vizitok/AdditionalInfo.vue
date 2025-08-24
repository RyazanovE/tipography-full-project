<template>
  <section class="tabs section">
    <UiCard>
      <h2 class="section__header">Дополнительная информация</h2>
      <div class="tabs-nav-container section__content">
        <ul class="tabs-nav">
          <li
            v-for="button in [
              { id: 1, name: 'Основная информация', icon: 'mdiInformationSlabBoxOutline' },
              { id: 2, name: 'Требования к макету визиток', icon: 'mdiRuler' },
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
        <h3 class="tab__header">Как оформить заказ на срочную печать визиток?</h3>
        <p class="tab__text">
          У нас есть несколько удобных вариантов оформления заказа: вы можете прийти в наш копицентр
          и распечатать визитки сразу, без ожидания. Либо оформить заказ дистанционно — через форму
          «Быстрый заказ» на сайте, отправив письмо на почту {{ mail }} или воспользовавшись нашим
          телеграм-ботом.
        </p>
        <p class="tab__text">
          Чтобы быстро узнать стоимость и сразу получить скидку 5%, воспользуйтесь
          онлайн-калькулятором. Бонус будет зачислен на ваш личный счёт.
        </p>
        <h3 class="tab__header">Форматы и материалы для визиток</h3>
        <p class="tab__text">
          Мы предлагаем популярные форматы визиток: 90×50 мм 85×55 мм 90×55 мм В качестве материалов
          для печати используются:
        </p>
        <p class="tab__text">
          Мелованная бумага, Color Copy, Лён, Тач Пейпер, Крафт и другие. Типы бумаги: Матовая (300
          г/м²) — для элегантных визиток. Глянцевая (300 г/м²) — для ярких и блестящих цветов. Color
          Copy — для насыщенных цветов. А для идеального внешнего вида визиток мы предлагаем:
        </p>
        <p class="tab__text">
          Ламинирование (одностороннее и двустороннее). Кругление углов для стильного и аккуратного
          вида. После печати вы можете забрать визитки в наших пунктах выдачи или заказать доставку
          через СДЭК или курьером в день заказа.
        </p>

        <h3 class="tab__header">Почему выбирают нас?</h3>
        <p class="tab__text">
          Срочная печать визиток. Широкий выбор форматов и материалов. Дополнительные услуги для
          улучшения визиток. Гибкие варианты доставки, включая срочную доставку в день заказа.
        </p>
      </div>

      <div class="tabs__tab" :class="{ tabs__tab_active: activeTab === 2 }">
        <div class="tab-technical-requirements">
          <div class="tab-technical-requirements__content technical-requirements">
            <h3 class="technical-requirements__subheader">Форматы файлов для печати</h3>
            <p class="technical-requirements__text">
              Для отправки макета рекомендуем использовать следующие форматы в порядке приоритета:
            </p>
            <ul class="technical-requirements-format-list">
              <li
                v-for="format in ['PDF', 'PSD', 'AI', 'EPS', 'CDR', 'JPEG']"
                class="technical-requirements-format-list__item"
              >
                {{ format }}
                <MdiIcon v-if="format !== 'JPEG'" icon="mdiArrowRightThin" size="20px" />
              </li>
            </ul>
            <p class="technical-requirements__text">
              Файлы в других форматах проходят проверку вручную, что может увеличить время
              подготовки заказа.
              <br />
              Если ваш макет выполнен в программах Illustrator (AI), CorelDraw (CDR), InDesign (ID)
              или сохранён как EPS, необходимо предварительно конвертировать его в PDF либо
              отправить исходный файл на нашу почту для согласования.
            </p>

            <h3 class="technical-requirements__subheader">Шаблоны макетов в популярных форматах</h3>
            <p class="technical-requirements__text">
              Для упрощения подготовки макета рекомендуем использовать наши готовые шаблоны,
              созданные с учётом всех технических требований.
            </p>
            <p class="technical-requirements__text">
              Выберите и скачайте шаблон для вашего графического редактора. Перед началом работы не
              забудьте удалить вспомогательные элементы и рекомендации из файла. При необходимости
              вы также можете скачать подробную инструкцию по правильной работе с шаблонами.
            </p>
            <ul class="technical-requirements-list">
              <li
                v-for="editor in ['Adobe Photoshop', 'Adobe Illustrator', 'CorelDRAW']"
                class="technical-requirements-list__item"
              >
                <ButtonLink>Для {{ editor }}</ButtonLink>
              </li>
            </ul>
            <h3 class="technical-requirements__subheader">Основные параметры макета</h3>
            <ul class="technical-requirements-list">
              <li class="technical-requirements-list__item">Масштаб макета: 1 : 1</li>
              <li class="technical-requirements-list__item">
                Разрешение растровых элементов: 300–600 dpi
              </li>
              <li class="technical-requirements-list__item">
                Размер готового файла: не более 100 МБ
              </li>
              <li class="technical-requirements-list__item">
                Макет может содержать как растровые, так и векторные элементы
              </li>
              <li class="technical-requirements-list__item">
                Все текстовые объекты необходимо перевести в кривые
              </li>
              <li class="technical-requirements-list__item">
                Минимально допустимый размер шрифта: 6 pt
              </li>
              <li class="technical-requirements-list__item">
                Для декоративных и шрифтов с засечками — рекомендуемый размер от 7 pt
              </li>
              <li class="technical-requirements-list__item">
                Избегайте использования составного чёрного цвета для текста и тонких линий
              </li>
              <li class="technical-requirements-list__item">
                Все прозрачности, тени и текстуры должны быть растрированы
              </li>
              <li class="technical-requirements-list__item">
                Каждый макет должен содержать только одно изделие (одна страница = один продукт)
              </li>
              <li class="technical-requirements-list__item">
                Рабочие метки и служебная информация не должны попадать в область печати и вылетов
              </li>
            </ul>

            <h3 class="technical-requirements__subheader">Цветовая модель и профиль</h3>
            <p class="technical-requirements__text">
              Цветовая модель: CMYK (нельзя использовать RGB и другие цветовые модели, это приведет
              к искажению цвета)
              <br />
              Профиль: лучше не внедрять цветовые профили (т.к. они создаются под каждую конкретную
              печатную машину и материал)
              <br />
            </p>
            <ul class="technical-requirements-list">
              <li class="technical-requirements-list__item">
                Заливки менее 3% не печатаются, менее 5% — печать не гарантируется.
              </li>
              <li class="technical-requirements-list__item">
                Самый светлый передаваемый серый — 12%.
              </li>
              <li class="technical-requirements-list__item">
                Максимальная суммарная плотность: до 230% для немелованной бумаги, до 270% для
                мелованной.
              </li>
              <li class="technical-requirements-list__item">
                Серые и черно-белые изображения должны быть в режиме Grayscale.
              </li>
              <li class="technical-requirements-list__item">
                Для чёрных и серых заливок рекомендуется составной чёрный: C20 M20 Y20 K100,
              </li>
            </ul>

            <h3 class="technical-requirements__subheader">Размер и вылеты</h3>
            <p class="technical-requirements__text">
              Размер визитки +3мм с каждой стороны Итоговый размер = размер визитки + 6мм
              <br />
              Если нужна визитка 50x90, то размер макета должен равняться 50x90 + 6мм = 56x96мм
            </p>

            <h3 class="technical-requirements__subheader">Линии и мелкие объекты</h3>
            <p class="technical-requirements__text">
              Мелкие объекты и тонкие линии выглядят лучше, если они окрашены только одной из
              четырех составляющих CMYK. Составной цвет может приводить к появлению цветных ореолов
              вокруг покрашенных им объектов. Не рекомендуется делать мелкие белые объекты, мелкий
              белый текст и тонкие белые линии на фоне, состоящем из нескольких красок, т.к. они
              могут не пропечататься или пропечататься частично Минимальные толщины линий: 0,2 pt —
              для одноцветных линий 0,5 pt — толщина многоцветной линии или белой линии на составном
              фоне
            </p>
          </div>
        </div>
      </div>

      <div class="tabs__tab" :class="{ tabs__tab_active: activeTab === 3 }">
        <PriceTable :rows="priceRows" />

        <div class="price-table__info">
          <h3 class="price-table__info-title">Сроки изготовления</h3>
          <p class="price-table__info-text">
            Срок изготовления: на следующий день после утверждения макета.<br />
            Срочное изготовление: до 500 шт. в течение 3-х часов после утверждения макета. При
            срочном изготовлении стоимость увеличивается на 100%.
          </p>

          <h3 class="price-table__info-title">Условия и дополнительные услуги</h3>
          <p class="price-table__info-text">
            В стоимость входит печать на мелованной бумаге плотностью 300 г/м². Стоимость тиража
            применяется к одному виду макета.
          </p>
          <ul class="price-table__services">
            <li class="price-table__service">
              Ламинирование визитки (глянцевое/матовое) — +14 руб./шт. (срочное изготовление до 200
              шт.)
            </li>
            <li class="price-table__service">
              Ламинация Soft Touch — +20 руб./шт. (премиум покрытие с эффектом бархата, плотность 35
              мкм)
            </li>
            <li class="price-table__service">Закругление углов — +7 руб./шт.</li>
            <li class="price-table__service">Пробивное отверстие (6 мм) — +10 руб./шт.</li>
            <li class="price-table__service">
              Выборочное лакирование (на бумаге Touch Cover) — 1300 руб./100 шт.
            </li>
            <li class="price-table__service">Изготовление цветопробы — от 500 руб. (формат A4)</li>
          </ul>
        </div>
      </div>

      <div class="tabs__tab" :class="{ tabs__tab_active: activeTab === 4 }">
        <DelivertyTable :deliveries />
      </div>
      <div class="tabs__tab" :class="{ tabs__tab_active: activeTab === 5 }">
        <div class="reviews__container">
          <h2 class="reviews__title">Отзывы наших клиентов</h2>
          <Reviews :reviews="reviews" />
        </div>
      </div>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
import { mail } from '~/assets/constants/global'
import { priceRows, deliveries, reviews } from '~/constants/pechat-vizitok'

const activeTab = ref(1)
</script>

<style scoped lang="scss">
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
