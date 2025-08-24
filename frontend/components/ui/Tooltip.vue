<template>
  <div class="tooltip">
    <MdiIcon 
      icon="mdiHelpCircleOutline" 
      size="18px" 
      class="tooltip__icon" 
    />
    <div class="tooltip__content">
      <div class="tooltip__arrow"></div>
      <div class="tooltip__inner">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
  
  &__icon {
    color: #6b7280;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      color: #3b82f6;
      transform: scale(1.1);
    }
  }

  &__content {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    min-width: 200px;
    max-width: 280px;
    pointer-events: none;
  }

  &__arrow {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
    transform-origin: center;
  }

  &__inner {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
    box-shadow: 
      0 10px 25px rgba(99, 102, 241, 0.15),
      0 5px 10px rgba(99, 102, 241, 0.1);
    backdrop-filter: blur(10px);
    white-space: normal;
    text-align: center;
  }

  // Показ при наведении
  &:hover &__content {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }

  // Анимация появления
  &:hover &__arrow {
    animation: tooltipBounce 0.6s ease;
  }

  // Варианты позиционирования
  &--right {
    .tooltip__content {
      bottom: 50%;
      left: calc(100% + 12px);
      transform: translateY(50%) translateX(-8px);
    }
    
    .tooltip__arrow {
      bottom: 50%;
      left: -6px;
      transform: translateY(50%) rotate(-90deg);
      clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
    }
    
    &:hover .tooltip__content {
      transform: translateY(50%) translateX(0);
    }
  }

  &--left {
    .tooltip__content {
      bottom: 50%;
      right: calc(100% + 12px);
      left: auto;
      transform: translateY(50%) translateX(8px);
    }
    
    .tooltip__arrow {
      bottom: 50%;
      right: -6px;
      left: auto;
      transform: translateY(50%) rotate(90deg);
      clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
    }
    
    &:hover .tooltip__content {
      transform: translateY(50%) translateX(0);
    }
  }

  &--bottom {
    .tooltip__content {
      top: calc(100% + 12px);
      bottom: auto;
      transform: translateX(-50%) translateY(-8px);
    }
    
    .tooltip__arrow {
      top: -6px;
      bottom: auto;
      transform: translateX(-50%) rotate(180deg);
    }
    
    &:hover .tooltip__content {
      transform: translateX(-50%) translateY(0);
    }
  }
}

// Анимация стрелки
@keyframes tooltipBounce {
  0% {
    transform: translateX(-50%) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) scale(1.1);
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}

.tooltip--right .tooltip__arrow {
  animation-name: tooltipBounceRight;
}

@keyframes tooltipBounceRight {
  0% {
    transform: translateY(50%) rotate(-90deg) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateY(50%) rotate(-90deg) scale(1.1);
  }
  100% {
    transform: translateY(50%) rotate(-90deg) scale(1);
    opacity: 1;
  }
}

.tooltip--left .tooltip__arrow {
  animation-name: tooltipBounceLeft;
}

@keyframes tooltipBounceLeft {
  0% {
    transform: translateY(50%) rotate(90deg) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateY(50%) rotate(90deg) scale(1.1);
  }
  100% {
    transform: translateY(50%) rotate(90deg) scale(1);
    opacity: 1;
  }
}

.tooltip--bottom .tooltip__arrow {
  animation-name: tooltipBounceBottom;
}

@keyframes tooltipBounceBottom {
  0% {
    transform: translateX(-50%) rotate(180deg) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) rotate(180deg) scale(1.1);
  }
  100% {
    transform: translateX(-50%) rotate(180deg) scale(1);
    opacity: 1;
  }
}

// Адаптивность
@media (max-width: 768px) {
  .tooltip {
    &__inner {
      font-size: 13px;
      padding: 10px 14px;
      max-width: 240px;
    }
    
    &__content {
      min-width: 160px;
    }
  }
}

// Темная тема
@media (prefers-color-scheme: dark) {
  .tooltip {
    &__icon {
      color: #9ca3af;
      
      &:hover {
        color: #60a5fa;
      }
    }
    
    &__inner {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      box-shadow: 
        0 10px 25px rgba(79, 70, 229, 0.2),
        0 5px 10px rgba(79, 70, 229, 0.15);
    }
    
    &__arrow {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
    }
  }
}
</style>