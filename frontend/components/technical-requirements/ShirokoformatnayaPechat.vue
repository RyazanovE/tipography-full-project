<template>
  <h1 style="margin-bottom: 20px">Требования к макетам широкоформатной печати</h1>
  <TechnicalRequirementsDefinitionBlock title="Широкоформатная печать">
    эффективный способ создания крупноформатной визуальной рекламы и информационных материалов.
    Используется для изготовления баннеров, плакатов, вывесок, постеров, витрин и стендов. Такая
    печать позволяет передать яркие цвета и чёткие изображения на различных материалах: бумаге,
    виниле, плёнке, баннерной ткани. Актуальна как для наружной рекламы, так и для интерьерного
    оформления, предоставляя широкий спектр форматов и вариантов отделки.
  </TechnicalRequirementsDefinitionBlock>
  <TechnicalRequirementsDefinitionBlock title="X-баннер">
    лёгкая и мобильная конструкция для размещения рекламной или информационной графики. Состоит из
    гибкого каркаса в форме буквы «X» и полотна с люверсами по углам. Быстро устанавливается и
    удобно транспортируется, что делает его идеальным для выставок, презентаций, торговых точек и
    других мероприятий. Полотно легко заменяется, позволяя использовать конструкцию многократно.
  </TechnicalRequirementsDefinitionBlock>
  <TechnicalRequirementsDefinitionBlock title="Roll-up">
    удобная и презентабельная мобильная конструкция для демонстрации рекламы или информации.
    Представляет собой полотно с печатью, которое закреплено внутри основания с механизмом скрутки.
    Разворачивается за секунды и удерживается вертикальной штангой. Широко используется на
    выставках, презентациях, в торговых залах и офисах. Полотно легко заменяется, конструкция
    компактна при транспортировке и не требует специальных навыков для установки.
  </TechnicalRequirementsDefinitionBlock>
  <TechnicalRequirementsDefinitionBlock title="Бренд-волл">
    фоновая конструкция с повторяющимися логотипами или элементами фирменного стиля, используемая
    для фотозон, пресс-воллов и официальных мероприятий. Представляет собой каркас с натянутым
    баннером или тканевым полотном. Привлекает внимание и подчёркивает узнаваемость бренда на
    выставках, конференциях, церемониях и презентациях. Может изготавливаться в различных размерах и
    вариантах исполнения — с подсветкой, текстильной печатью или ПВХ-панелями.
  </TechnicalRequirementsDefinitionBlock>
  <div class="tab-technical-requirements__content technical-requirements">
    <TechnicalRequirementsFormats :formats="['Tiff', 'Cdr']"/>

    <h3 class="technical-requirements__subheader">Основные параметры макета</h3>
    <ul class="technical-requirements-list">
      <li class="technical-requirements-list__item">Масштаб макета: 1 : 1</li>
      <li class="technical-requirements-list__item">Разрешение растровых элементов: 300–600 dpi</li>
      <li class="technical-requirements-list__item">Размер готового файла: не более 100 МБ</li>
      <li class="technical-requirements-list__item">
        Макет может содержать как растровые, так и векторные элементы
      </li>
      <li class="technical-requirements-list__item">
        Все текстовые объекты необходимо перевести в кривые
      </li>
      <li class="technical-requirements-list__item">Минимально допустимый размер шрифта: 6 pt</li>
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
      Цветовая модель: CMYK (нельзя использовать RGB и другие цветовые модели, это приведет к
      искажению цвета)
      <br />
      Профиль: лучше не внедрять цветовые профили (т.к. они создаются под каждую конкретную печатную
      машину и материал)
      <br />
    </p>
    <ul class="technical-requirements-list">
      <li class="technical-requirements-list__item">
        Заливки менее 3% не печатаются, менее 5% — печать не гарантируется.
      </li>
      <li class="technical-requirements-list__item">Самый светлый передаваемый серый — 12%.</li>
      <li class="technical-requirements-list__item">
        Максимальная суммарная плотность: до 230% для немелованной бумаги, до 270% для мелованной.
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
      Размер листовки +5мм с каждой стороны Итоговый размер = размер листовки + 5мм
      <br />
      Если нужна листовка 210x297 мм, то размер макета должен равняться 210x297 + 10мм = 220x317мм
    </p>

    <h3 class="technical-requirements__subheader">Линии и мелкие объекты</h3>
    <p class="technical-requirements__text">
      Мелкие объекты и тонкие линии выглядят лучше, если они окрашены только одной из четырех
      составляющих CMYK. Составной цвет может приводить к появлению цветных ореолов вокруг
      покрашенных им объектов. Не рекомендуется делать мелкие белые объекты, мелкий белый текст и
      тонкие белые линии на фоне, состоящем из нескольких красок, т.к. они могут не пропечататься
      или пропечататься частично Минимальные толщины линий: 0,2 pt — для одноцветных линий 0,5 pt —
      толщина многоцветной линии или белой линии на составном фоне
    </p>
  </div>

  <h3 style="margin-bottom: 20px; margin-top: 40px" class="technical-requirements__subheader">
    Пример правильной разлиновки Открытки А4 (210х297мм)
  </h3>
  <div>
    <strong>Вылеты</strong>
    <i>
      — Дополнительные поля за пределами линии реза, необходимые при печати «в край». Они
      предотвращают появление белых полос после обрезки. Рекомендуемые значения: 3 мм с каждой
      стороны.
    </i>
  </div>

  <div style="margin-top: 20px">
    <strong>Безопасное поле</strong>
    <i>
      — Внутренний отступ от линии реза или сгиба, в пределах которого размещают важные элементы
      макета. Обеспечивает защиту текста и графики от «зарезания» при обрезке. Рекомендуемые
      значения: не менее 3 мм.
    </i>
  </div>

  <NuxtImg
    style="margin: 0 auto"
    height="400px"
    src="images/technical-requirements/Открытка_1.png"
  />
  <NuxtImg
    style="margin: 0 auto"
    height="350px"
    src="images/technical-requirements/Открытка_2.png"
  />

  <h3 style="margin-top: 40px" class="technical-requirements__subheader">
    Размеры макета для разных форматов листовок
  </h3>
  <p class="technical-requirements__text">
    Для упрощения подготовки макета рекомендуем использовать наши готовые шаблоны, созданные с
    учётом всех технических требований.
  </p>
  <p class="technical-requirements__text">
    Выберите и скачайте шаблон для вашего графического редактора. Перед началом работы не забудьте
    удалить вспомогательные элементы и рекомендации из файла. При необходимости вы также можете
    скачать подробную инструкцию по правильной работе с шаблонами.
  </p>
  <UiCard>
    <UiTable
      style="margin-top: 20px"
      :headers="[
        { label: 'Формат', center: true },
        { label: 'Размер готового изделия', center: true },
        { label: 'Размер макета', center: true },
        { label: 'Ссылки на шаблоны', center: true }
      ]"
      :rows="[
        [
          { value: 'Открытка А3', bold: true },
          { value: '297 x 420 мм' },
          { value: '301 x 424 мм' },
          {
            value: [
              {
                label: 'AI',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'CDR',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'PSD',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              }
            ],
            type: 'links'
          }
        ],
        [
          { value: 'Открытка А4', bold: true },
          { value: '297 x 210 мм' },
          { value: '301 x 214 мм' },
          {
            value: [
              {
                label: 'AI',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'CDR',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'PSD',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              }
            ],
            type: 'links'
          }
        ],
        [
          { value: 'Открытка А5', bold: true },
          { value: '148 x 210 мм' },
          { value: '152 x 214 мм' },
          {
            value: [
              {
                label: 'AI',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'CDR',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'PSD',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              }
            ],
            type: 'links'
          }
        ],
        [
          { value: 'Открытка А6', bold: true },
          { value: '105 x 148 мм' },
          { value: '109 x 152 мм' },
          {
            value: [
              {
                label: 'AI',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'CDR',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'PSD',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              }
            ],
            type: 'links'
          }
        ],
        [
          { value: 'Открытка Евро', bold: true },
          { value: '210 x 99 мм' },
          { value: '103 x 214 мм' },
          {
            value: [
              {
                label: 'AI',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'CDR',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'PSD',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              }
            ],
            type: 'links'
          }
        ],
        [
          { value: 'Открытка Двойное Евро', bold: true },
          { value: '210 x 99 мм' },
          { value: '103 x 214 мм' },
          {
            value: [
              {
                label: 'AI',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'CDR',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              },
              {
                label: 'PSD',
                value: 'https://www.adobe.com/ru/acrobat/acrobat_pdfp.pdf'
              }
            ],
            type: 'links'
          }
        ]
      ]"
    />
  </UiCard>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.technical-requirements {
  &__subheader {
    // Подзаголовки внутри требований
    margin-bottom: calc($normal_gap / 2);
    margin-top: calc($normal_gap);
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

  &-list {
    // Списки внутри требований
    list-style-type: disc;
    margin-left: calc($normal_gap);

    &__item {
      font-size: $font-size_normal;
      margin-bottom: calc($normal_gap / 2);
    }
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
</style>
