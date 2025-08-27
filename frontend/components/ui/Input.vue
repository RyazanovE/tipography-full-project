<template>
  <div class="custom-input">
    <div class="input-header">
      <label v-if="label" :for="id" class="input-label">
        {{ label }}
        <span v-if="required" class="required-mark">*</span>
      </label>
    </div>

    <div class="input-wrapper">
      <input
        v-if="!textarea"
        ref="inputRef"
        class="input-control"
        :class="{
          'input-control--error': error,
          'input-control--disabled': disabled,
          'input-control--focused': isFocused
        }"
        :id="id"
        :disabled="disabled"
        :type="type ?? 'text'"
        v-model="model"
        :placeholder="placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <textarea
        v-else
        class="input-control input-control--textarea"
        :class="{
          'input-control--error': error,
          'input-control--disabled': disabled,
          'input-control--focused': isFocused
        }"
        :id="id"
        v-model="model"
        :placeholder="placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IMask from 'imask'

const props = defineProps<{
  id: string
  disabled?: boolean
  placeholder: string
  label?: string
  textarea?: boolean
  type?: string
  error?: boolean
  mask?: 'phone' | 'email'
  required?: boolean
}>()

const model = defineModel<string>()
const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

onMounted(() => {
  const el = inputRef.value

  if (el && props.mask === 'phone') {
    IMask(el, { mask: '+{7} (000) 000-00-00' })
  }
})
</script>

<style scoped lang="scss">
.custom-input {
  position: relative;
  width: 100%;
}

.input-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.input-label {
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

.input-wrapper {
  position: relative;
}

.input-control {
  position: relative;
  width: 100%;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-height: 48px;
  font-size: 14px;
  color: #374151;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  &::placeholder {
    color: #9ca3af;
  }
}

.input-control--focused {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.input-control--textarea {
  resize: vertical;
  min-height: 88px;
}

.input-control--error {
  border-color: #ef4444;
  
  &:focus,
  &:hover {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
  }
}

.input-control--disabled {
  background-color: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
  
  &:hover {
    border-color: #e5e7eb;
    box-shadow: none;
  }
}
</style>