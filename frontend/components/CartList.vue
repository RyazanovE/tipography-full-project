<template>
  <div v-if="cart.cartItems.value.length === 0 && !readonly" class="cart-empty">
    <img style="margin: 0 auto" height="200" src="/images/cart_empty.png" />
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
          <img
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
        <!-- Toggle button for readonly mode -->
        <div v-if="readonly" class="cart-item__toggle">
          <ButtonText 
            :title="showDetails ? 'Скрыть детали' : 'Показать детали'"
            @click="toggleDetails"
          >
            <MdiIcon 
              :icon="showDetails ? 'mdiChevronUp' : 'mdiChevronDown'" 
              size="20px" 
            />
          </ButtonText>
        </div>
      </div>

      <!-- Details section - always visible in non-readonly mode, toggleable in readonly mode -->
      <div 
        v-if="!readonly || showDetails" 
        class="cart-item__details"
        :class="{ 'cart-item__details--collapsed': readonly && !showDetails }"
      >
        <div v-for="(value, key) in detailMap(item.options)" :key="key" class="detail-row">
          <span>{{ key }}</span>
          <span>{{ value }}</span>
        </div>
        <div v-if="item.fileNames?.length" class="detail-row">
          <span >Макеты</span>
          <div class="mockups">
            <a
              v-for="file in item.fileNames"
              :key="file"
              :href="getFileUrl(file)"
              target="_blank"
              class="mockup-link"
            >
              <img height="40" :src="getImgUrl(file)" />
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
const showDetails = ref(false)

onMounted(() => cart.refreshCart())

const nuxtConfig = useRuntimeConfig()

const getImgUrl = (fileName?: string) => {
  if (!fileName) return null
  return fileName.endsWith('.pdf') ? '/images/formats/pdf-colored.png' : getFileUrl(fileName)
}

const getFileUrl = (fileName: string) => {
  return nuxtConfig.public.API_BASE_URL + '/uploads/' + fileName
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
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
  
  /* When component is in a narrow container (like sidebar) */
  @media (max-width: 400px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  &__top {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    
    /* Responsive adjustments for smaller screens */
    @media (max-width: 768px) {
      gap: 0.75rem;
    }
    
    @media (max-width: 480px) {
      gap: 0.5rem;
    }
    
    /* When component is in a narrow container */
    @media (max-width: 400px) {
      gap: 0.5rem;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__image {
    flex-shrink: 0;
    border: 1px solid $primary_border_color;
    border-radius: $border_radius_small;
    overflow: hidden;
    
    /* Responsive image sizing */
    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
      
      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
      }
    }
    
    @media (max-width: 480px) {
      width: 50px;
      height: 50px;
      
      img {
        width: 50px;
        height: 50px;
      }
    }
    
    /* When component is in a narrow container */
    @media (max-width: 400px) {
      width: 45px;
      height: 45px;
      
      img {
        width: 45px;
        height: 45px;
      }
    }
  }

  &__info {
    flex: 1;
    min-width: 0; /* Prevents flex item from overflowing */
    
    h3 {
      margin: 0;
      font-size: $font_size_large;
      color: $dark_gray_text_color;
      word-wrap: break-word;
      overflow-wrap: break-word;
      
      @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.3;
      }
      
      @media (max-width: 480px) {
        font-size: 0.9rem;
      }
      
      /* When component is in a narrow container */
      @media (max-width: 400px) {
        font-size: 0.85rem;
        line-height: 1.2;
      }
    }
    
    .cart-item__date {
      font-size: $font_size_small;
      color: $light_gray_text_color;
      
      @media (max-width: 480px) {
        font-size: 0.75rem;
      }
      
      /* When component is in a narrow container */
      @media (max-width: 400px) {
        font-size: 0.7rem;
      }
    }
    
    .cart-item__price {
      font-size: 1.1rem;
      font-weight: bold;
      margin-top: 0.3rem;
      
      @media (max-width: 768px) {
        font-size: 1rem;
        margin-top: 0.2rem;
      }
      
      @media (max-width: 480px) {
        font-size: 0.9rem;
      }
      
      /* When component is in a narrow container */
      @media (max-width: 400px) {
        font-size: 0.85rem;
        margin-top: 0.15rem;
      }
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
    
    button {
      background: $secondary-bg;
      padding: 0.3rem 0.8rem;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: $border_radius_small;
      min-width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: $secondary-hover-bg;
      }
      
      @media (max-width: 768px) {
        padding: 0.25rem 0.6rem;
        font-size: 1rem;
        min-width: 28px;
        height: 28px;
      }
      
      @media (max-width: 480px) {
        padding: 0.2rem 0.5rem;
        font-size: 0.9rem;
        min-width: 24px;
        height: 24px;
      }
      
      /* When component is in a narrow container */
      @media (max-width: 400px) {
        padding: 0.15rem 0.4rem;
        font-size: 0.8rem;
        min-width: 22px;
        height: 22px;
      }
    }
    
    span {
      padding: 0 0.8rem;
      min-width: 20px;
      text-align: center;
      
      @media (max-width: 768px) {
        padding: 0 0.6rem;
        font-size: 0.9rem;
      }
      
      @media (max-width: 480px) {
        padding: 0 0.4rem;
        font-size: 0.8rem;
      }
      
      /* When component is in a narrow container */
      @media (max-width: 400px) {
        padding: 0 0.3rem;
        font-size: 0.75rem;
      }
    }
  }

  &__toggle {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    button {
      padding: 0.5rem;
      border-radius: $border_radius_small;
      color: $light_gray_text_color;
      transition: all 0.2s ease;
      min-width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: $secondary-bg;
        color: $dark_gray_text_color;
      }
      
      @media (max-width: 768px) {
        padding: 0.4rem;
        min-width: 28px;
        height: 28px;
      }
      
      @media (max-width: 480px) {
        padding: 0.3rem;
        min-width: 24px;
        height: 24px;
      }
    }
  }

  &__details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem 1rem;
    font-size: $font_size_normal;
    transition: all 0.3s ease;
    
         .detail-row {
       display: flex;
       gap: 10px;
       flex-wrap: wrap;
       justify-content: space-between;
       border-bottom: 1px dashed $primary_border_color;
       padding-bottom: 0.2rem;
       word-wrap: break-word;
       overflow-wrap: break-word;

       span:first-child {
         font-weight: 600;
         color: $dark_gray_text_color;
         min-width: 80px;
         flex-shrink: 0;
       }
       
       span:last-child {
         color: $light_gray_text_color;
         flex: 1;
       }
     }

    &--collapsed {
      display: none;
    }
    
    /* Responsive grid adjustments */
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 0.3rem 0.5rem;
      font-size: 0.9rem; 
    }
    
    @media (max-width: 480px) {
      font-size: 0.8rem;
      gap: 0.2rem 0.3rem;
      
      .detail-row {
        flex-direction: column;
        gap: 0.1rem;
        
        span:first-child {
          font-weight: 600;
          color: $dark_gray_text_color;
        }
        
        span:last-child {
          color: $light_gray_text_color;
        }
      }
    }
    
    /* When component is in a narrow container */
    @media (max-width: 400px) {
      font-size: 0.75rem;
      gap: 0.15rem 0.25rem;
      
      .detail-row {
        padding-bottom: 0.15rem;
        
        span:first-child {
          font-size: 0.7rem;
        }
        
        span:last-child {
          font-size: 0.7rem;
        }
      }
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
      
      @media (max-width: 768px) {
        padding: 0.3rem 0.8rem;
        font-size: 0.9rem;
      }
      
      @media (max-width: 480px) {
        padding: 0.25rem 0.6rem;
        font-size: 0.8rem;
      }
    }
  }
  
  /* Overall responsive adjustments */
  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.5rem;
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
    text-decoration: none;
    color: inherit;
    
    &:hover {
      background: $secondary-hover-bg;
    }
    
    img {
      border-radius: 2px;
    }
    
    @media (max-width: 768px) {
      padding: 0.15rem 0.3rem;
      gap: 0.2rem;
      font-size: 0.8rem;
      
      img {
        height: 30px;
      }
    }
    
    @media (max-width: 480px) {
      padding: 0.1rem 0.25rem;
      gap: 0.15rem;
      font-size: 0.75rem;
      
      img {
        height: 25px;
      }
    }
    
    /* When component is in a narrow container */
    @media (max-width: 400px) {
      padding: 0.08rem 0.2rem;
      gap: 0.1rem;
      font-size: 0.7rem;
      
      img {
        height: 20px;
      }
    }
  }
}
</style>
