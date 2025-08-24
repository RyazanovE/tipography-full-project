<template>
  <div class="formats-section">
    <h3 class="formats-title">Форматы файлов для печати</h3>
    <p class="formats-description">
      Для отправки макета рекомендуем использовать следующие форматы в порядке приоритета:
    </p>
    <div class="formats-list">
      <div 
        v-for="(format, index) in formats" 
        :key="index" 
        class="format-item"
        :class="{ 'highlight-format': index === 0 }"
      >
        <span class="format-name">{{ format }}</span>
        <MdiIcon 
          v-if="index < formats.length - 1" 
          icon="mdiArrowRightThin" 
          size="20px" 
          class="arrow-icon"
        />
      </div>
    </div>
    <div class="priority-note">
      Форматы расположены в порядке предпочтения: от наиболее рекомендуемых к допустимым
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ formats?: string[] }>()

const formats = computed(() => props.formats ?? ['PDF', 'PSD', 'AI', 'EPS', 'CDR', 'TIFF', 'JPEG'])
</script>

<style scoped lang="scss">
.formats-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  margin: 20px 0;
}

.formats-title {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
}

.formats-description {
  color: #333;
  margin-bottom: 15px;
  font-size: 15px;
}

.formats-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.format-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
}

.highlight-format {
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
  font-weight: bold;
}

.format-name {
  font-size: 15px;
  color: #333;
}

.arrow-icon {
  color: #7f8c8d;
}

.priority-note {
  font-size: 13px;
  color: #7f8c8d;
  font-style: italic;
}

@media (max-width: 768px) {
  .formats-list {
    gap: 8px;
  }
  
  .format-item {
    padding: 6px 10px;
    gap: 8px;
  }
  
  .format-name {
    font-size: 14px;
  }
  
  .arrow-icon {
    size: 16px;
  }
}
</style>