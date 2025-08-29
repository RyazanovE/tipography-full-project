<template>
    <div class="subheader">
        <h3 class="title">
            <slot></slot>
        </h3>
        <p v-if="subtitle" class="subtitle">
            {{ subtitle }}
        </p>
    </div>
</template>

<script setup lang="ts">
interface Props {
  subtitle?: string | Element
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.subheader {
    text-align: center;
}

.title {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    text-align: center;
    position: relative;
    padding-bottom: 16px;
    margin-bottom: 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      border-radius: 2px;
    }
}

.subtitle {
    color: #6b7280;
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 16px auto 0;
    font-weight: 400;
}

// Responsive Design
@media (max-width: 768px) {
    .title {
        font-size: 20px;
    }
    
    .subtitle {
        font-size: 1rem;
        margin: 12px auto 0;
    }
}
</style>