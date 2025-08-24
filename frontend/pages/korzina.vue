<template>
  <h1 class="cart__title">Корзина</h1>
  <div class="cart__body">
    <CartList
      class="cart__list"
      @decreaseQuantity="decreaseQuantity"
      @increaseQuantity="increaseQuantity"
      @removeItem="removeItem"
    />
    <div class="cart__sidebar">
      <div class="cart__summary">
        <span class="cart__summary-title"> В корзине </span>
        <span class="cart__summary-count">
          Количество товаров: {{ cart.cartItems.value.length }}
        </span>
        <ButtonText class="cart__promocode-btn"> Использовать промокод </ButtonText>
        <span class="cart__summary-total">{{ cart.summ.value }} руб.</span>
        <NuxtLink to="/podtverzhdenie-zakaza/">
          <ButtonSolid :disabled="cart.cartItems.value.length === 0" class="cart__action-button">
            Перейти к оформлению
          </ButtonSolid>
        </NuxtLink>
      </div>
      <div class="cart__bonus">
        <div v-if="!auth.isAuthorized.value">
          <span class="cart__bonus-title"> Бонусная программа </span>
          <div class="cart__bonus-block">
            <MdiIcon icon="mdiGift" size="30px" class="cart__bonus-icon" />
            <div class="cart__bonus-info">
              <span class="cart__bonus-title"> Бонусы </span>
              <span class="cart__bonus-count"> + {{ 1000 }} бонусов </span>
            </div>
          </div>
          <span class="cart__bonus-description">
            Зарегистрируйтесь или войдите в свой аккаунт, чтобы получить баллы и скидку по клубной
            цене
          </span>
          <ButtonSolid @click="authorize" variant="outline" class="cart__action-button">
            Получить
          </ButtonSolid>
        </div>
        <div v-else>
          <span style="font-size: 14px"> За товары в корзине </span>
          <div style="margin-bottom: 0" class="cart__bonus-block">
            <MdiIcon icon="mdiGift" size="30px" class="cart__bonus-icon" />
            <div class="cart__bonus-info">
              <span class="cart__bonus-count"> + {{ 1000 }} бонусов </span>
            </div>
          </div>
        </div>
      </div>
      <ButtonSolid variant="outline">Очистить корзину</ButtonSolid>
      <p class="cart__disclaimer">
        Обращаем ваше внимание, что окончательная стоимость и состав заказа будут подтверждены после
        обработки заказа.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginModal } from '~/stores/login-modal'

useInitiateBreadcrumbs([
  { title: 'Главная', to: '/' },
  { title: 'Корзина', to: '/korzina' }
])

const isLoginModalShownState = useLoginModal()
const cart = useCart()
const auth = useAuth()

const removeItem = async (item: CartItem) => {
  await cart.removeItem(item.id)
  await cart.refreshCart()
}

const increaseQuantity = async (item: CartItem) => {
  await cart.editItemQuantity(item.id, item.quantity + 1)
  await cart.refreshCart()
}

const decreaseQuantity = async (item: CartItem) => {
  if (item.quantity === 1) {
    await cart.removeItem(item.id)
  } else {
    await cart.editItemQuantity(item.id, item.quantity - 1)
  }
  await cart.refreshCart()
}

const authorize = () => {
  isLoginModalShownState.value = true
}
</script>

<style lang="scss" scoped>
.cart__disclaimer {
  padding: 20px 40px;
  border: 1px solid $primary_background_color;
  border-radius: $border_radius_normal;
  font-size: 14px;
}

.cart__sidebar {
  width: 25%;
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.cart {
  &__title {
    margin-bottom: $normal_gap;
  }

  &__action-button {
    margin-top: 20px;
    width: 100%;
  }

  &__body {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  &__list {
    flex: 1;
  }

  &__bonus {
    border-radius: $border_radius_normal;
    box-shadow: $box_shadow_flat;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    background-color: rgb(255 248 235);

    &-description {
      margin-top: 10px;
      font-size: 14px;
    }

    &-block {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;

      .cart__bonus-info {
        display: flex;
        flex-direction: column;

        .cart__bonus-title {
          font-size: 16px;
        }

        .cart__bonus-count {
          font-size: 18px;
          font-weight: bold;
          color: $primary_background_color;
        }
      }
    }

    .cart__promocode-btn {
      margin-top: 20px;
      margin-bottom: 20px;
      margin-right: auto;
      color: $primary_background_color;
    }

    &-count {
      font-size: 14px;
    }

    &-title {
      font-size: 24px;
      color: $dark_gray_text_color;
    }

    &-total {
      font-size: 24px;
    }

    &-button {
      margin-top: 20px;
    }
  }

  &__summary {
    background-color: $white_background_color;
    border-radius: $border_radius_normal;
    box-shadow: $box_shadow_flat;
    padding: 2rem;
    display: flex;
    flex-direction: column;

    .cart__promocode-btn {
      margin-top: 20px;
      margin-right: auto;
      color: $primary_background_color;
    }

    &-count {
      font-size: 14px;
    }

    &-title {
      font-size: 24px;
      color: $dark_gray_text_color;
    }

    &-total {
      margin-top: 20px;
      font-size: 24px;
    }

    &-button {
      margin-top: 20px;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: calc(2 * $normal_gap);
    background-color: $white_background_color;
    border-radius: $border_radius_normal;
    box-shadow: $box_shadow_flat;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  &__empty-image {
    margin-bottom: $normal_gap;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
  }

  &__quantity {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    overflow: hidden;
  }

  &__qty-btn {
    background: #f0f0f0;
    border: none;
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #e0e0e0;
    }
  }

  &__qty-value {
    padding: 0 1rem;
    min-width: 2rem;
    text-align: center;
  }

  &__empty-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: calc($normal_gap / 2);
  }

  &__empty-text {
    text-align: center;
  }

  &__recently-viewed {
    margin-top: $normal_gap;
    padding: $normal_gap;
    background-color: $white_background_color;
    border-radius: $border_radius_normal;
    box-shadow: $box_shadow_flat;
  }

  &__recently-viewed-title {
    margin: 0;
  }
}

.cart {
  &__empty {
    text-align: center;
    color: #999;
    padding: 40px 0;
    font-size: 1.1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__button-container {
    display: flex;
    gap: 40px;
    align-items: center;
  }

  &__remove {
    background-color: #ff4d4f;
    color: #fff;
    border: none;
    border-radius: $border_radius_small;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #d9363e;
    }

    &:active {
      background-color: #b9252a;
    }
  }

  &__item-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #333;
  }

  &__item-mockup {
    display: flex;
    align-items: center;

    &-info {
      display: flex;
      flex-direction: column;
      align-items: baseline;
    }
  }

  &__details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1.5rem;
    font-size: 0.95rem;
    color: #444;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
