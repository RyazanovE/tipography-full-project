<script setup lang="ts">
const searchQuery = ref('')
const isFocused = ref(false)

const pages = [
  {
    title: 'Печать визиток',
    to: '/pechat-vizitok',
    category: 'Визитки'
  },
  {
    title: 'Печать листовок и флаеров',
    to: '/pechat-listovok-i-flaerov',
    category: 'Магазины'
  },
  {
    title: 'Печать баннеров',
    to: '/kontakti',
    category: 'Баннеры'
  }
]

const filteredPages = computed(() => {
  return pages.filter((page) => page.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || page.category.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>

<template>
  <div class="search">
    <input v-model="searchQuery" class="search__input" placeholder="Поиск по сайту" @focus="isFocused = true" @blur="isFocused = false" />
    <ButtonIcon icon="mdiMagnify" class="search__button" />
    <div v-if="searchQuery && filteredPages.length && isFocused" class="search__results">
      <div v-for="page in filteredPages" :key="page.title" class="search__result">
        <NuxtLink class="search__link" :to="page.to">
          <span class="search__category">{{ page.category }}</span>
          <MdiIcon icon="mdiPanRight" size="20" /> {{ page.title }}
        </NuxtLink>
      </div>
    </div>
    <div v-else-if="searchQuery && !filteredPages.length && isFocused" class="search__results">
      Ничего не найдено
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  height: 64px;
  background-color: $light_gray_background_color;
  border-radius: $border_radius_small;
  transition: $all-transition;
  z-index: 4;

  &:hover {
    background-color: $white_background_color;
    box-shadow: $box_shadow_normal;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: calc($normal-gap/2);
  }

  &__category {
    font-style: italic;
    font-size: 14px;
    color: $light_gray_text_color;
  }

  &__results {
    position: absolute;
    padding: $normal-gap;
    top: 100%;
    left: 0;
    right: 0;
    background-color: $white_background_color;
    box-shadow: $box_shadow_normal;
    border-radius: $border_radius_small;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: $normal-gap;

    animation: fadeIn 0.2s ease-in-out;
  }

  &__result {
    padding: 0.5rem;
    border-radius: $border_radius_small;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
      background-color: $light_gray_background_color;
    }

    a {
      color: $dark_gray_text_color;
      text-decoration: none;
      font-weight: 500;
    }
  }

  &__empty {
    color: $dark_gray_text_color;
    text-align: center;
    font-size: 0.875rem;
    padding: 0.5rem 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__input {
    height: 100%;
    width: 100%;

    font-size: 0.875rem;
    padding: 0 $normal_gap;

    &::placeholder {
      color: $dark_gray_text_color;
    }
  }

  &__button {
    position: absolute;
    right: calc($normal_gap / 2);
  }
}
</style>
