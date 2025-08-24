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
    title: 'Частые вопросы при подготовке макетов',
    to: '/trebovniya-k-maketam/chastye-voprosy-pri-podgotovke-maketov'
  }
])
</script>

<template>
  <div class="faq-guide">
    <h1>Частые вопросы при подготовке макетов для печати</h1>

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

    <div class="intro-section">
      <p>Подготовка макета для печати — один из ключевых этапов в производстве любой полиграфической продукции. От правильности оформления файлов зависит итоговое качество готовой продукции, точность передачи цветов и отсутствие брака. Ниже мы собрали ответы на самые частые вопросы, которые задают клиенты типографии при подготовке макетов для печати.</p>
    </div>

    <div class="faq-section">
      <h2>В каком формате лучше предоставлять макет?</h2>
      <div class="faq-content">
        <p>Наиболее универсальным и надежным форматом для печати является <strong>PDF</strong>. Такой файл сохраняет все используемые элементы: шрифты, изображения, векторную графику. Для растровых изображений применяются форматы <strong>TIFF</strong> или <strong>JPEG</strong> с минимальной степенью сжатия. Важно убедиться, что все шрифты переведены в кривые.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Какое разрешение изображений должно быть в макете?</h2>
      <div class="faq-content">
        <p>Оптимальное разрешение для печати — <strong>300 dpi</strong>. При меньших значениях картинка может получиться размытой. Для баннеров допустимо 100 dpi, так как они просматриваются с большого расстояния.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Какие цветовые профили нужно использовать?</h2>
      <div class="faq-content">
        <p>Для полиграфии применяется цветовая модель <strong>CMYK</strong>. Если оставить изображения в <strong>RGB</strong>, цвета на бумаге будут отличаться от экрана. Чтобы избежать искажений, переведите все элементы макета в CMYK.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Что такое «вылеты» и зачем они нужны?</h2>
      <div class="faq-content">
        <p><strong>Вылеты</strong> — это поля за пределами обрезного формата, обычно 3–5 мм. Они нужны, чтобы при резке не появились белые полосы. Например, для формата А5 (148×210 мм) макет должен быть 154×216 мм.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Нужно ли оставлять поля внутри макета?</h2>
      <div class="faq-content">
        <p>Да. Внутренние отступы составляют не менее 3–5 мм от линии реза. Это гарантирует, что текст и логотипы не будут обрезаны.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Как правильно работать со шрифтами?</h2>
      <div class="faq-content">
        <p>Чтобы шрифты корректно отображались при печати, необходимо либо перевести их в <strong>кривые</strong>, либо встроить в PDF. В противном случае гарнитура может измениться.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Можно ли использовать черный цвет в 100% K?</h2>
      <div class="faq-content">
        <p>Для текста и мелких элементов подходит <strong>100% K</strong>. Для заливок лучше использовать «глубокий черный» (C60 M40 Y40 K100) для насыщенного результата.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Какие размеры макетов самые популярные?</h2>
      <div class="faq-content">
        <ul>
          <li>Визитки — 90×50 мм, 85×55 мм</li>
          <li>Листовки — А6, А5, А4</li>
          <li>Буклеты — А4 в три сложения</li>
          <li>Плакаты — А3, А2, А1, А0</li>
        </ul>
      </div>
    </div>

    <div class="faq-section">
      <h2>Чем отличается макет для цифровой и офсетной печати?</h2>
      <div class="faq-content">
        <p><strong>Цифровая печать</strong> более гибкая к требованиям, подходит для малых тиражей. <strong>Офсетная печать</strong> требует более строгой подготовки, так как ошибки в большом тираже обходятся дорого.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Как избежать распространённых ошибок при подготовке макета?</h2>
      <div class="faq-content">
        <p>Основные ошибки клиентов:</p>
        <ul>
          <li>оставляют RGB-изображения;</li>
          <li>забывают про вылеты;</li>
          <li>используют картинки низкого разрешения;</li>
          <li>размещают текст слишком близко к краю;</li>
          <li>не переводят шрифты в кривые.</li>
        </ul>
        <p>Перед сдачей файлов в печать используйте чек-лист или закажите проверку у специалистов типографии.</p>
      </div>
    </div>

    <div class="faq-section">
      <h2>Что делать, если я не умею готовить макеты?</h2>
      <div class="faq-content">
        <p>Если у вас нет опыта работы в графических редакторах, подготовку макета лучше доверить дизайнерам. Специалисты адаптируют файл под требования печати и исключат ошибки.</p>
      </div>
    </div>

    <div class="conclusion-section">
      <h2>Заключение</h2>
      <p>Правильная подготовка макета — это гарантия качественной печати и экономии средств. Соблюдайте основные правила: CMYK, 300 dpi, вылеты, отступы и кривые шрифты. При возникновении вопросов обращайтесь в типографию за консультацией — это поможет избежать брака и получить результат, соответствующий ожиданиям.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.faq-guide {
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

  .intro-section {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 30px;
    border-left: 4px solid #3498db;
  }

  .faq-section {
    margin-bottom: 30px;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border-left: 4px solid #2980b9;

    h2 {
      color: #2980b9;
      margin-bottom: 15px;
    }

    .faq-content {
      ul {
        padding-left: 20px;
        margin: 15px 0;

        li {
          margin-bottom: 8px;
        }
      }

      strong {
        color: #2c3e50;
      }
    }
  }

  .conclusion-section {
    background: #e8f8f5;
    padding: 25px;
    border-radius: 5px;
    margin-top: 20px;
    border-left: 4px solid #2ecc71;

    h2 {
      color: #27ae60;
      margin-bottom: 15px;
    }
  }
}

@media (max-width: 768px) {
  .faq-guide {
    padding: 0 15px;
    
    .faq-section, .intro-section, .conclusion-section {
      padding: 15px;
    }
  }
}
</style>