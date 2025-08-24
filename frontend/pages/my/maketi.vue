<template>
  <MyWrapper>
    <div class="saved-designs">
      <!-- Верхние кнопки управления -->
      <div class="saved-designs__header">
        <div class="saved-designs__actions">
          <input style="display: none" ref="fileInput" type="file" @change="onFileChange" />
          <ButtonSolid
            @click="$refs.fileInput.click()"
            variant="secondary"
            class="saved-designs__button"
          >
            Добавить макет
          </ButtonSolid>
          <ButtonSolid variant="secondary" class="saved-designs__button">
            Удалить выбранные
          </ButtonSolid>
        </div>
      </div>

      <!-- Сетка макетов -->
      <div class="saved-designs__grid">
        <div v-for="(mockup, i) in mockups" :key="mockup" class="saved-designs__card">
          <UiCheckbox class="saved-designs__checkbox" />
          <div class="saved-designs__image"></div>

          <div class="saved-designs__info">
            <div>
              <span>Дата загрузки: 01.01.2023</span>
            </div>
            <div class="saved-designs__filename-container">
              <span class="saved-designs__filename">{{ mockup.split('-')[1] }}.pdf</span>
              <a :href="getFileUrl(mockup)" target="_blank" download class="saved-designs__download"
                >Скачать</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </MyWrapper>
</template>

<script setup lang="ts">
import MyWrapper from '~/components/MyWrapper.vue'

useInitiateBreadcrumbs([
  ...breadcrumbsDefaultValue,
  {
    title: 'Сохраненные макеты',
    to: '/my/maketi'
  }
])

const ordersApi = useOrders()

const mockups = ref<string[]>([])
const nuxtConfig = useRuntimeConfig()

onMounted(async () => {
  mockups.value = (await ordersApi.getMockups()).data as unknown as string[]
})

const getFileUrl = (fileName: string) => {
  return nuxtConfig.public.API_BASE_URL + '/uploads/' + fileName
}

const onFileChange = () => {}
</script>

<style scoped lang="scss">
.saved-designs {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $normal_gap;
  }

  &__title {
    font-weight: 600;
  }

  &__actions {
    display: flex;
    gap: 16px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: $normal_gap;
  }

  &__card {
    position: relative;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: $box_shadow_flat;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    &:hover .saved-designs__checkbox {
      opacity: 1;
    }
  }

  &__checkbox {
    position: absolute;
    top: 8px;
    left: 8px;
    transition: opacity 0.3s;
    z-index: 10;
    cursor: pointer;
  }

  &__image {
    width: 100%;
    height: 180px;
    background-image: url('/images/formats/pdf-colored.png');
    background-size: 200px;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__info {
    background: $light_gray_background_color;
    padding: calc($normal_gap / 2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: $font_size_normal;
  }

  &__filename-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__filename {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px;
  }

  &__download {
    color: $primary_background_color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
