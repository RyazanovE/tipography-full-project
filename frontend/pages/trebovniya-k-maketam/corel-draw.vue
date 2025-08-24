<template>
  <h1 style="margin-bottom: 20px">Требования к подготовке макета в Corel Draw</h1>
  <div class="tip">
    <p>
      Следуйте этой инструкции, чтобы ваш макет соответствовал требованиям профессиональной печати.
    </p>
  </div>

  <div class="step">
    <h2>1. Подготовка документа</h2>
    <ul>
      <li>Создайте новый файл в <strong>Corel Draw</strong> (рекомендуется версия X7 и новее)</li>
      <li>
        Установите параметры:
        <ul>
          <li><strong>Формат:</strong> Размер готового изделия (например 210×297 мм для А4)</li>
          <li><strong>Цветовой режим:</strong> <code>CMYK</code> (для печати)</li>
          <li><strong>Разрешение:</strong> <code>300 DPI</code> (High Resolution)</li>
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
          <li>Выделите весь текст → <code>Ctrl+Q</code> (Convert to Curves)</li>
          <li>Проверьте все страницы на наличие неконвертированного текста</li>
        </ul>
      </li>
      <li>
        <strong>Проверка количества узлов:</strong>
        <ul>
          <li>Используйте инструмент <code>Shape Tool</code> (F10) для просмотра узлов</li>
          <li>Оптимизируйте сложные кривые через <code>Reduce Nodes</code></li>
          <li>Количество узлов не должно превышать <strong>10 000</strong></li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="step">
    <h2>3. Размещение макетов</h2>
    <ul>
      <li><strong>Один макет = одна страница</strong> (используйте многостраничный документ)</li>
      <li>Не размещайте несколько макетов на одном рабочем листе</li>
      <li>Для каждого изделия создавайте отдельную страницу в документе</li>
    </ul>
  </div>

  <div class="step">
    <h2>4. Вылеты</h2>
    <ul>
      <li>Добавьте <strong>по 3 мм с каждой стороны</strong> за обрезной формат</li>
      <li>Расширьте фоновые элементы за пределы обрезного формата</li>
      <li>Важные элементы не должны быть ближе <strong>5 мм</strong> к краю обрезного формата</li>
      <li>При экспорте в PDF включите опцию <code>Include bleed area</code></li>
    </ul>
  </div>

  <div class="step">
    <h2>5. Растровые изображения</h2>
    <ul>
      <li><strong>Разрешение:</strong> Минимум <code>300 DPI</code> в масштабе 100%</li>
      <li>
        <strong>Формат:</strong> <code>TIFF</code> (без альфа-каналов) или <code>JPG</code> (максимальное качество)
      </li>
      <li>
        <strong>Внедрение изображений:</strong>
        <ul>
          <li>Используйте <code>Bitmaps → Embed Bitmaps</code></li>
          <li>Или приложите исходные файлы изображений отдельно</li>
        </ul>
      </li>
      <li>Избегайте вставки PSD-файлов с прозрачностью</li>
    </ul>
  </div>

  <div class="step">
    <h2>6. Эффекты и прозрачность</h2>
    <ul>
      <li>
        <strong>Растрирование эффектов:</strong>
        <ul>
          <li>Выделите объекты с прозрачностью/тенями → <code>Bitmaps → Convert to Bitmap</code></li>
          <li>
            Установите: <code>300 DPI</code>, <code>CMYK</code>, <code>Transparent Background</code>
          </li>
        </ul>
      </li>
      <li><strong>Толщина линий:</strong> Не менее <code>0.13 мм</code> (избегайте Hairline)</li>
      <li>Все текстуры и градиенты с прозрачностью должны быть растрированы</li>
    </ul>
  </div>

  <div class="step">
    <h2>7. Финальная проверка</h2>
    <ul>
      <li><strong>Проверка цветов:</strong> Нет ли <code>RGB</code> или <code>Pantone</code> (если не требуется)</li>
      <li>Черный текст должен быть <code>100% K</code>, без наложения цветов</li>
      <li>
        <strong>Экспорт в PDF:</strong>
        <ul>
          <li>Используйте <code>PDF/X-4</code></li>
          <li>Включите опции: <code>Embed fonts</code>, <code>Bleed 3mm</code></li>
          <li>Или сохраните исходный файл <code>.cdr</code> с совместимостью X7</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="warning">
    <h2>Важные предупреждения</h2>
    <ul>
      <li>Используйте последнюю версию Corel Draw (минимум X7)</li>
      <li>Не применяйте эффекты прозрачности без последующего растрирования</li>
      <li>Проверьте все страницы документа перед отправкой</li>
      <li>Упакуйте все файлы (макет + изображения) в ZIP-архив</li>
    </ul>
  </div>

  <div class="tip">
    <h2>Чек-лист перед отправкой</h2>
    <ul class="checklist">
      <li>Все шрифты переведены в кривые (Ctrl+Q)</li>
      <li>Вылеты 3 мм со всех сторон</li>
      <li>Нет RGB-элементов</li>
      <li>Все эффекты прозрачности растрированы</li>
      <li>Толщина линий ≥ 0.13 мм</li>
      <li>Количество узлов в кривых ≤ 10 000</li>
      <li>Каждый макет на отдельной странице</li>
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
    title: 'Corel Draw',
    to: '/trebovniya-k-maketam/corel-draw'
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