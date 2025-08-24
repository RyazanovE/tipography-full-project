<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'

const auth = useAuth()
const breadcrumbs = useBreadcrumbs()

onMounted(async () => {
  if (!auth.isAuthorized.value) {
    await auth.fetchUser()
  }
})
</script>

<template>
  <AppHeader />

  <transition
    name="notify"
    enter-active-class="notify-enter-active"
    leave-active-class="notify-leave-active"
  >

  </transition>

  <main class="main">
    <div class="background-wrapper">
      <div class="width-container">
        <AppHeaderBreadcrumbs :breadcrumbs />
        <slot />
      </div>
    </div>
  </main>

  <AppFooter />
</template>

<style scoped lang="scss">
.background-wrapper {
  background-color: $light_gray_background_color;
  padding: $normal_gap 0;

  .width-container {
    width: $app_width;
    margin: 0 auto;
    min-height: calc(100vh - 167px - 449.6px);
  }
}

.notifications-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.notify-enter-active {
  animation: slide-in 0.3s ease-out;
}

.notify-leave-active {
  animation: slide-out 0.3s ease-out;
}

@keyframes slide-in {
  from {
    transform: translate(-50%, -100%); /* X и Y вместе */
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0); /* X остается, Y меняется */
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translate(-50%, 0); /* X остается, Y = 0 */
    opacity: 1;
  }
  to {
    transform: translate(-50%, -100%); /* X остается, Y уезжает вверх */
    opacity: 0;
  }
}
</style>
