<script setup lang="ts">

const { notification } = useNotification()
</script>

<template>
  <Notify
    v-if="notification"
    :key="notification?.id"
    :message="notification?.message"
    :type="notification?.type"
    :duration="notification?.duration"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  font-family: 'Inter', sans-serif !important;
  color: #323539;
}
</style>
