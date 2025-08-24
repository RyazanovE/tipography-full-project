<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  total: number,
  limit: number,
  offset: number,
}>()

const emit = defineEmits<{
  (e: 'update:offset', newOffset: number): void
}>()

const currentPage = computed(() => Math.floor(props.offset / props.limit) + 1)
const totalPages = computed(() => Math.ceil(props.total / props.limit))

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  emit('update:offset', (page - 1) * props.limit)
}

function prevPage() {
  goToPage(currentPage.value - 1)
}

function nextPage() {
  goToPage(currentPage.value + 1)
}
</script>

<template>
  <div class="pagination">
    <button :disabled="currentPage <= 1" @click="prevPage">← Назад</button>

    <span>Страница {{ currentPage }} из {{ totalPages }}</span>

    <button :disabled="currentPage >= totalPages" @click="nextPage">Вперёд →</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  gap: 1rem;
  align-items: center;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
