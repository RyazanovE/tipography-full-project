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
    title: 'Частые ошибки при подготовке макетов',
    to: '/trebovniya-k-maketam/chastye-oshibki-pri-podgotovke-maketov'
  }
])
</script>

<template>
  <div class="errors-guide">
    <h1>Частые ошибки при подготовке макетов</h1>

    <div class="breadcrumbs">
      <router-link 
        v-for="(item, index) in $route.meta.breadcrumbs" 
        :key="index"
        :to="item.to"
        class="breadcrumb-link"
      >
        {{ item.title }}
        <span v-if="index < $route.meta.breadcrumbs.length - 1"> / </span>
      </router-link>
    </div>

    <div class="error-section">
      <h2>Ошибки при разлиновке файлов макета</h2>
      <ul class="error-list">
        <li class="error-item">
          <div class="error-content">
            <span class="error-icon">✖</span>
            <div>
              <strong>Неправильно:</strong> Устанавливать итоговый размер макета вручную с помощью направляющих.
              <div class="correct-way">
                <span class="correct-icon">✓</span>
                Размер должен задаваться строго через параметры страницы в программе верстки.
              </div>
            </div>
          </div>
        </li>

        <li class="error-item">
          <div class="error-content">
            <span class="error-icon">✖</span>
            <div>
              <strong>Неправильно:</strong> Размещать лицевую и оборотную стороны в одном файле.
              <div class="correct-way">
                <span class="correct-icon">✓</span>
                Каждый элемент сохраняйте отдельно: «открытка_1.pdf», «открытка_2.pdf».
              </div>
            </div>
          </div>
        </li>

        <li class="error-item">
          <div class="error-content">
            <span class="error-icon">✖</span>
            <div>
              <strong>Неправильно:</strong> Игнорировать вылеты и влеты.
              <div class="error-details">
                <div class="definition-card">
                  <h4>Вылеты (внешние отступы)</h4>
                  <p>Дополнительные поля за пределами линии реза</p>
                  <div class="recommendation">
                    <strong>Рекомендуемые значения:</strong> 3 мм (листовая), 5 мм (многополосная)
                  </div>
                </div>
                <div class="definition-card">
                  <h4>Влеты (внутренние отступы)</h4>
                  <p>Отступы от линии реза внутрь макета</p>
                  <div class="recommendation">
                    <strong>Рекомендуемые значения:</strong> 3 мм (листовая), 5 мм (многополосная)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="error-section">
      <h2>Ошибки при выборе цветовой модели и разрешения</h2>
      <ul class="error-list">
        <li class="error-item">
          <div class="error-content">
            <span class="error-icon">✖</span>
            <div>
              <strong>Неправильно:</strong> Использовать цветовую модель RGB.
              <div class="correct-way">
                <span class="correct-icon">✓</span>
                Все элементы должны быть в <strong>CMYK</strong> (цвета могут измениться при переводе!)
              </div>
            </div>
          </div>
        </li>

        <li class="error-item">
          <div class="error-content">
            <span class="error-icon">✖</span>
            <div>
              <strong>Неправильно:</strong> Низкое разрешение изображений.
              <div class="correct-way">
                <span class="correct-icon">✓</span>
                Требуется не ниже <strong>220-300 dpi</strong> в масштабе 1:1.
              </div>
              <div class="warning-note">
                Иначе изображение будет размытым при печати!
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="error-section">
      <h2>Ошибки при использовании изображений</h2>
      <ul class="error-list">
        <li class="error-item">
          <div class="error-content">
            <span class="error-icon">✖</span>
            <div>
              <strong>Нежелательно:</strong> Использовать JPEG (потеря качества, артефакты).
              <div class="correct-way">
                <span class="correct-icon">✓</span>
                Рекомендуемые форматы: <strong>TIFF без компрессии</strong> или <strong>TIFF с LZW/ZIP</strong>.
              </div>
            </div>
          </div>
        </li>

        <li class="error-item">
          <div class="error-content">
            <span class="error-icon">✖</span>
            <div>
              <strong>Неправильно:</strong> Не прикладывать исходные изображения.
              <div class="correct-way">
                <span class="correct-icon">✓</span>
                Все вставленные изображения должны быть в архиве с макетом.
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.errors-guide {
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

  .breadcrumbs {
    margin-bottom: 30px;
    font-size: 0.9em;
    color: #7f8c8d;

    .breadcrumb-link {
      color: #3498db;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      &:last-child {
        color: #2c3e50;
        font-weight: bold;
      }
    }
  }

  .error-section {
    margin-bottom: 40px;

    h2 {
      color: #2980b9;
      border-left: 4px solid #3498db;
      padding-left: 10px;
      margin-bottom: 20px;
    }
  }

  .error-list {
    list-style-type: none;
    padding-left: 0;
  }

  .error-item {
    background: #fff;
    border-left: 4px solid #e74c3c;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 0 4px 4px 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .error-content {
    display: flex;
    gap: 10px;
  }

  .error-icon {
    color: #e74c3c;
    font-weight: bold;
    font-size: 1.2em;
    flex-shrink: 0;
  }

  .correct-way {
    background: #e8f8f5;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .correct-icon {
    color: #2ecc71;
    font-weight: bold;
  }

  .error-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }

  .definition-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    border-left: 3px solid #3498db;
  }

  .recommendation {
    background: #fff3cd;
    padding: 8px;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 0.9em;
  }

  .warning-note {
    color: #c0392b;
    background: #fdecea;
    padding: 8px;
    border-radius: 4px;
    margin-top: 10px;
    display: inline-block;
    font-weight: bold;
  }
}

@media (max-width: 768px) {
  .error-details {
    grid-template-columns: 1fr !important;
  }
}
</style>