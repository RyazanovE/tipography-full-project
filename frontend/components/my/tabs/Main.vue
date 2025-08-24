<template>
  <div v-if="!auth.user.value" class="unauthorized">
    <h2 class="unauthorized__title">Войдите или зарегистрируйтесь</h2>
    <div class="unauthorized__description">
      <span class="unauthorized__description-title">Чтобы иметь возможность:</span>
      <ul class="unauthorized__description-list">
        <li class="unauthorized__description-item">Следить за статусом заказа</li>
        <li class="unauthorized__description-item">Изменять способ оплаты и получения</li>
        <li class="unauthorized__description-item">Просматривать историю заказов</li>
        <li class="unauthorized__description-item">Получать персональные скидки и предложения</li>
        <li class="unauthorized__description-item">
          Сохранять и переиспользовать загруженные макеты
        </li>
      </ul>
    </div>
    <ButtonSolid @click="isLoginModalShownState = true"> Войти или зарегистрироваться </ButtonSolid>
  </div>
  <div :class="{ 'help__margin-top': !auth.user.value }" class="help">
    <h3 class="help__title">Сервис и помощь</h3>
    <div class="help__buttons">
      <ButtonSolid variant="secondary">Как оформить заказ</ButtonSolid>
      <ButtonSolid variant="secondary">Способы оплаты</ButtonSolid>
      <ButtonSolid variant="secondary">Виды и сроки доставки</ButtonSolid>
      <ButtonSolid variant="secondary">Контакты</ButtonSolid>
    </div>

    <h3 class="help__title">Оставить отзыв и получить скидку</h3>
    <div class="help__description">
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px">
        <MdiIcon icon="mdiCommentText" size="20px" class="chevron-icon" />
        Оставить отзыв на Яндекс картах и получить <strong>скидку 10%</strong> на первый заказ;
      </div>
      <ButtonSolid>Оставить отзыв</ButtonSolid>
    </div>

    <template v-if="auth.user.value">
      <h3 class="help__title">Мои данные</h3>
      <div class="my_data">
        <div class="my_data__card">
          <span class="my_data__card-title"> Баллы и бонусы </span>
          <div class="my_data__card-value-container">
            <MdiIcon icon="mdiGift" size="20px" class="chevron-icon" />
            <span class="my_data__card-value">
              {{ 5400 }}
            </span>
          </div>
        </div>
        <div class="my_data__card">
          <span class="my_data__card-title"> Всего заказов </span>
          <div class="my_data__card-value-container">
            <MdiIcon icon="mdiContentPaste" size="20px" class="chevron-icon" />
            <span class="my_data__card-value">
              {{ 12 }}
            </span>
          </div>
        </div>
        <div class="my_data__card">
          <span class="my_data__card-title"> Всего сохраненных макетов</span>
          <div class="my_data__card-value-container">
            <MdiIcon icon="mdiFile" size="20px" class="chevron-icon" />
            <span class="my_data__card-value">
              {{ 2 }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useLoginModal } from '~/stores/login-modal'

const isLoginModalShownState = useLoginModal()

const auth = useAuth()
</script>

<style scoped lang="scss">
.unauthorized {
  display: flex;
  flex-direction: column;
  gap: $normal_gap;
  align-items: flex-start;

  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: $normal_gap;

    &-title {
      font-weight: bold;
    }

    &-list {
      list-style-type: disc;
      margin-left: $normal_gap;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &-item {
      font-size: 14px;
      color: #555;
    }
  }
}

.help {
  &__margin-top {
    margin-top: calc(2 * $normal_gap);
  }

  &__description {
    margin-bottom: calc(2 * $normal_gap);
  }

  &__title {
    margin-bottom: $normal_gap;
    font-weight: bold;
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: $normal_gap;
    margin-bottom: calc(2 * $normal_gap);
  }

  .my_data {
    display: flex;
    gap: $normal_gap;

    &__card-value-container {
      display: flex;
      align-items: center;
      gap: calc($normal_gap/2);
    }

    &__card {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: $box_shadow_flat;
      padding: $normal_gap;
      border: 1px solid #ccc;
      gap: calc($normal_gap/2);
      border-radius: 8px;

      &-title {
        font-size: 14px;
      }

      &-value {
        font-weight: bold;
      }
    }
  }
}
</style>
