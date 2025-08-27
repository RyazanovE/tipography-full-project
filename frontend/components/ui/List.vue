<template>
  <div>
    <h3 class="tab-content__header">{{ title }}</h3>
    <ul>
      <li v-for="(item, idx) in listItems" :key="idx">
        <p class="tab-content__text">
          {{ item }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; listItems: string[] }>()
</script>

<style lang="scss" scoped>
.tab-content {
  &__header {
    font-size: 22px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    }
  }

  &__text {
    font-size: 16px;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 20px;
    padding-left: 20px;
    position: relative;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #3b82f6;
      font-weight: bold;
    }
  }
}

.tab-content__header {
  font-size: 20px;
}
</style>
