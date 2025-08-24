<template>
  <div class="info-block">
    <strong>{{ title }}</strong> –
    <i><slot /></i>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.info-block {
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
