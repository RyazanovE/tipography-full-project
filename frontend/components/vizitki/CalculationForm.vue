<script setup lang="ts">
import type { VizitkiFormData } from '../../composables/useVizitkiPage'

interface Props {
  formValue: VizitkiFormData
  files: FileList | null
  isMockupError: boolean
  summ: number
}

interface Emits {
  'update:formValue': [value: VizitkiFormData]
  'update:files': [value: FileList | null]
  'fileChange': []
  'addToCart': []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleFormUpdate = (newValue: VizitkiFormData) => {
  emit('update:formValue', newValue)
}

const handleFilesUpdate = (newFiles: FileList | null) => {
  emit('update:files', newFiles)
}

const handleFileChange = () => {
  emit('fileChange')
}

const handleAddToCart = () => {
  emit('addToCart')
}
</script>

<template>
  <section class="calculation-form">
    <UiCard >
      <div class="calculation-form__header">
        <div class="calculation-form__icon">
          <MdiIcon icon="mdiCalculator" size="32px" color="#6366f1" />
        </div>
        <UiSubHeader class="calculation-form__title">
          Калькулятор печати
        </UiSubHeader>
      </div>
      
      <div class="calculation-form__content">
        <div class="calculation-form__file-section">
          <div class="calculation-form__section-header">
            <MdiIcon icon="mdiFileUpload" size="20px" color="#10b981" />
            <span class="calculation-form__section-title">Загрузка макета</span>
          </div>
          <MockupFile
            class="calculation-form__file-upload"
            :model-value="files"
            :is-mockup-error="isMockupError"
            @update:model-value="handleFilesUpdate"
            @file-change="handleFileChange"
            without-design
            without-prepeared-design
          />
        </div>
  

        <div class="calculation-form__form-section">
          <div class="calculation-form__section-header">
            <MdiIcon icon="mdiCog" size="20px" color="#f59e0b" />
            <span class="calculation-form__section-title">Параметры печати</span>
          </div>
          <VizitkiForm 
            :model-value="formValue"
            @update:model-value="handleFormUpdate"
          />
        </div>
        
        <div class="calculation-form__summary">
          <div class="calculation-form__price-display">
            <span class="calculation-form__price">от {{ summ.toLocaleString() }} ₽</span>
          </div>
          <ConfirmButtons
            :disabled='!files?.length'
            class="calculation-form__actions"
            :summ="summ"
            tooltip-text="Добавить в корзину"
            @add-to-cart="handleAddToCart"
          />
          
        </div>
        <p class="hint-text">
        * <strong>Прикрипите файл</strong> для быстрого заказа или <strong> заполните форму расчета</strong> для оформления нужного тиража
        </p>
      </div>
    </UiCard>
  </section>
</template>

<style scoped lang="scss">
.hint-text {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  font-style: italic;
  line-height: 1.4;
}

.calculation-form {

  &__card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;

    /* &:hover {
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    } */
  }

  &__header {
    text-align: center;
    margin-bottom: 40px;
  }

  &__icon {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
    padding: 16px;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 16px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  &__title {
    color: #1f2937;
    font-size: 1.75rem;
    font-weight: 700;
  }

  &__subtitle {
    color: #6b7280;
    font-size: 1.1rem;
    line-height: 1.5;
    margin: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__file-section,
  &__form-section {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    background: #ffffff;
    transition: all 0.3s ease;

    /* &:hover {
      border-color: #6366f1;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
    } */
  }

  &__section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f3f4f6;
  }

  &__section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
  }

  &__file-upload {
    margin-bottom: 0;
  }

  &__summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border-radius: 16px;
    border: 2px solid #bbf7d0;

    &--gray {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
      border-radius: 16px;
      border: 2px solid #cfe1d5;
      background: linear-gradient(135deg, #f2f7f3 0%, #ebf4ee 100%);
    }
  }

  &__price-display {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__price {
    font-size: 2rem;
    font-weight: 700;
    color: #059669;
  }

  &__actions {
    margin-top: 0;
  }

  // Responsive Design
  @media (max-width: 768px) {
    &__card {
      padding: 24px;
    }

    &__title {
      font-size: 1.5rem;
    }

    &__subtitle {
      font-size: 1rem;
    }

    &__summary {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }

    &__price {
      font-size: 1.75rem;
    }
  }
}
</style>
