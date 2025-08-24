<template>
  <transition name="modal-fade">
    <div v-if="isShown" class="modal-overlay">
      <div class="modal-content" ref="modalContentRef" @mousedown="handleMouseDown">
        <button @click='isShown = false'>
          <MdiIcon class="modal-content__close" icon="mdiClose" size="25" />
        </button>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isShown = defineModel<boolean>()
const modalContentRef = ref<HTMLElement | null>(null)
const clickedInside = ref(false)

const handleMouseDown = () => {
  clickedInside.value = true
}

const handleMouseUp = (e: MouseEvent) => {
  if (!modalContentRef.value?.contains(e.target as Node) && !clickedInside.value) {
    isShown.value = false
  }
  clickedInside.value = false
}

onMounted(() => {
  document.addEventListener('mouseup', handleMouseUp)
})
onBeforeUnmount(() => {
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  overflow: hidden;
  background: white;
  padding: $normal_gap;
  border-radius: $border_radius_normal;
  min-width: 300px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform: scale(1);
  opacity: 1;

  &__close {
    position: absolute;
    top: $normal_gap;
    right: $normal_gap;
    cursor: pointer;
    transition: $all-transition;

    &:hover {
      opacity: 0.6;
    }
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.95);
  opacity: 0;
}
</style>
