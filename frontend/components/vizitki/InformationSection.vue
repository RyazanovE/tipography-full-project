<script setup lang="ts">
// No props needed for this component as it's static content
</script>

<template>
  <section class="information-section">
    <div class="information-section__content">
      <UiSubHeader class="information-section__title">
        Изготовление визиток методом цифровой печати
      </UiSubHeader>
      
      <div class="information-section__text">
        <p class="information-section__paragraph">
          Нужна оперативная печать визиток в Москве? Выполним заказ быстро и качественно — на
          современном цифровом оборудовании.
        </p>
        
        <p class="information-section__paragraph">
          У вас уже есть макет? 
          <ButtonLink to="/trebovniya-k-maketam">
            Требования к макетам
          </ButtonLink>
        </p>
        
        <p class="information-section__paragraph">
          Нет макета? 
          <ButtonLink to="/design-service">
            Индивидуальный дизайн
          </ButtonLink>. 
          Предоставьте контакты, логотип и детали, а макет создадим.
        </p>
        
        <p class="information-section__paragraph">
          Узнайте 
          <ButtonLink to="/ceni">
            стоимость услуг
          </ButtonLink> 
          и сделайте заказ. Высокое качество и срочная печать с доставкой или самовывозом.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.information-section {
  margin-bottom: 40px;

  &__content {
  }

  &__title {
    margin-bottom: 24px;
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4;
  }

  &__text {
    color: #4b5563;
    line-height: 1.6;
  }

  &__paragraph {
    margin-bottom: 16px;
    font-size: 1rem;

    color: #6b7280;
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 16px auto 0;
    font-weight: 400;

// Responsive Design
@media (max-width: 768px) {
    .title {
        font-size: 20px;
    }
    
    .subtitle {
        font-size: 1rem;
        margin: 12px auto 0;
    }
}
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
