<template>
  <div class="design-uploader">
    <div class="design-uploader__header">
      <h3 class="design-uploader__title">
        Макет
        <span class="required-mark">*</span>
      </h3>
      <UiTooltip class="design-uploader__tooltip">
        Загрузите свой макет, выберите из готовых шаблонов или закажите дизайн
      </UiTooltip>
    </div>

    <div class="design-uploader__options">
      <!-- Загрузка файлов -->
      <input
        name="files"
        multiple
        type="file"
        ref="fileInput"
        class="design-uploader__file-input"
        @change="onFileChange"
      />
      
      <div
        :class="[
          'upload-option',
          { 'upload-option--active': selectedMethod === 1 },
          { 'upload-option--error': isMockupError }
        ]"
        @click="selectUploadOption(1)"
      >
        <div class="upload-option__icon">
          <MdiIcon icon="mdiTrayArrowUp" />
        </div>
        <div class="upload-option__content">
          <h4 class="upload-option__title">Загрузить свой макет</h4>
          <p v-if="!files" class="upload-option__description">Нажмите для загрузки файла</p>
          <p v-else class="upload-option__files-count">Файлов: {{ files.length }}</p>
        </div>
        <div v-if="files" class="upload-option__actions">
          <button class="action-btn action-btn--delete" @click.stop="removeFiles">
            <MdiIcon icon="mdiTrashCanOutline" />
          </button>
        </div>
      </div>

      <!-- Готовые шаблоны -->
      <div
        :class="[
          'upload-option',
          'upload-option--disabled',
          { 'upload-option--error': isMockupError }
        ]"
        v-if="!withoutPrepearedDesign"
      >
        <div class="upload-option__icon">
          <MdiIcon icon="mdiImageAlbum" />
        </div>
        <div class="upload-option__content">
          <h4 class="upload-option__title">Выбрать из готовых</h4>
          <p class="upload-option__description">Более 50 шаблонов на выбор</p>
        </div>
        <div class="upload-option__badge">
          <span>Скоро</span>
        </div>
      </div>

      <!-- Заказ дизайна -->
      <div
        :class="[
          'upload-option',
          { 'upload-option--active': selectedMethod === 3 },
          { 'upload-option--error': isMockupError }
        ]"
        v-if="!withoutDesign"
        @click="selectDesignOption"
      >
        <div class="upload-option__icon">
          <MdiIcon icon="mdiPencilRuler" />
        </div>
        <div class="upload-option__content">
          <h4 class="upload-option__title">Заказать дизайн</h4>
          <p class="upload-option__description">Заказать дизайн вашего макета</p>
        </div>
      </div>
    </div>

    <div v-if="isMockupError" class="design-uploader__error">
      <MdiIcon icon="mdiAlertCircle" class="design-uploader__error-icon" />
      <span>Выберите один из вариантов</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  withoutDesign?: boolean
  withoutFile?: boolean
  withoutPrepearedDesign?: boolean
  isMockupError?: boolean
}>()

const files = defineModel<FileList | null>()
const emits = defineEmits(['fileChange'])
const selectedMethod = ref<1 | 2 | 3 | null>(null)

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const eventFiles = target.files || null

  if (eventFiles) {
    selectedMethod.value = 1
    files.value = eventFiles
  } else {
    selectedMethod.value = null
  }

  emits('fileChange')
}

watch(selectedMethod, (newValue) => {
  if (newValue !== 1) {
    files.value = null
    emits('fileChange')
  }
})

const selectUploadOption = (method: 1) => {
  if (method === 1) {
    const fileInput = document.querySelector('.design-uploader__file-input') as HTMLElement
    fileInput?.click()
  }
}

const selectDesignOption = () => {
  selectedMethod.value = 3
}

const removeFiles = (event: Event) => {
  event.stopPropagation()
  files.value = null
  selectedMethod.value = null
  emits('fileChange')
}
</script>

<style scoped lang="scss">
.design-uploader {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }

  &__tooltip {
    color: #718096;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-bottom: 8px;
  }

  &__file-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  &__error {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #e53e3e;
    font-size: 14px;
    height: 20px;
  }

  &__error-icon {
    font-size: 16px;
  }
}

.upload-option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4299e1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    .upload-option__icon {
      background-color: #ebf8ff;
      color: #3182ce;
    }
  }

  &--active {
    border-color: #3182ce;
    background-color: #f7fafc;
    
    .upload-option__icon {
      background-color: #3182ce;
      color: white;
    }
  }

  &--error {
    border-color: #e53e3e;
  }

  &--disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 10px;
    background-color: #f7fafc;
    color: #718096;
    transition: all 0.2s ease;
    flex-shrink: 0;
    
    :deep(svg) {
      width: 28px;
      height: 28px;
    }
  }

  &__content {
    flex-grow: 1;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 4px 0;
  }

  &__description {
    font-size: 14px;
    color: #718096;
    margin: 0;
  }

  &__files-count {
    font-size: 14px;
    color: #3182ce;
    font-weight: 500;
    margin: 0;
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #edf2f7;
    color: #718096;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
  }
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fed7d7;
    color: #e53e3e;
  }

  &--delete {
    color: #718096;
    
    &:hover {
      color: #e53e3e;
    }
  }
  
  :deep(svg) {
    width: 20px;
    height: 20px;
  }
}

.required-mark {
  color: #e53e3e;
  margin-left: 4px;
}

@media (max-width: 768px) {
  .design-uploader__options {
    grid-template-columns: 1fr;
  }
  
  .upload-option {
    padding: 16px;
  }
  
  .upload-option__icon {
    width: 48px;
    height: 48px;
    
    :deep(svg) {
      width: 24px;
      height: 24px;
    }
  }
}
</style>