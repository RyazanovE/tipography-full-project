<script setup lang="ts">
const categoryList = [
  {
    title: 'Печать документов и чертежей',
    icon: 'mdiPrinterPos',
    article: {
      title: 'Виды документов и форматы файлов для печати',
      to: '/'
    },
    subcategories: [
      {
        title: 'Печать в копицентре',
        links: [
          {
            title: 'Печать в документов',
            to: '/'
          },
          {
            title: 'Печать чертежей',
            to: '/'
          },
          {
            title: 'Печать плакатов',
            to: '/'
          }
        ]
      },
      {
        title: 'Копирование',
        links: [
          {
            title: 'Копирование документов',
            to: '/'
          },
          {
            title: 'Копирование чертежей',
            to: '/'
          },
          {
            title: 'Копирование проектной документации',
            to: '/'
          },
          {
            title: 'Копирование больших чертежей',
            to: '/'
          },
          {
            title: 'Копирование больших документов',
            to: '/'
          }
        ]
      }
    ]
  },
  {
    title: 'Печать фото',
    icon: 'mdiImage',
    article: {
      title: 'Форматы и виды фотопечати',
      to: '/'
    },
    subcategories: [
      {
        title: 'Печать фотографий малого размера',
        links: [
          {
            title: 'Печать фотографий 10x15',
            to: '/'
          },
          {
            title: 'Печать фотографий 15x20',
            to: '/'
          },
          {
            title: 'Печать фотографий 20x30',
            to: '/'
          }
        ]
      },
      {
        title: 'Печать фотографий большого размера',
        links: [
          {
            title: 'Печать фотографий А0',
            to: '/'
          },
          {
            title: 'Печать фотографий А1',
            to: '/'
          },
          {
            title: 'Печать фотографий А2',
            to: '/'
          },
          {
            title: 'Печать фотографий А3',
            to: '/'
          },
          {
            title: 'Печать фотографий А4',
            to: '/'
          }
        ]
      }
    ]
  },
  {
    title: 'Визитки',
    icon: 'mdiCardAccountDetails',
    article: {
      title: 'Все о печати визиток',
      to: '/'
    },
    subcategories: [
      {
        title: 'Стандартные ',
        links: [
          {
            title: 'Печать фотографий А0',
            to: '/'
          },
          {
            title: 'Печать фотографий А1',
            to: '/'
          },
          {
            title: 'Печать фотографий А2',
            to: '/'
          },
          {
            title: 'Печать фотографий А3',
            to: '/'
          },
          {
            title: 'Печать фотографий А4',
            to: '/'
          }
        ]
      }
    ]
  },
  {
    title: 'Наклейки',
    icon: 'mdiStickerEmoji'
  },
  {
    title: 'Этикетки',
    icon: 'mdiStickerText'
  },
  {
    title: 'Брошюры',
    icon: 'mdiBookOpenVariant'
  },
  {
    title: 'Широкоформатная печать',
    icon: 'mdiPrinter'
  }
]

const selectedCategoryIdx = ref(0)

defineProps<{ catalogOffset: number; isShown: boolean }>()
</script>

<template>
  <transition name="catalog-fade">
    <div v-if="isShown" :style="{ top: `${catalogOffset}px` }" class="catalog">
      <div class="catalog__container">
        <ul class="catalog-list">
          <li
            class="catalog-list__category"
            v-for="(category, idx) in categoryList"
            :key="category.title"
          >
            <ButtonIcon
              :class="{ 'category-btn_active': selectedCategoryIdx === idx }"
              :active="selectedCategoryIdx === idx"
              row
              icon-active-color-change
              class="category-btn"
              :icon="category.icon"
              @mouseenter="selectedCategoryIdx = idx"
            >
              {{ category.title }}
            </ButtonIcon>
          </li>
        </ul>
        <div class="catalog-subcategories">
          <div v-if="categoryList[selectedCategoryIdx].article" class="catalog-article">
            <h3 class="catalog-article__title">
              {{ categoryList[selectedCategoryIdx].article!.title }}
            </h3>
            <ButtonText class="catalog-article__button" variant="secondary"> Подробнее </ButtonText>
          </div>
          <div
            v-for="(subcategory, idx) in categoryList[selectedCategoryIdx].subcategories"
            class="catalog-subcategory"
          >
            <h3>
              {{ subcategory.title }}
            </h3>
            <ul>
              <li v-for="link in subcategory.links" class="catalog-subcategory__link">
                <ButtonText :to="link.to">
                  {{ link.title }}
                </ButtonText>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="catalog-background-fade-in">
    <Teleport v-if="isShown" to="body">
      <div class="catalog-background-shadow" @click="$emit('close')" />
    </Teleport>
  </transition>
</template>

<style lang="scss" scoped>
.catalog-background-fade-in-enter-active {
  transition: opacity 0.6s ease-in;
}
.catalog-background-fade-in-enter-from {
  opacity: 0;
}
.catalog-background-fade-in-enter-to {
  opacity: 1;
}
.catalog-background-fade-in-leave-active,
.catalog-background-fade-in-leave-from,
.catalog-background-fade-in-leave-to {
  transition: none;
  opacity: 0;
}

.catalog-fade-enter-active,
.catalog-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.catalog-fade-enter-from,
.catalog-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.catalog-subcategories {
  display: flex;
  flex-direction: column;
  gap: $normal_gap;

  .catalog-article {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: $normal_gap;
    justify-content: space-between;
    background-color: $light_gray_background_color;
    padding: $normal_gap;
    border-radius: $border_radius_normal;

    &__title {
      font-size: $font_size_large;
      font-weight: bold;
    }

    &__button {
      font-size: $font_size_normal;
    }
  }
}

.catalog-background-shadow {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 150px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.catalog {
  position: fixed;
  background-color: $white_background_color;
  z-index: 999;
  left: 0;
  padding: $normal_gap;
  width: 100%;

  border-top: 1px solid $light_gray_background_color;

  &__container {
    max-width: $app_width;
    margin: 0 auto;

    display: grid;
    grid-template-columns: 3fr 9fr;
    gap: $normal_gap;
  }

  &-list {
    display: flex;
    flex-direction: column;

    .category-btn {
      width: 100%;
      gap: calc($normal_gap/2);

      &:hover {
        color: $primary_background_color;
      }

      &_active {
        color: $primary_background_color;
      }
    }
  }
}
</style>
