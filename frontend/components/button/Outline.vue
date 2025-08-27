<template>
  <div
    :class="['mockup-alt', { 'mockup-alt--active': active }, { 'mockup-alt--disabled': disabled }]"
    @click="!disabled && $emit('click')"
  >
    <div class="mockup-alt__header">
      <h3 class="mockup-alt__title">{{ title }}</h3>
      <span v-if="badge" class="mockup-alt__badge">{{ badge }}</span>
    </div>

    <div class="mockup-alt__content">
      <div class="mockup-alt__main-icon">
        <MdiIcon class="mockup-alt__icon" :icon="icon" size="40px" />
      </div>
      <p class="mockup-alt__text">{{ text }}</p>
    </div>

    <div class="mockup-alt__hover-icon">
      <slot name="hover-icon">→</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  text?: string
  hoverIcon: any
  icon: any
  active?: boolean
  disabled?: boolean
}>()
</script>

<style scoped lang="scss">
.mockup-alt {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --success-color: #10b981;
  --light-bg: #f9fafb;
  --border-color: #e5e7eb;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  border: 2px solid var(--border-color);
  background: linear-gradient(135deg, var(--light-bg) 0%, #ffffff 100%);
  cursor: pointer;
  transition: var(--transition);
  min-height: 140px;
  overflow: hidden;
}

.mockup-alt::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--success-color));
  opacity: 0;
  transition: var(--transition);
}

.mockup-alt:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
}

.mockup-alt:hover::before {
  opacity: 1;
}

.mockup-alt--active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.mockup-alt--active::before {
  opacity: 1;
}

.mockup-alt--disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.mockup-alt--disabled:hover {
  border-color: var(--border-color);
  transform: none;
  box-shadow: none;
}

.mockup-alt--disabled::before {
  opacity: 0;
}

.mockup-alt__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.mockup-alt__title {
  padding-right: 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
}

.mockup-alt__badge {
  font-size: 0.75rem;
  color: var(--success-color);
  font-weight: 600;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  white-space: nowrap;
}

.mockup-alt__content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.mockup-alt__main-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: var(--transition);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  & > * {
    color: white;

    & > * {
      color: white;
    }
  }
}

.mockup-alt:hover .mockup-alt__main-icon {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.mockup-alt__text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.mockup-alt__hover-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: var(--transition);
  color: var(--primary-color);
  font-weight: 600;
}

.mockup-alt:hover .mockup-alt__hover-icon {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 640px) {
  .mockup-alt {
    padding: 1.25rem;
  }

  .mockup-alt__content {
    gap: 0.75rem;
  }

  .mockup-alt__main-icon {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }
}
</style>
