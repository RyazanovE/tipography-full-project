<template>
  <div class="custom-select">
    <div class="select-header">
      <label v-if="label" :for="id" class="select-label">
        {{ label }}
        <span v-if="required" class="required-mark">*</span>
      </label>

      <UiTooltip v-if="tooltopText" class="select-tooltip">
        {{ tooltopText }}
      </UiTooltip>
    </div>

    <div
      :id="id"
      class="select-trigger"
      :class="{
        'select-trigger--active': open,
        'select-trigger--placeholder': !modelValue
      }"
      tabindex="0"
      @blur="handleBlur"
      @click="toggle"
    >
      <span class="select-value">{{ selectedLabel }}</span>
      <div class="select-arrow" :class="{ 'select-arrow--active': open }">
        <MdiIcon icon="mdiMenuDown" />
      </div>
    </div>

    <transition name="select-dropdown">
      <div v-if="open" class="select-dropdown" @mousedown.prevent>
        <div class="select-options">
          <div
            v-for="option in options"
            :key="option.value"
            class="select-option"
            :class="{ 'select-option--active': option.value === modelValue }"
            @mousedown="select(option)"
          >
            <span class="select-option__check" v-if="option.value === modelValue">
              <MdiIcon icon="mdiCheck" />
            </span>
            {{ option.label }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

interface SelectProps {
  options: SelectOption[]
  placeholder?: string
  id?: string
  label?: string
  tooltopText?: string
  styles?: Record<string, any>
  required?: boolean
}

const props = defineProps<SelectProps>()

const modelValue = defineModel<string | number | null>()
const open = ref(false)
const isMouseOverDropdown = ref(false)

const toggle = () => {
  open.value = !open.value
}

const select = (option: SelectOption) => {
  modelValue.value = option.value
  open.value = false
}

const handleBlur = (event: FocusEvent) => {
  // Проверяем, куда переходит фокус
  const relatedTarget = event.relatedTarget as HTMLElement

  // Если фокус переходит на элемент внутри dropdown, не закрываем его
  if (relatedTarget && relatedTarget.closest('.select-dropdown')) {
    return
  }

  // Небольшая задержка для обработки клика на опцию
  setTimeout(() => {
    if (!isMouseOverDropdown.value) {
      open.value = false
    }
  }, 100)
}

const selectedLabel = computed(() => {
  const found = props.options.find((opt) => opt.value === modelValue.value)
  return found?.label || props.placeholder || 'Выберите вариант'
})

watch(
  () => props.options,
  (newOptions) => {
    if (modelValue.value == null && newOptions.length > 0) {
      modelValue.value = newOptions[0].value
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  width: 100%;
}

.select-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.select-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
}

.required-mark {
  color: #ef4444;
  margin-left: 4px;
}

.select-tooltip {
  color: #9ca3af;
}

.select-trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
}

.select-trigger--active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.select-trigger--placeholder {
  color: #9ca3af;
}

.select-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 24px;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  color: #6b7280;

  &--active {
    transform: translateY(-50%) rotate(180deg);
  }
}

.select-dropdown {
  z-index: 100000;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.select-options {
  max-height: 240px;
  overflow-y: auto;

  padding: 4px 0;
}

.select-option {
  position: relative;
  padding: 10px 16px 10px 40px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }
}

.select-option--active {
  background-color: #eff6ff;
  color: #1d4ed8;
  font-weight: 500;
}

.select-option__check {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #3b82f6;
}

// Анимации для dropdown
.select-dropdown-enter-active,
.select-dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.select-dropdown-enter-from,
.select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
