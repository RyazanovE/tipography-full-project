<template>
  <form class="calculation-form" @submit.prevent>
    <h3 class="calculation-form__title">Расчет стоимости</h3>

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
    <UiSelect
      v-model="formValue.productionTime"
      class="calculation-form__select"
      label="Время изготовления"
      :options="options.productionTime"
      tooltop-text="sdf"
    />

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
  .materials-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc($normal_gap / 4);

    &__label {
      font-size: $font-size_normal;
    }
  }

  .materials {
    display: flex;
    gap: $normal_gap;
    margin-bottom: calc($normal_gap / 2);
    justify-content: space-between;

    &__material {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: calc($normal_gap / 4);

      &__txt-btn {
        transition: 0.3s ease;

        &_active {
          color: $primary_background_color;
        }
      }

      .material-btn {
        position: relative;
        border-radius: $border_radius_normal;
        overflow: hidden;

        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        border: 2px solid $white_background_color;

        &_active {
          border: 2px solid $primary_background_color;
        }

        &__img {
          object-fit: cover;
          transition: 0.3s ease;
        }

        &__icon {
          position: absolute;
          height: 30px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: 0.3s ease;
          z-index: 10;
          transition: $all-transition;

          &:hover {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2);
          }

          & > * {
            fill: $white_background_color;
          }
        }

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          z-index: 9;
          transition: 0.3s ease;
        }

        &:hover {
          .material-btn__img {
            filter: blur(2px);
          }

          .material-btn__icon {
            opacity: 1;
          }

          &::after {
            opacity: 1;
          }
        }
      }
    }
  }

  &__additional-options {
    margin-bottom: calc($normal_gap / 2);

    .additional-options-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: calc($normal_gap / 4);

      &__label {
        display: block;
        font-size: $font-size_normal;
      }
    }

    .additional-options {
      display: flex;
      align-items: center;
      gap: $normal_gap;

      &__option {
        display: flex;
        align-items: center;
      }
    }
  }

  &__comment {
    margin-bottom: calc($normal_gap / 2);

    .comment-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: calc($normal_gap / 4);

      &__label {
        display: block;
        font-size: $font-size_normal;
      }
    }
  }

  &__summ {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .summ {
      display: flex;
      align-items: center;
      gap: calc($normal_gap / 2);

      &__value {
        color: black;
        font-weight: 600;
        font-size: $font-size_larger;
      }
    }
  }

  &__title {
    margin-bottom: $normal_gap;
    font-size: 24px;
  }

  &__select {
    margin-bottom: calc($normal_gap/2);
  }
}
</style>
