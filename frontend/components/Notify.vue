<template>
  <div class="notification" :class="[type, { show }]">
    <div class="content">
      <span class="icon" />
      <span class="message">{{ message }}</span>
      <!-- <button class="close" @click="close">×</button> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'info' // 'success', 'error', 'warning'
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const show = ref(false)

onMounted(() => {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, props.duration)
})

const close = () => {
  show.value = false
}
</script>

<style lang="scss">
.notification {
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
  padding: 16px 24px;
  border-radius: 12px;
  background: #2e2e2e;
  color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  min-width: 280px;
  max-width: 90%;
  display: flex;
  align-items: center;

  &.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }

  &.success {
    background: #e6f4ea;
    color: #256029;

    .icon {
      background-color: #34c759;
    }
  }

  &.error {
    background: #fdecea;
    color: #b00020;

    .icon {
      background-color: #ff3b30;
    }
  }

  &.warning {
    background: #fff4e5;
    color: #8a6d3b;

    .icon {
      background-color: #ff9500;
    }
  }

  &.info {
    background: #e8f0fe;
    color: #1a73e8;

    .icon {
      background-color: #1a73e8;
    }
  }

  .content {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .message {
    flex-grow: 1;
    font-size: 14px;
    line-height: 1.4;
    word-break: break-word;
  }

  .close {
    margin-left: 12px;
    background: transparent;
    border: none;
    font-size: 18px;
    line-height: 1;
    color: inherit;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
