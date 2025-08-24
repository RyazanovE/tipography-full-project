<template>
  <h1 style="margin-bottom: 20px">Требования к подготовке макета в Adobe Illustrator</h1>
  <div class="tip">
    <p>
      Следуйте этой инструкции, чтобы ваш макет соответствовал требованиям профессиональной печати.
    </p>
  </div>

  <div class="step">
    <h2>1. Подготовка документа</h2>
    <ul>
      <li>Создайте новый файл в <strong>Adobe Illustrator</strong></li>
      <li>
        Установите параметры:
        <ul>
          <li>
            <strong>Формат:</strong> Обрезной (готовый размер макета, например 210×297 мм для А4)
          </li>
          <li><strong>Цветовой режим:</strong> <code>CMYK</code> (для печати)</li>
          <li><strong>Растеризация эффектов:</strong> <code>300 PPI</code> (High Resolution)</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="step">
    <h2>2. Работа с текстом</h2>
    <ul>
      <li>
        <strong>Перевод шрифтов в кривые:</strong>
        <ul>
          <li>
            Выделите весь текст → ПКМ → <code>Create Outlines</code> (или <code>Ctrl+Shift+O</code>)
          </li>
          <li>Убедитесь, что нет пропущенных текстовых блоков</li>
        </ul>
      </li>
      <li>
        <strong>Проверка количества узлов:</strong>
        <ul>
          <li>Используйте <code>Object → Path → Simplify</code></li>
          <li>Количество узлов не должно превышать <strong>10 000</strong></li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="step">
    <h2>3. Размещение макетов</h2>
    <ul>
      <li><strong>Один макет = одна область</strong></li>
      <li>
        Каждый макет должен быть на отдельной странице (если PDF-многостраничник) или артборде
      </li>
      <li>Не размещайте несколько макетов в одной рабочей области</li>
    </ul>
  </div>

  <div class="step">
    <h2>4. Вылеты</h2>
    <ul>
      <li>Добавьте <strong>по 3 мм с каждой стороны</strong> за обрезной формат</li>
      <li>При создании файла укажите <code>Bleed: 3 мм</code> (или расширьте фон вручную)</li>
      <li>Важные элементы не должны быть ближе <strong>5 мм</strong> к краю обрезного формата</li>
    </ul>
  </div>

  <div class="step">
    <h2>5. Растровые изображения</h2>
    <ul>
      <li><strong>Разрешение:</strong> Минимум <code>300 DPI</code> (для печати)</li>
      <li>
        <strong>Формат:</strong> <code>TIFF</code> или <code>PSD</code> (без сжатия) или встроенный
        <code>CMYK</code>-режим
      </li>
      <li>
        <strong>Прикрепление файлов:</strong>
        <ul>
          <li>Если используете ссылки (Links), приложите исходные изображения к заказу</li>
          <li>Или встройте их: <code>Window → Links → Embed Images</code></li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="step">
    <h2>6. Эффекты и прозрачность</h2>
    <ul>
      <li>
        <strong>Растрирование эффектов:</strong>
        <ul>
          <li>Выделите объекты с прозрачностью/наложением → <code>Object → Rasterize</code></li>
          <li>
            Выберите: <code>300 PPI</code>, <code>Background: White</code>,
            <code>Anti-Aliasing: Art Optimized</code>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="step">
    <h2>7. Финальная проверка</h2>
    <ul>
      <li><strong>Просмотр обрезных меток:</strong> <code>View → Show Trim Marks</code></li>
      <li>
        <strong>Проверка цветов:</strong>
        <ul>
          <li>Нет ли <code>RGB</code> или <code>Pantone</code>, если не требуется</li>
          <li>Черный текст должен быть <code>100% K</code>, без наложения цветов</li>
        </ul>
      </li>
      <li>
        <strong>Сохраните файл:</strong>
        <ul>
          <li><code>PDF/X-4</code> (с вылетами и шрифтами в кривых)</li>
          <li>Или <code>.ai</code> с совместимостью <code>CC 2023</code></li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="warning">
    <h2>Важные предупреждения</h2>
    <ul>
      <li>Используйте последнюю версию Illustrator (минимум CC 2019)</li>
      <li>Не применяйте градиентные заливки с прозрачностью без растрирования</li>
      <li>Упакуйте все файлы (макет + изображения) в ZIP-архив перед отправкой</li>
    </ul>
  </div>

  <div class="tip">
    <h2>Чек-лист перед отправкой</h2>
    <ul class="checklist">
      <li>Все шрифты переведены в кривые</li>
      <li>Вылеты 3 мм со всех сторон</li>
      <li>Нет RGB-изображений</li>
      <li>Все эффекты растрированы</li>
      <li>Количество узлов в кривых ≤ 10 000</li>
      <li>Каждый макет на отдельной странице/артборде</li>
      <li>Приложены все исходные изображения</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
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
    title: 'Adobe Illustrator',
    to: '/trebovniya-k-maketam/adobe-illustrator'
  }
])
</script>

<style lang="scss" scoped>
h1 {
  color: #2c3e50;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}
h2 {
  color: #2980b9;
  margin-top: 25px;
  border-left: 4px solid #3498db;
  padding-left: 10px;
}
.step {
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #3498db;
}
.warning {
  background-color: #fff3cd;
  padding: 10px;
  border-left: 4px solid #ffc107;
  margin: 15px 0;
}
.tip {
  background-color: #e7f5ff;
  padding: 10px;
  border-left: 4px solid #4dabf7;
  margin: 15px 0;
}
code {
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}
.checklist {
  list-style-type: none;
  padding-left: 0;
}
.checklist li:before {
  content: '✓ ';
  color: #2ecc71;
  font-weight: bold;
}
</style>
