<script setup lang="ts">
import mediumZoom from 'medium-zoom'
import { services } from '../../constants/pechat-vizitok'
// Components are auto-imported by Nuxt 3

// Setup breadcrumbs
const { setupBreadcrumbs } = useVizitkiBreadcrumbs()
setupBreadcrumbs()

// Main page logic
const {
  currentStep,
  isMockupError,
  files,
  formValue,
  steps,
  summ,
  addToCart,
  onFileChange,
  handleStepClick,
  setCurrentStep
} = useVizitkiPage()

// Setup medium zoom for images


// Event handlers
const handleCardClick = () => {
  setCurrentStep(1)
}

const handleFormUpdate = (newValue: any) => {
  formValue.value = newValue
}

const handleFilesUpdate = (newFiles: FileList | null) => {
  files.value = newFiles
}
</script>

<template>
  <main class="vizitki-page">
    <!-- Page Header -->
    <UiHeader style='margin-bottom: 0'>
      Печать визиток в Москве
    </UiHeader>

    <!-- Progress Bar -->
    <StepProgressBar
      :steps="steps"
      :current-step="currentStep"
      @step-click="handleStepClick"
    />

    <!-- Step 0: Mockup Selection -->
    <section 
      v-if="currentStep === 0" 
      class="vizitki-page__mockup-selection"
    >
             <UiSubHeader 
         class="vizitki-page__section-title"
         subtitle="Хороший макет — основа качественной визитки. Вы можете загрузить собственный файл, выбрать готовый шаблон или поручить разработку дизайна нашим специалистам. Выберите удобный вариант и переходите к следующему шагу."
       >
         1. Выбор формата макета
       </UiSubHeader>
      
      <MockupSelectionCards @card-click="handleCardClick" />
    </section>

         <!-- Step 1: Calculation Form -->
     <template v-if="currentStep === 1">
       <div class="vizitki-page__step-container">
         <UiSubHeader 
           class="vizitki-page__section-title"
           subtitle="Укажите параметры визитки, чтобы рассчитать цену и сроки изготовления. Выберите материал, тираж, цветность и дополнительные услуги — стоимость обновляется автоматически."
         >
           2. Расчет стоимости
         </UiSubHeader>
         
                   <div class="vizitki-page__form-container">
           <VizitkiCalculationForm
             :form-value="formValue"
             :files="files"
             :is-mockup-error="isMockupError"
             :summ="summ"
             @update:form-value="handleFormUpdate"
             @update:files="handleFilesUpdate"
             @file-change="onFileChange"
             @add-to-cart="addToCart"
           />
         </div>

         <div class="vizitki-page__info-container">
           <VizitkiInformationSection />
         </div>

         <VizitkiAdditionalInfo />
       </div>

       <!-- Footer Sections -->
       <VizitkiFooterSections :services="services" />
     </template>
  </main>
</template>

<style scoped lang="scss">
.vizitki-page {
  max-width: $app_width;
  margin: 0 auto;

  &__header {
    margin-bottom: 32px;
  }

  &__title {
    line-height: 1.2;
    color: #1f2937;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
  }

  &__mockup-selection {
  }

  &__section-title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 1.75rem;
    color: #1f2937;
    font-weight: 600;
  }



  &__step-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__form-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 40px;
  }

  &__info-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }

  // Responsive Design
  @media (max-width: 768px) {
    padding: 0 12px;

    &__title {
      font-size: 2rem;
    }

    &__section-title {
      font-size: 1.5rem;
      margin-bottom: 40px;
    }
  }

  @media (max-width: 480px) {
    padding: 0 8px;

    &__title {
      font-size: 1.75rem;
    }

    &__section-title {
      font-size: 1.25rem;
      margin-bottom: 40px;
    }
  }
}
</style>
