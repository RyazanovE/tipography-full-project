<script setup lang="ts">
interface MockupCard {
  icon: string
  iconColor: string
  title: string
  description: string
  features: string[]
}

interface Props {
  cards?: MockupCard[]
  onCardClick?: (index: number) => void
}

const props = withDefaults(defineProps<Props>(), {
  cards: () => [
    {
      icon: 'mdiFileDocument',
      iconColor: '#6366f1',
      title: 'Использовать свой макет',
      description: 'Загрузите готовый макет в любом формате. Мы проверим его на соответствие требованиям.',
      features: ['Быстрая проверка', 'Любые форматы']
    },
    {
      icon: 'mdiPalette',
      iconColor: '#f59e0b',
      title: 'Доверьте нам дизайн',
      description: 'Наши дизайнеры создадут уникальный макет на основе ваших пожеланий и брендинга.',
      features: ['Уникальный дизайн', 'Бесплатные правки']
    },
    {
      icon: 'mdiViewGrid',
      iconColor: '#8b5cf6',
      title: 'Готовые макеты',
      description: 'Выберите из коллекции профессиональных шаблонов и адаптируйте под свои нужды.',
      features: ['Готовые шаблоны', 'Быстрый выбор']
    }
  ]
})

const emit = defineEmits<{
  cardClick: [index: number]
}>()

const handleCardClick = (index: number) => {
  emit('cardClick', index)
  if (props.onCardClick) {
    props.onCardClick(index)
  }
}
</script>

<template>
  <div class="mockup-selection__cards">
    <div 
      v-for="(card, index) in cards" 
      :key="index"
      class="mockup-card" 
      @click="handleCardClick(index)"
    >
      <div class="mockup-card__icon">
        <MdiIcon :icon="card.icon" size="48px" :color="card.iconColor" />
      </div>
      <h3 class="mockup-card__title">{{ card.title }}</h3>
      <p class="mockup-card__description">
        {{ card.description }}
      </p>
      <div class="mockup-card__features">
        <span 
          v-for="(feature, featureIndex) in card.features" 
          :key="featureIndex"
          class="mockup-card__feature"
        >
          <MdiIcon icon="mdiCheck" size="16px" color="#10b981" />
          {{ feature }}
        </span>
      </div>
      <ButtonOutline 
        class="mockup-card__button"
        title="Выбрать"
        icon="mdiArrowRight"
        hover-icon="mdiArrowRight"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.mockup-selection__cards {
  display: flex;
  gap: $normal_gap;
  margin: 0 auto;
}

.mockup-card {
  flex: 1;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: $normal_gap * 1.5;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    border-color: #6366f1;
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &__icon {
    display: flex;
    justify-content: center;
    margin-bottom: $normal_gap;
    padding: $normal_gap;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 16px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin-bottom: calc($normal_gap / 2);
    line-height: 1.4;
  }

  &__description {
    color: #6b7280;
    text-align: center;
    line-height: 1.6;
    margin-bottom: $normal_gap;
    font-size: 0.95rem;
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: calc($normal_gap / 3);
    margin-bottom: $normal_gap;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: calc($normal_gap / 3);
    font-size: 0.9rem;
    color: #4b5563;
    font-weight: 500;
  }

  &__button {
    width: 100%;
    justify-content: center;
    margin-top: auto;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    padding: $normal_gap;

    &__title {
      font-size: 1.1rem;
    }

    &__description {
      font-size: 0.9rem;
    }
  }
}
</style>
