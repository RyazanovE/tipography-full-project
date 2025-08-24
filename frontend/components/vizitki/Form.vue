<template>
  <form class="calculation-form" @submit.prevent>
    <UiSubHeader class="calculation-form__title">Расчет стоимости</UiSubHeader>
    <UiSelect
      v-model="formValue.material"
      class="calculation-form__select"
      label="Материал"
      :options="options.material"
      tooltop-text="sdf"
    />
    <UiSelect
      v-model="formValue.size"
      class="calculation-form__select"
      label="Размер визитки"
      :options="options.size"
      tooltop-text="sdf"
    />
    <UiSelect
      v-model="formValue.format"
      class="calculation-form__select"
      label="Тип печати"
      :options="options.format"
      tooltop-text="sdf"
    />
    <UiSelect
      v-model="formValue.color"
      class="calculation-form__select"
      label="Цветность"
      :options="options.color"
      tooltop-text="sdf"
    />
    <UiSelect
      v-model="formValue.amount"
      class="calculation-form__select"
      label="Тираж"
      :options="options.amount"
      tooltop-text="sdf"
    />
    <UiSelect
      v-model="formValue.lamination"
      class="calculation-form__select"
      label="Ламинирование"
      :options="options.lamination"
      tooltop-text="sdf"
    />

    <div class="calculation-form__additional-options">
      <div class="additional-options-label">
        <label class="additional-options-label__label">Время изготовления</label>
        <UiTooltip class="material-label__tooltip"> sdfsfd </UiTooltip>
      </div>
      <div class="additional-options">
        <div class="additional-options__option">
          <UiCheckbox v-model="formValue.productionTime" />
          1 - 2 рабочих дня
        </div>
        <div class="additional-options__option">
          <UiCheckbox @change="formValue.productionTime = '4 часа'" />
          Срочное до 4-ех часов
        </div>
      </div>
    </div>

    <div class="calculation-form__additional-options">
      <div class="additional-options-label">
        <label class="additional-options-label__label">Дополнительные услуги</label>
        <UiTooltip class="material-label__tooltip"> sdfsfd </UiTooltip>
      </div>
      <div class="additional-options">
        <div class="additional-options__option">
          <UiCheckbox v-model="formValue.corners" />
          Скругление углов
        </div>
        <div class="additional-options__option">
          <UiCheckbox v-model="formValue.holes" />
          Пробивка отверстий
        </div>
      </div>
    </div>

    <div class="calculation-form__comment">
      <div class="comment-label">
        <label class="comment-label__label">Комментарий к заказу</label>
        <UiTooltip class="material-label__tooltip"> sdfsfd </UiTooltip>
      </div>
      <UiInput textarea id="comment" placeholder="" class="comment-textarea" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { options } from '~/constants/pechat-vizitok'
const formValue = defineModel<{
  material: string
  size: string
  designType: string
  color: string
  format: string
  amount: string
  productionTime: string
  lamination: string
  corners: boolean
  holes: boolean
}>({ required: true })
</script>

<style scoped lang="scss">
.calculation-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  align-items: start;

  &__title {
    grid-column: span 2;
  }

  &__select {
    margin-bottom: 20px;
    transition: all 0.3s ease;

    &:last-of-type {
      margin-bottom: 24px;
    }
  }

  &__additional-options {
    margin-bottom: 24px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;

    .additional-options-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      &__label {
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
      }
    }

    .additional-options {
      display: flex;
      flex-direction: column;
      gap: 12px;

      &__option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: white;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          border-color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
          transform: translateY(-1px);
        }
      }
    }
  }

  &__comment {
    grid-column: span 2;
    margin-bottom: 24px;

    .comment-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      &__label {
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
      }
    }

    .comment-textarea {
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;

      &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      &:hover {
        border-color: #cbd5e1;
      }
    }
  }
}

// Анимации и дополнительные стили
@media (max-width: 768px) {
  .calculation-form {
    padding: 24px 16px;

    &__title {
      font-size: 24px;
      margin-bottom: 24px;
    }

    &__additional-options {
      padding: 16px;

      .additional-options {
        gap: 8px;

        &__option {
          padding: 10px 12px;
        }
      }
    }
  }
}

// Плавные переходы для всех интерактивных элементов
.calculation-form {
  * {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

// Эффект при наведении на всю форму
// .calculation-form:hover {
//   box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
// }
</style>
