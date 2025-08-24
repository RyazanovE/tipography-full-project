<script setup lang="ts">
import { watch } from 'vue'

export interface ButtonOption {
  label: string
  value: string | number
  icon?: any
}

interface ButtonGroupProps {
  options: ButtonOption[]
  id?: string
  label?: string
}

const props = defineProps<ButtonGroupProps>()

const modelValue = defineModel<string | number>()

const select = (option: ButtonOption) => {
  modelValue.value = option.value
}

watch(
  () => props.options,
  (newOptions) => {
    if (newOptions.length > 0 && modelValue.value == null) {
      modelValue.value = newOptions[0].value
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="button-group" :id="props.id">
    <label v-if="props.label" class="button-group__label">{{ props.label }}</label>
    <div class="button-group__buttons">
      <button v-for="option in props.options" :key="option.value" type="button" class="button-group__button"
        :class="{ 'button-group__button--active': option.value === modelValue }" @click="select(option)">
        <MdiIcon v-if='option.icon' :icon="option.icon" size='20px' class='button-group__icon' />
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.button-group {
  display: flex;
  flex-direction: column;
}

.button-group__icon {
  margin-right: 8px; 
}

.button-group__label {
}

.button-group__buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.button-group__button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s, border-color 0.3s;
}

.button-group__button--active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}
</style>
