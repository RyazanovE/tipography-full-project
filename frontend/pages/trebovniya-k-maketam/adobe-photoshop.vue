<template>
  <h1 style="margin-bottom: 20px">Требования к подготовке макета в Adobe Photoshop</h1>
  <div class="tip">
    <p>
      Следуйте этой инструкции, чтобы ваш макет соответствовал требованиям профессиональной печати.
    </p>
  </div>

  <div class="step">
    <h2>1. Подготовка документа</h2>
    <ul>
      <li>Создайте новый файл в <strong>Adobe Photoshop</strong> (рекомендуется версия CC 2019 и новее)</li>
      <li>
        Установите параметры:
        <ul>
          <li><strong>Размер:</strong> Финальный размер изделия + вылеты по 3 мм с каждой стороны</li>
          <li><strong>Разрешение:</strong> <code>300 PPI</code> (для качественной печати)</li>
          <li><strong>Цветовой режим:</strong> <code>CMYK</code> (8 Bits/Channel)</li>
          <li><strong>Фон:</strong> По необходимости (прозрачный/белый)</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="step">
    <h2>2. Работа с текстом и слоями</h2>
    <ul>
      <li>
        <strong>Объединение слоев:</strong>
        <ul>
          <li>Перед сохранением выполните <code>Layer → Flatten Image</code></li>
          <li>Или сохраните копию с объединенными слоями</li>
        </ul>
      </li>
      <li>
        <strong>Текстовые слои:</strong>
        <ul>
          <li>Растрируйте все текстовые слои (<code>Layer → Rasterize → Type</code>)</li>
          <li>Или используйте готовые графические элементы вместо текста</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="step">
    <h2>3. Вылеты и безопасная зона</h2>
    <ul>
      <li>Основное содержание должно находиться в пределах обрезного формата</li>
      <li>Фоновые элементы должны выходить за обрез на <strong>3 мм</strong> с каждой стороны</li>
      <li>Важные элементы (текст, логотипы) не должны приближаться к краю ближе чем на <strong>5 мм</strong></li>
      <li>Используйте направляющие для обозначения границ обрезки</li>
    </ul>
  </div>

  <div class="step">
    <h2>4. Цвета и профили</h2>
    <ul>
      <li><strong>Цветовой режим:</strong> Только <code>CMYK</code> (<code>Image → Mode → CMYK Color</code>)</li>
      <li><strong>Профиль:</strong> Рекомендуется <code>ISO Coated v2</code> или по согласованию с типографией</li>
      <li><strong>Черный цвет:</strong> Для текста используйте <code>100% K</code>, для плашек - составной черный</li>
      <li>Проверьте цветопередачу через <code>View → Gamut Warning</code></li>
    </ul>
  </div>

  <div class="step">
    <h2>5. Сохранение файла</h2>
    <ul>
      <li>
        <strong>Рекомендуемые форматы:</strong>
        <ul>
          <li><code>TIFF</code> (без сжатия, без слоев)</li>
          <li><code>PSD</code> (только если требуется дальнейшее редактирование)</li>
          <li><code>PDF</code> (с сохранением качества печати)</li>
        </ul>
      </li>
      <li>
        <strong>Настройки PDF:</strong>
        <ul>
          <li>Выберите стандарт <code>PDF/X-4:2010</code></li>
          <li>Включите опцию <code>Preserve Photoshop Editing Capabilities</code></li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="warning">
    <h2>Важные предупреждения</h2>
    <ul>
      <li>Не используйте RGB-режим для печатных макетов</li>
      <li>Избегайте применения эффектов прозрачности без последующего объединения слоев</li>
      <li>Проверьте разрешение изображения (<code>Image → Image Size</code>) перед отправкой</li>
      <li>Упакуйте все файлы (исходник + экспорт) в ZIP-архив</li>
    </ul>
  </div>

  <div class="tip">
    <h2>Чек-лист перед отправкой</h2>
    <ul class="checklist">
      <li>Разрешение 300 PPI в масштабе 1:1</li>
      <li>Цветовой режим CMYK</li>
      <li>Все слои объединены (Flatten Image)</li>
      <li>Вылеты по 3 мм со всех сторон</li>
      <li>Нет RGB-элементов</li>
      <li>Текст растрирован или преобразован в кривые</li>
      <li>Важные элементы в безопасной зоне (5 мм от края)</li>
      <li>Файл сохранен в подходящем формате (TIFF/PDF)</li>
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
    to: '/trebovaniya-k-maketam'
  },
  {
    title: 'Adobe Photoshop',
    to: '/trebovaniya-k-maketam/adobe-photoshop'
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