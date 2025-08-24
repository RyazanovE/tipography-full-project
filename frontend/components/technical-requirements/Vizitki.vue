<template>
  <div class="business-card-guide">
    <div class="intro-block">
      <p>
        <strong>Визитки</strong> — компактные печатные карточки с контактной информацией,
        используемые для личного и делового общения. Визитки — это не просто носитель контактов, а
        важный элемент имиджа. Они помогают произвести первое впечатление, подчеркнуть стиль и
        профессионализм.
      </p>
    </div>

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
        <li class="requirement-item">Все прозрачности, тени и текстуры должны быть растрированы</li>
        <li class="requirement-item">
          Каждый макет должен содержать только одно изделие (одна страница = один продукт)
        </li>
        <li class="requirement-item">
          Рабочие метки и служебная информация не должны попадать в область печати и вылетов
        </li>
      </ul>

      <div class="warning-block">
        <strong>Важно:</strong> Все текстовые объекты необходимо перевести в кривые, минимальный
        размер шрифта 6 pt.
      </div>
    </div>

    <TechnicalRequirementsFormats />
    <div class="section">
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

    <div class="section">
      <h2>Размер и вылеты</h2>
      <div class="size-example">
        <div class="size-card">
          <h4>Стандартная визитка</h4>
          <div class="size-values">
            <div>Готовый размер: <strong>90×50 мм</strong></div>
            <div>Макет с вылетами: <strong>96×56 мм</strong></div>
          </div>
        </div>
        <div class="formula">
          <div>Размер макета = размер визитки + 6 мм</div>
          <div>(по 3 мм с каждой стороны)</div>
        </div>
      </div>
    </div>

    <div class="requirements-block">
      <h2 class="section-title">Линии и мелкие объекты</h2>
      <div class="note-box">
        <p>
          Мелкие объекты и тонкие линии выглядят лучше, если они окрашены только одной из четырех
          составляющих CMYK. Составной цвет может приводить к появлению цветных ореолов вокруг
          покрашенных им объектов.
        </p>
        <p>
          Не рекомендуется делать мелкие белые объекты, мелкий белый текст и тонкие белые линии на
          фоне, состоящем из нескольких красок, т.к. они могут не пропечататься или пропечататься
          частично
        </p>
        <div class="specs-grid">
          <div class="spec-item">
            <div class="spec-value">0,2 pt</div>
            <div class="spec-label">для одноцветных линий</div>
          </div>
          <div class="spec-item">
            <div class="spec-value">0,5 pt</div>
            <div class="spec-label">для многоцветных линий</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="centered">Пример правильной разлиновки визитки (90×50 мм)</h2>
      <div class="definition-cards">
        <div class="definition-card">
          <h3>Вылеты</h3>
          <p>
            Дополнительные поля за пределами линии реза, необходимые при печати «в край». Они
            предотвращают появление белых полос после обрезки.
          </p>
          <div class="recommendation">Рекомендуемые значения: 3 мм с каждой стороны</div>
        </div>

        <div class="definition-card">
          <h3>Влеты</h3>
          <p>
            Внутренний отступ от линии реза или сгиба, в пределах которого размещают важные элементы
            макета. Обеспечивает защиту текста и графики от «зарезания» при обрезке.
          </p>
          <div class="recommendation">Рекомендуемые значения: не менее 3 мм</div>
        </div>
      </div>

      <div class="image-container">
        <NuxtImg
          src="images/technical-requirements/vizitki.png"
          alt="Схема визитки"
          class="business-card-image"
        />
      </div>
    </div>

    <div class="section">
      <h2 class="centered">Размеры макетов для разных форматов</h2>
      <p class="text-center">Используйте наши готовые шаблоны с учётом всех требований:</p>

      <div class="template-table">
        <UiTable
          :headers="[
            { label: 'Формат', center: true },
            { label: 'Готовый размер', center: true },
            { label: 'Размер макета', center: true },
            { label: 'Шаблоны', center: true }
          ]"
          :rows="[
            [
              { value: 'Стандарт 90×50', bold: true },
              { value: '90×50 мм' },
              { value: '96×56 мм' },
              {
                value: [
                  { label: 'AI', value: '#' },
                  { label: 'CDR', value: '#' },
                  { label: 'PSD', value: '#' }
                ],
                type: 'links'
              }
            ],
            [
              { value: 'Европейский 80×55', bold: true },
              { value: '80×55 мм' },
              { value: '86×61 мм' },
              {
                value: [
                  { label: 'AI', value: '#' },
                  { label: 'CDR', value: '#' },
                  { label: 'PSD', value: '#' }
                ],
                type: 'links'
              }
            ],
            [
              { value: 'Высокий 90×55', bold: true },
              { value: '90×55 мм' },
              { value: '96×61 мм' },
              {
                value: [
                  { label: 'AI', value: '#' },
                  { label: 'CDR', value: '#' },
                  { label: 'PSD', value: '#' }
                ],
                type: 'links'
              }
            ],
            [
              { value: 'Квадратный 50×50', bold: true },
              { value: '50×50 мм' },
              { value: '56×56 мм' },
              {
                value: [
                  { label: 'AI', value: '#' },
                  { label: 'CDR', value: '#' },
                  { label: 'PSD', value: '#' }
                ],
                type: 'links'
              }
            ]
          ]"
        />
      </div>

      <div class="notice">
        <h3>Перед отправкой макета:</h3>
        <ul class="checklist">
          <li>Удалите вспомогательные элементы из шаблона</li>
          <li>Проверьте соответствие всем техническим требованиям</li>
          <li>Приложите все используемые шрифты и изображения</li>
        </ul>
      </div>

      <div
        class="action-button"
        style="margin-top: 20px; display: flex; align-items: center; justify-content: center"
      >
        <ButtonSolid>
          <NuxtLink to="/vse-uslugi/vizitki">Заказать визитку</NuxtLink>
        </ButtonSolid>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TechnicalRequirementsFormats } from '#components'

// Логика компонента (если требуется)
</script>

<style lang="scss" scoped>
.flyer-requirements {
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

.main-title {
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

.content-section {
  margin-bottom: 40px;
}

.section-title {
  color: #2980b9;
  margin: 30px 0 20px;
  padding-left: 10px;
  border-left: 4px solid #3498db;

  &.centered {
    text-align: center;
    border-left: none;
    padding-left: 0;
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

.important-note {
  background: #e7f5ff;
  padding: 15px;
  border-radius: 5px;
  border-left: 4px solid #4dabf7;
  margin-bottom: 20px;
}

.size-example {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.example-card {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-top: 10px;
  border-left: 3px solid #3498db;
  font-weight: bold;
}

.note-box {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.spec-item {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.spec-value {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

.spec-label {
  color: #7f8c8d;
  font-size: 14px;
}

.visual-guide {
  margin: 50px 0;
}

.definition-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.definition-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  border-left: 3px solid #3498db;
}

.recommendation {
  background: #fff3cd;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
  font-size: 14px;
}

.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0;
}

.guide-image {
  border-radius: 5px;
  align-self: center;
}

.templates-section {
  margin-top: 50px;
}

.template-table {
  margin: 30px 0;
  overflow-x: auto;
}

.centered {
  text-align: center;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 20px;
  }

  .definition-cards {
    grid-template-columns: 1fr;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }
}
.business-card-guide {
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;

  h1 {
    color: #2c3e50;
    text-align: center;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }

  .intro-block {
    background: #e7f5ff;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 30px;
    border-left: 4px solid #4dabf7;
  }

  .section {
    margin-bottom: 40px;

    h2 {
      color: #2980b9;
      border-left: 4px solid #3498db;
      padding-left: 10px;
      margin-bottom: 20px;

      &.centered {
        text-align: center;
        border-left: none;
        padding-left: 0;
        border-bottom: 2px solid #3498db;
        padding-bottom: 10px;
      }
    }
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

  .nested-list {
    list-style-type: disc;
    padding-left: 20px;
    margin-top: 5px;

    li::before {
      content: none;
    }
  }

  .warning-block {
    background: #fff3cd;
    padding: 15px;
    border-radius: 5px;
    margin: 15px 0;
    border-left: 4px solid #ffc107;
    font-weight: bold;
  }

  .size-example {
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 20px 0;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .size-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    min-width: 250px;
    border-left: 3px solid #3498db;

    h4 {
      margin-top: 0;
      color: #2c3e50;
    }
  }

  .formula {
    background: #e8f8f5;
    padding: 15px;
    border-radius: 5px;
    font-weight: bold;
  }

  .definition-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .definition-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    border-left: 3px solid #3498db;
  }

  .image-container {
    text-align: center;
    margin: 30px 0;
  }

  .business-card-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }

  .template-table {
    margin: 30px 0;
    overflow-x: auto;
  }

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

  .text-center {
    text-align: center;
  }
}
</style>
