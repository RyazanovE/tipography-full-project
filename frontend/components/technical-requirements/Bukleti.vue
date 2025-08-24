<template>
  <div class="booklet-guide">
    <h1>Требования к макетам буклетов и лифлетов</h1>

    <div class="intro-block">
      <p>
        <strong>Буклет</strong> — это печатное изделие, выполненное на одном или нескольких листах,
        сложенных (сфальцованных) в два и более сгиба, с подробной информацией о компании, услугах
        или мероприятиях. Буклеты позволяют наглядно и структурировано представить большой объём
        данных: фотографии, схемы, таблицы и текст.
      </p>
    </div>

    <div class="intro-block">
      <p>
        <strong>Лифлет</strong> — односторонний или двусторонний лист небольшого формата, часто с
        одним сгибом или без него, содержащий краткую и ёмкую рекламную информацию. Лифлеты удобны
        для быстрой передачи ключевых сведений: акции, новые предложения, анонсы мероприятий.
      </p>
    </div>

    <div class="requirements-section">
      <div class="requirements-block">
        <h2 class="section-title">Основные параметры макета</h2>
        <ul class="requirements-list">
          <li class="requirement-item">Масштаб макета: 1 : 1</li>
          <li class="requirement-item">Разрешение растровых элементов: 300–600 dpi</li>
          <li class="requirement-item">Размер готового файла: не более 100 МБ</li>
          <li class="requirement-item">
            Макет может содержать как растровые, так и векторные элементы
          </li>
          <li class="requirement-item">Все текстовые объекты необходимо перевести в кривые</li>
          <li class="requirement-item">Минимально допустимый размер шрифта: 6 pt</li>
          <li class="requirement-item">
            Для декоративных и шрифтов с засечками — рекомендуемый размер от 7 pt
          </li>
          <li class="requirement-item">
            Избегайте использования составного чёрного цвета для текста и тонких линий
          </li>
          <li class="requirement-item">
            Все прозрачности, тени и текстуры должны быть растрированы
          </li>
          <li class="requirement-item">
            Каждый макет должен содержать только одно изделие (одна страница = один продукт)
          </li>
          <li class="requirement-item">
            Рабочие метки и служебная информация не должны попадать в область печати и вылетов
          </li>
        </ul>
      </div>

      <div class="warning-block">
        <strong>Важно:</strong> Все текстовые объекты необходимо перевести в кривые, минимальный
        размер шрифта 6 pt.
      </div>

      <TechnicalRequirementsFormats />
    </div>

    <div class="problems-section">
      <h2>Цветовая модель и профиль</h2>
      <div class="warning-block">
        <strong>Только CMYK!</strong> RGB приведет к искажению цветов.
      </div>
      <ul class="requirements-list">
        <li class="requirement-item">Заливки менее 3% не печатаются</li>
        <li class="requirement-item">Самый светлый серый — 12%</li>
        <li class="requirement-item">Для чёрного используйте: C20 M20 Y20 K100</li>
        <li class="requirement-item">
          Максимальная плотность: 230% (немелованная), 270% (мелованная)
        </li>
      </ul>
    </div>

    <div class="problems-section">
      <h2>Возможные проблемы при составлении макета</h2>
      <ul class="problems-list">
        <li>Деление листа A4 на три равные части по 99 мм — приводит к смещению при фальцовке</li>
        <li>Игнорирование разницы в ширине створок — вызывает перекосы</li>
        <li>Особенно заметны ошибки при оформлении полос в разной цветовой гамме</li>
      </ul>

      <div class="solution-box">
        <h4>Правильная схема разметки:</h4>
        <div class="solution-grid">
          <div class="solution-item">
            <div class="solution-value">97-100-100 мм</div>
            <div class="solution-label">Внешняя сторона</div>
          </div>
          <div class="solution-item">
            <div class="solution-value">100-100-97 мм</div>
            <div class="solution-label">Внутренняя сторона</div>
          </div>
        </div>
      </div>
    </div>

    <div class="visual-guide-section">
      <h2 class="centered">Пример правильной разлиновки Буклета А4 (297×210 мм)</h2>
      <p class="text-center">
        <strong>Стандартный буклет-лифлет формата A4</strong> — это изделие на 6 страниц
      </p>
      <div class="definition-cards">
        <div class="definition-card">
          <h3>Вылеты</h3>
          <p>
            Дополнительные поля за пределами линии реза, необходимые при печати «в край». Они
            предотвращают появление белых полос после обрезки.
          </p>
          <div class="recommendation">Рекомендуемые значения: 5 мм с каждой стороны</div>
        </div>

        <div class="definition-card">
          <h3>Влеты</h3>
          <p>
            Внутренний отступ от линии реза или сгиба, в пределах которого размещают важные элементы
            макета. Обеспечивает защиту текста и графики от «зарезания» при обрезке.
          </p>
          <div class="recommendation">Рекомендуемые значения: не менее 5 мм</div>
        </div>
      </div>

      <div class="image-gallery">
        <NuxtImg
          src="images/technical-requirements/bukleti1.png"
          alt="Схема буклета"
          class="booklet-image"
        />
        <NuxtImg
          src="images/technical-requirements/bukleti2.png"
          alt="Разметка буклета"
          class="booklet-image"
        />
      </div>
    </div>

    <div class="folding-section">
      <h2 class="centered">Варианты фальцовки</h2>
      <NuxtImg
        src="images/technical-requirements/bukleti3.png"
        alt="Типы фальцовки"
        class="folding-image"
      />

      <div class="definition-cards">
        <div class="definition-card">
          <h3>Фальцовка «Книжка»</h3>
          <p>
            Лист сгибается пополам, как страница книги. Простой и удобный вариант для презентаций,
            меню.
          </p>
        </div>
        <div class="definition-card">
          <h3>Фальцовка «Евро»</h3>
          <p>Популярный формат для рекламных буклетов. Компактный, удобен для раздачи.</p>
        </div>
        <div class="definition-card">
          <h3>Фальцовка «Гармошка»</h3>
          <p>
            Лист складывается зигзагообразно. Отличный вариант для материалов с чётким разделением
            информации.
          </p>
        </div>
      </div>
    </div>

    <div class="templates-section">
      <h2>Размеры макета для разных форматов листовок</h2>
      <p>Для упрощения подготовки макета рекомендуем использовать наши готовые шаблоны:</p>

      <UiCard>
        <UiTable
          :headers="[
            { label: 'Формат', center: true },
            { label: 'Размер готового изделия', center: true },
            { label: 'Размер макета', center: true },
            { label: 'Шаблоны', center: true }
          ]"
          :rows="tableRows"
        />
      </UiCard>

      <div class="notice">
        <h3>Перед отправкой макета:</h3>
        <ul class="checklist">
          <li>Удалите вспомогательные элементы из шаблона</li>
          <li>Проверьте соответствие всем техническим требованиям</li>
          <li>Приложите все используемые шрифты и изображения</li>
        </ul>
      </div>

      <div class="action-button">
        <ButtonSolid>
          <NuxtLink to="/pechat-bukletov">Заказать буклет</NuxtLink>
        </ButtonSolid>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'

const tableRows = [
  [
    { value: 'А3', bold: true },
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
    { value: 'А4', bold: true },
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
    { value: 'А5', bold: true },
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
  ]
]
</script>

<style lang="scss" scoped>
.notice {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  border-left: 4px solid #3498db;

  h3 {
    margin-top: 0;
  }
}

.definition-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.checklist {
  list-style-type: none;
  padding-left: 0;

  li {
    padding: 8px 0;
    padding-left: 25px;
    position: relative;

    &::before {
      content: '✓';
      color: #2ecc71;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
}

.booklet-guide {
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;

  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #3498db;
  }

  .intro-block {
    background: #e7f5ff;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 30px;
    border-left: 4px solid #4dabf7;
  }

  .definition-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
    border-left: 3px solid #3498db;

    h3 {
      margin-top: 0;
      color: #2980b9;
    }
  }

  .requirements-section,
  .problems-section,
  .visual-guide-section,
  .folding-section,
  .templates-section {
    margin-bottom: 40px;
  }

  h2 {
    color: #2980b9;
    margin-bottom: 20px;

    &.centered {
      text-align: center;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
    }
  }

  .requirements-block {
    margin-bottom: 30px;
  }

  .requirements-list {
    list-style-type: none;
    padding-left: 0;
  }

  .requirement-item {
    padding: 8px 0;
    padding-left: 25px;
    position: relative;

    &::before {
      content: '•';
      color: #3498db;
      font-weight: bold;
      position: absolute;
      left: 10px;
      font-size: 20px;
    }
  }

  .warning-block {
    background: #fff3cd;
    padding: 15px;
    border-radius: 5px;
    margin: 20px 0;
    border-left: 4px solid #ffc107;
  }

  .problems-list {
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 20px;
  }

  .solution-box {
    background: #e7f5ff;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px;
  }

  .solution-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }

  .solution-item {
    text-align: center;
    padding: 15px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .solution-value {
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
  }

  .solution-label {
    color: #7f8c8d;
    font-size: 14px;
  }

  .image-gallery {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 30px 0;
  }

  .booklet-image,
  .folding-image {
    border-radius: 5px;
    width: 100%;
    height: auto;
    max-width: 800px;
    margin: 0 auto;
    display: block;
  }

  .folding-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .folding-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
    border-top: 3px solid #3498db;
  }

  .action-button {
    text-align: center;
    margin-top: 30px;
  }

  @media (max-width: 768px) {
    .requirements-list {
      grid-template-columns: 1fr;
    }

    .folding-types {
      grid-template-columns: 1fr;
    }
  }
}
</style>
