<template>
  <div class="progress-bar">
    <div class="progress-bar__line">
      <div 
        class="progress-bar__fill" 
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>
    
    <div class="progress-bar__steps">
      <div 
        v-for="(step, index) in steps" 
        :key="index" 
        class="progress-step"
        :class="getStepClass(index)"
        @click="!disabled && handleStepClick(index)"
      >
        <div class="progress-step__circle">
          <div class="progress-step__number">
            {{ index + 1 }}
          </div>
          <div 
            v-if="index < currentStep" 
            class="progress-step__check"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div class="progress-step__content">
          <h4 class="progress-step__title">{{ step.label }}</h4>
          <p v-if="showDescriptions && step.description" class="progress-step__description">
            {{ step.description }}
          </p>
        </div>

        <!-- <div class="progress-step__hover">
          <slot name="hover-icon">→</slot>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      default: 0,
    },
    showDescriptions: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['step-click'],
  computed: {
    progressPercentage() {
      const totalSteps = this.steps.length;
      const progress = ((this.currentStep) / (totalSteps - 1)) * 100;
      return Math.min(Math.max(progress, 0), 100);
    }
  },
  methods: {
    getStepClass(index) {
      return {
        'progress-step--active': index === this.currentStep,
        'progress-step--completed': index < this.currentStep,
        'progress-step--upcoming': index > this.currentStep,
        'progress-step--disabled': this.disabled
      };
    },
    handleStepClick(index) {
      if (index <= this.currentStep) {
        this.$emit('step-click', index);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.progress-bar {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --success-color: #10b981;
  --light-bg: #f9fafb;
  --border-color: #e5e7eb;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  position: relative;
  margin: 30px 0;
  padding: 0 2rem;
}

.progress-bar__line {
  position: absolute;
  top: 24px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    var(--primary-color) 0%, 
    var(--border-color) 100%
  );
  z-index: 1;
  border-radius: 2px;
}

.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, 
    var(--primary-color) 0%, 
    var(--success-color) 100%
  );
  transition: var(--transition);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.progress-bar__steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: var(--transition);
  padding: 0 1rem;
  min-width: 100px;
}

.progress-step:hover {
  transform: translateY(-2px);
}

.progress-step:hover .progress-step__circle {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2);
}

.progress-step__circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: var(--transition);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, var(--light-bg) 100%);
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.progress-step__number {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-secondary);
  transition: var(--transition);
}

.progress-step__check {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0;
  transition: var(--transition);
}

.progress-step__content {
  text-align: center;
  padding: 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--light-bg) 0%, #ffffff 100%);
  border: 2px solid transparent;
  transition: var(--transition);
  min-width: 120px;
}

.progress-step:hover .progress-step__content {
  border-color: var(--primary-color);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
}

.progress-step__title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.3;
}

.progress-step__description {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
  opacity: 0.8;
}

.progress-step__hover {
  position: absolute;
  top: -8px;
  right: -5px;
  opacity: 0;
  transform: translateX(-10px);
  transition: var(--transition);
  color: var(--primary-color);
  font-weight: 600;
  font-size: 1.2rem;
  background: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 3;
}

.progress-step:hover .progress-step__hover {
  opacity: 1;
  transform: translateX(0);
}

/* Completed state */
.progress-step--completed .progress-step__circle {
  background: linear-gradient(135deg, var(--success-color) 0%, #34d399 100%);
  border-color: var(--success-color);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.progress-step--completed .progress-step__number {
  opacity: 0;
}

.progress-step--completed .progress-step__check {
  opacity: 1;
}

.progress-step--completed .progress-step__content {
  border-color: var(--success-color);
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.progress-step--completed .progress-step__title {
  color: var(--success-color);
}

.progress-step--completed .progress-step__hover {
  color: var(--success-color);
}

/* Active state */
.progress-step--active .progress-step__circle {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  transform: scale(1.1);
}

.progress-step--active .progress-step__number {
  color: white;
}

.progress-step--active .progress-step__content {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.progress-step--active .progress-step__title {
  color: var(--primary-color);
  font-weight: 700;
}

/* Upcoming state */
.progress-step--upcoming .progress-step__circle {
  background: var(--light-bg);
  border-color: var(--border-color);
}

.progress-step--upcoming .progress-step__number {
  color: var(--text-secondary);
  opacity: 0.7;
}

.progress-step--upcoming .progress-step__content {
  opacity: 0.7;
}

/* Disabled state */
.progress-step--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.progress-step--disabled:hover {
  transform: none;
}

.progress-step--disabled:hover .progress-step__circle {
  transform: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.progress-step--disabled:hover .progress-step__content {
  border-color: transparent;
  box-shadow: none;
}

.progress-step--disabled:hover .progress-step__hover {
  opacity: 0;
  transform: translateX(-10px);
}

/* Responsive design */
@media (max-width: 768px) {
  .progress-bar {
    padding: 0 1rem;
    margin: 2rem 0;
  }

  .progress-bar__steps {
    flex-direction: column;
    gap: 1.5rem;
  }

  .progress-bar__line {
    display: none;
  }

  .progress-step {
    flex-direction: row;
    align-items: center;
    min-width: auto;
    padding: 0;
  }

  .progress-step__circle {
    margin-bottom: 0;
    margin-right: 1rem;
    width: 40px;
    height: 40px;
  }

  .progress-step__number {
    font-size: 1rem;
  }

  .progress-step__content {
    text-align: left;
    flex: 1;
    min-width: auto;
    padding: 0.75rem 1rem;
  }

  .progress-step__hover {
    top: 50%;
    right: 0.5rem;
    transform: translate(-10px, -50%);
  }

  .progress-step:hover .progress-step__hover {
    transform: translate(0, -50%);
  }
}

@media (max-width: 480px) {
  .progress-step__circle {
    width: 36px;
    height: 36px;
    margin-right: 0.75rem;
  }

  .progress-step__number {
    font-size: 0.9rem;
  }

  .progress-step__title {
    font-size: 0.9rem;
  }

  .progress-step__description {
    font-size: 0.75rem;
  }

  .progress-step__hover {
    width: 24px;
    height: 24px;
    font-size: 1rem;
  }
}
</style>