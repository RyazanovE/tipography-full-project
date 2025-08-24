<template>
  <div v-if="cart.cartItems.value.length === 0 && !readonly" class="cart-empty">
    <nuxt-img style="margin: 0 auto" height="200" src="./images/cart_empty.png" />
    <h2>Пока пусто</h2>
    <p>
      Воспользуйтесь <ButtonLink>каталогом</ButtonLink> или поиском<br />
      Если у вас были товары в корзине — <ButtonLink>войдите</ButtonLink> в профиль
    </p>
  </div>

  <div v-else class="cart-list">
    <UiCard v-for="item in cart.cartItems.value" :key="item.id" class="cart-item">
      <div class="cart-item__top">
        <div class="cart-item__image">
          <NuxtImg
            height="80"
            width="80"
            :src="getImgUrl(item.fileNames?.[0]) || '/images/formats/pdf-colored.png'"
          />
        </div>
        <div class="cart-item__info">
          <h3>{{ item.type }}</h3>
          <span class="cart-item__date">{{
            new Date(item.options.timestamp).toLocaleString()
          }}</span>
          <div class="cart-item__price">{{ item.options.summ }} ₽</div>
        </div>
        <div v-if="!readonly" class="cart-item__controls">
          <button title='Убрать' @click="$emit('decreaseQuantity', item)">−</button>
          <span>{{ item.quantity ?? 0 }}</span>
          <button title='Добавить' @click="$emit('increaseQuantity', item)">+</button>
        </div>
        <div v-if="!readonly" class="cart-item__bottom">
          <ButtonText title='Удалить' @click="$emit('removeItem', item)">
            <MdiIcon class="cart-item__bottom-icon" icon="mdiDelete" size="30px" />
          </ButtonText>
        </div>
      </div>

      <div class="cart-item__details">
        <div v-for="(value, key) in detailMap(item.options)" :key="key" class="detail-row">
          <span>{{ key }}</span>
          <span>{{ value }}</span>
        </div>
        <div v-if="item.fileNames?.length" class="detail-row">
          <span>Макеты</span>
          <div class="mockups">
            <a
              v-for="file in item.fileNames"
              :key="file"
              :href="getFileUrl(file)"
              target="_blank"
              class="mockup-link"
            >
              <NuxtImg height="40" :src="getImgUrl(file)" />
              <ButtonText>Посмотреть</ButtonText>
            </a>
          </div>
        </div>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
defineProps<{ readonly?: boolean }>()

const cart = useCart()

onMounted(() => cart.refreshCart())

const nuxtConfig = useRuntimeConfig()

const getImgUrl = (fileName?: string) => {
  if (!fileName) return null
  return fileName.endsWith('.pdf') ? '/images/formats/pdf-colored.png' : getFileUrl(fileName)
}

const getFileUrl = (fileName: string) => {
  return nuxtConfig.public.API_BASE_URL + '/uploads/' + fileName
}

const detailMap = (options: any) => ({
  Цвет: options.color,
  Размер: options.size,
  Формат: options.format,
  Материал: options.material,
  'Тип печати': options.printType,
  Ламинация: options.lamination,
  Скругления: options.corners ? 'Да' : 'Нет',
  Дырокол: options.holes ? 'Да' : 'Нет',
  Тираж: options.amount,
  Дизайн: options.designType,
  'Срок изготовления': options.productionTime
})
</script>

<style scoped lang="scss">
.cart-empty {
  text-align: center;
  padding: 2rem;
  background: $white_background_color;
  border-radius: $border_radius_normal;
  box-shadow: $box_shadow_flat;
  h2 {
    font-size: 1.5rem;
    margin-top: 1rem;
    color: $dark_gray_text_color;
  }
  p {
    margin-top: 0.5rem;
    color: $light_gray_text_color;
  }
}

.cart-item__bottom-icon {
  & > * {
    fill: rgb(203, 16, 16);
  }
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  padding: 1rem;
  border-radius: $border_radius_normal;
  box-shadow: $box_shadow_normal;
  background: $white_background_color;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__top {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__image {
    flex-shrink: 0;
    border: 1px solid $primary_border_color;
    border-radius: $border_radius_small;
    overflow: hidden;
  }

  &__info {
    flex: 1;
    h3 {
      margin: 0;
      font-size: $font_size_large;
      color: $dark_gray_text_color;
    }
    .cart-item__date {
      font-size: $font_size_small;
      color: $light_gray_text_color;
    }
    .cart-item__price {
      font-size: 1.1rem;
      font-weight: bold;
      margin-top: 0.3rem;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    overflow: hidden;
    button {
      background: $secondary-bg;
      padding: 0.3rem 0.8rem;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: $border_radius_small;
      &:hover {
        background: $secondary-hover-bg;
      }
    }
    span {
      padding: 0 0.8rem;
    }
  }

  &__details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem 1rem;
    font-size: $font_size_normal;
    .detail-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed $primary_border_color;
      padding-bottom: 0.2rem;
    }
  }

  &__bottom {
    display: flex;
    justify-content: flex-end;
    .remove-btn {
      background: #ff4d4f;
      color: $white-color;
      border: none;
      padding: 0.4rem 1rem;
      border-radius: $border_radius_small;
      cursor: pointer;
      &:hover {
        background: darken(#ff4d4f, 5%);
      }
    }
  }
}

.mockups {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  .mockup-link {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.4rem;
    border: 1px solid $primary_border_color;
    border-radius: $border_radius_small;
    background: $secondary-bg;
    &:hover {
      background: $secondary-hover-bg;
    }
  }
}
</style>
