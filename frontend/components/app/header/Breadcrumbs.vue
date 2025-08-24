<script setup lang='ts'>
  defineProps<{
    breadcrumbs: {
      title: string;
      to: string;
    }[]
  }>()
</script>

<template>
  <div v-show='breadcrumbs.length > 0' class='breadcrumbs'>
    <div class='breadcrumbs__crumb' v-for='(crumb, i) in breadcrumbs' :key='i'>
      <nuxt-link  :to='crumb.to'>
        <ButtonText>
          {{ crumb.title }}
        </ButtonText>
      </nuxt-link>
      <span v-if='i < breadcrumbs.length - 1'>
        /
      </span>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.breadcrumbs {
  display: flex;
  width: $app_width;
  margin: 0 auto;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;

  &__crumb {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
</style>