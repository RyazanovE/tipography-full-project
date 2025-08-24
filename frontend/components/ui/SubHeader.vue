<template>
    <h3 class="title">
        <slot></slot>
    </h3>

</template>

<style scoped lang="scss">
.title {
  margin-bottom: 32px;
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    text-align: center;
    position: relative;
    padding-bottom: 16px;

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

</style>