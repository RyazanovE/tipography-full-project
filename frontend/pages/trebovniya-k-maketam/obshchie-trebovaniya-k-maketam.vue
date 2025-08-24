<template>
  <div class="print-guide">
    <h1>Общие требования к подготовке макетов</h1>

    <div class="intro-block">
      <p>
        <strong>Базовые параметры</strong> — компактные печатные карточки с контактной информацией,
        используемые для личного и делового общения. Визитки — это не просто носитель контактов, а
        важный элемент имиджа. Они помогают произвести первое впечатление, подчеркнуть стиль и
        профессионализм.
      </p>
    </div>

    <div class="definition-grid">
      <div class="definition-card">
        <h3>Линия реза</h3>
        <p>
          Граница, по которой будет производиться окончательная обрезка изделия после печати. Все
          важные элементы должны располагаться на безопасном расстоянии.
        </p>
      </div>

      <div class="definition-card">
        <h3>Безопасная зона</h3>
        <p>
          Область внутри макета, ограниченная <strong>влетами</strong>, где размещаются все важные
          элементы (тексты, логотипы).
        </p>
      </div>

      <div class="definition-card">
        <h3>Полный размер макета</h3>
        <p>
          Итоговый размер с учётом <strong>вылетов</strong>, необходимых для обрезки. Превышает
          готовый размер изделия.
        </p>
      </div>

      <div class="definition-card">
        <h3>Вылеты (внешние отступы)</h3>
        <p>Дополнительные поля за пределами линии реза для печати «в край».</p>
        <div class="recommendation">
          <strong>Рекомендуемые значения:</strong> 3 мм (листовая), 5 мм (многополосная)
        </div>
      </div>

      <div class="definition-card">
        <h3>Влеты (внутренние отступы)</h3>
        <p>Отступы от линии реза внутрь макета, определяющие безопасную зону.</p>
        <div class="recommendation">
          <strong>Рекомендуемые значения:</strong> 3 мм (листовая), 5 мм (многополосная)
        </div>
      </div>
    </div>

    <div class="notice">
      <h3>Важно!</h3>
      <p>
        Специалисты проверяют макеты, но не гарантируют выявление всех ошибок.
        <a href="#" class="manager-link">Уточните у менеджера</a> возможность доработки.
      </p>
    </div>

    <TechnicalRequirementsFormats />

    <div class="section">
      <h2>Основные параметры макета</h2>
      <ul class="checklist">
        <li>Масштаб макета: 1 : 1</li>
        <li>Разрешение растровых элементов: 300–600 dpi</li>
        <li>Все текстовые объекты переведены в кривые</li>
        <li>Минимальный размер шрифта: 6 pt (для декоративных — от 7 pt)</li>
        <li>Избегайте составного чёрного цвета для текста</li>
      </ul>
    </div>

    <div class="section">
      <h2>Цветовая модель и профиль</h2>
      <p class="warning-text">Только CMYK (RGB недопустим)</p>
      <ul class="checklist">
        <li>Заливки менее 3% не печатаются, менее 5% — печать не гарантируется</li>
        <li>Самый светлый передаваемый серый — 12%</li>
        <li>Для чёрных заливок: C20 M20 Y20 K100</li>
      </ul>
    </div>

    <div class="section">
      <h2>Мелкие объекты и линии</h2>
      <ul class="checklist">
        <li>Минимальная толщина одноцветных линий — 0,2 pt</li>
        <li>Минимальная толщина многоцветных линий — 0,5 pt</li>
        <li>Не размещайте мелкие белые элементы на составном фоне</li>
      </ul>
    </div>

    <div class="section">
      <h2>Общие замечания</h2>
      <ul class="checklist">
        <li>Файлы MS Office требуют доработки (платно)</li>
        <li>Не отображайте вспомогательные элементы в макете</li>
        <li>Каждое изделие — отдельный файл</li>
        <li>Цветопроба обязательна для точной цветопередачи</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LazyTechnicalRequirementsFormats } from '#components'

useInitiateBreadcrumbs([
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Требования к макетам',
    to: '/trebovniya-k-maketam'
  },
  {
    title: 'Общие требования к макетам',
    to: '/trebovniya-k-maketam/obshchie-trebovaniya-k-maketam'
  }
])
</script>

<style lang="scss" scoped>
.intro-block {
  background: #e7f5ff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 30px;
  border-left: 4px solid #4dabf7;
}

.print-guide {
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

  h2 {
    color: #2980b9;
    margin-top: 35px;
    border-left: 4px solid #3498db;
    padding-left: 10px;
  }

  h3 {
    color: #2c3e50;
    margin-top: 0;
  }

  .definition-block {
    background-color: #e7f5ff;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 25px;
    border-left: 4px solid #4dabf7;
  }

  .definition-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .definition-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    border-left: 3px solid #3498db;

    .recommendation {
      background: #fff3cd;
      padding: 8px;
      border-radius: 4px;
      margin-top: 10px;
      font-size: 0.9em;
    }
  }

  .notice {
    background: #fff3cd;
    padding: 15px;
    border-radius: 5px;
    margin: 25px 0;
    border-left: 4px solid #ffc107;

    .manager-link {
      color: #d35400;
      font-weight: bold;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .section {
    margin-bottom: 30px;
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

  .warning-text {
    color: #c0392b;
    font-weight: bold;
    background: #fdecea;
    padding: 10px;
    border-radius: 4px;
    display: inline-block;
  }
}

@media (max-width: 768px) {
  .definition-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
