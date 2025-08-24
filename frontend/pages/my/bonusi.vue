<template>
  <MyWrapper>
    <div class="rewards">
      <div class="rewards__level">
        <div class="rewards__progress-wrapper">
          <div class="rewards__progress">
            <div class="rewards__progress-wave"></div>
            <div class="rewards__progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="rewards__progress-text">
            {{ currentPoints }} баллов из {{ nextLevelPoints }} для следующего уровня
          </div>
        </div>

        <div class="rewards__stats">
          <div class="rewards__stat">
            <div class="rewards__stat-value">{{ currentPoints }} баллов</div>
            <div class="rewards__stat-label">Ваши баллы</div>
          </div>
          <div class="rewards__stat">
            <div class="rewards__stat-value">+{{ nextLevelPoints - currentPoints }} баллов</div>
            <div class="rewards__stat-label">До следующего уровня</div>
          </div>
          <div class="rewards__stat">
            <div class="rewards__stat-value">1 балл = 1 ₽</div>
            <div class="rewards__stat-label">Условия скидки</div>
          </div>
          <div class="rewards__stat">
            <div class="rewards__stat-value">Баллы начисляются после оплаты</div>
            <div class="rewards__stat-label">Условия начисления</div>
          </div>
        </div>
      </div>

      <!-- Аккордеон Вопрос-Ответ -->
      <div class="rewards__accordion">
        <div
          v-for="(item, index) in accordionItems"
          :key="index"
          class="rewards__accordion-item"
          :class="{ 'rewards__accordion-item_active': activeIndex === index }"
        >
          <button class="rewards__accordion-header" @click="toggleAccordion(index)">
            {{ item.question }}
            <span class="rewards__accordion-icon">
              {{ activeIndex === index ? '−' : '+' }}
            </span>
          </button>
          <div class="rewards__accordion-body">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </MyWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useInitiateBreadcrumbs([
  ...breadcrumbsDefaultValue,
  {
    title: 'Бонусы',
    to: '/my/bonusi'
  }
])

const activeIndex = ref<number | null>(null)

const toggleAccordion = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const currentPoints = ref(320)
const nextLevelPoints = ref(500)
const progress = ref((currentPoints.value / nextLevelPoints.value) * 100)

const accordionItems = [
  {
    question: 'Как начисляются баллы?',
    answer: 'Баллы начисляются автоматически после подтверждения оплаты заказа.'
  },
  {
    question: 'Как использовать баллы?',
    answer: 'Вы можете оплатить до 50% стоимости заказа накопленными баллами.'
  },
  {
    question: 'Когда сгорают баллы?',
    answer: 'Баллы действуют 12 месяцев с момента начисления.'
  }
]
</script>

<style scoped lang="scss">
$normal-gap: 16px;

.rewards {
  display: flex;
  flex-direction: column;
  gap: $normal-gap;

  &__level {
    display: flex;
    flex-direction: column;
    gap: $normal-gap;
  }

  &__progress-wrapper {
    margin-bottom: $normal-gap;
  }

  &__progress {
    position: relative;
    height: 24px;
    background: #f3f4f6;
    border-radius: 12px;
    overflow: hidden;
  }

  &__progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, #4f46e5, #3b82f6);
    border-radius: 12px 0 0 12px;
    z-index: 2;
    transition: width 0.5s ease;
  }

  &__progress-text {
    margin-top: calc($normal-gap / 2);
    text-align: center;
    font-size: 16px;
    color: #374151;
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: $normal-gap;
    background: #f9fafb;
    padding: $normal-gap;
    border-radius: 8px;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: calc($normal-gap / 4);
  }

  &__stat-value {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  &__stat-label {
    font-size: 13px;
    color: #6b7280;
  }

  &__accordion {
    display: flex;
    flex-direction: column;
    gap: $normal-gap;
  }

  &__accordion-item {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s;
  }

  &__accordion-header {
    width: 100%;
    text-align: left;
    background: white;
    padding: $normal-gap;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f3f4f6;
    }
  }

  &__accordion-icon {
    font-size: 20px;
    color: #6b7280;
    transition: transform 0.3s;
  }

  &__accordion-body {
    max-height: 0;
    overflow: hidden;
    background: #f9fafb;
    font-size: 14px;
    color: #4b5563;
    padding: 0 $normal-gap;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }

  &__accordion-item_active &__accordion-body {
    max-height: 200px;
    padding: $normal-gap;
  }

  &__accordion-item_active &__accordion-icon {
    transform: rotate(45deg);
  }
}
</style>
