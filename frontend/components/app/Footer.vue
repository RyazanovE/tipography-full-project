<script lang="ts" setup>
import { companyShortName } from '~/assets/constants/global'

const categories = {
  Компания: [
    { text: 'О нас', link: '/' },
    { text: 'Партнерам', link: '/' },
    { text: 'Вакансии', link: '/' },
    { text: 'Контакты', link: '/' },
  ],
  Клиентам: [
    { text: 'Бонусная программа', link: '/' },
    { text: 'Помощь', link: '/' },
    { text: 'Правила пользования сайта', link: '/' },
    { text: 'Обратная связь', link: '/' }
  ],
  ["Информация по заказу"]: [
    { text: 'Как оформить заказ', link: '/' },
    { text: 'Узнать статус заказа', link: '/' },
    { text: 'Требования к макетам', link: '/trebovniya-k-maketam' },
    { text: 'Оплата и доставка', link: '/' },
  ],
  ["Дополнительная информация"]: [
    { text: 'Новости', link: '/' },
    { text: 'Блог', link: '/' },
    { text: 'Персональные данные', link: '/' },
    { text: 'Политика конфиденциальности', link: '/politika-konfidencialnosti' },
    { text: 'Пользовательское соглашение', link: '/' }
  ],
}
</script>

<template>
  <div class="footer-wrapper">
    <footer class="footer">
      <div class="footer__top-section">
        <div class="categories">
          <div class="category" v-for="(subCategories, categoryName, i) in categories" :key="i">
            <p class="category__name">{{ categoryName }}</p>
            <ul class="category-list" :style="categoryName === 'Клиентам' ? 'height: 300px' : ''">
              <li class="category-list__item" v-for="(subCategory, j) in subCategories" :key="j">
                <NuxtLink :to="subCategory.link">
                  <ButtonText class="category-list__link">
                    {{ subCategory.text }}
                  </ButtonText>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="contacts">
          <p class="contacts__title">Оставайтесь на связи</p>
          <span> 8-800-77-07-999 (c 03:00 до 22:00) </span>
          <div class="socials-list">
            <MdiIcon class="socials-list__icon" icon="mdiInstagram" size="30px" />
            <MdiIcon class="socials-list__icon" icon="mdiFacebook" size="30px" />
            <svg
              fill="#ffffff"
              width="30px"
              height="30px"
              viewBox="0 0 32 32"
              version="1.1"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <title>vk</title>
                <path
                  d="M25.217 22.402h-2.179c-0.825 0-1.080-0.656-2.562-2.158-1.291-1.25-1.862-1.418-2.179-1.418-0.445 0-0.572 0.127-0.572 0.741v1.968c0 0.53-0.169 0.847-1.566 0.847-2.818-0.189-5.24-1.726-6.646-3.966l-0.021-0.035c-1.632-2.027-2.835-4.47-3.43-7.142l-0.022-0.117c0-0.317 0.127-0.614 0.741-0.614h2.179c0.55 0 0.762 0.254 0.975 0.846 1.078 3.112 2.878 5.842 3.619 5.842 0.275 0 0.402-0.127 0.402-0.825v-3.219c-0.085-1.482-0.868-1.608-0.868-2.137 0.009-0.283 0.241-0.509 0.525-0.509 0.009 0 0.017 0 0.026 0.001l-0.001-0h3.429c0.466 0 0.635 0.254 0.635 0.804v4.34c0 0.465 0.212 0.635 0.339 0.635 0.275 0 0.509-0.17 1.016-0.677 1.054-1.287 1.955-2.759 2.642-4.346l0.046-0.12c0.145-0.363 0.493-0.615 0.9-0.615 0.019 0 0.037 0.001 0.056 0.002l-0.003-0h2.179c0.656 0 0.805 0.337 0.656 0.804-0.874 1.925-1.856 3.579-2.994 5.111l0.052-0.074c-0.232 0.381-0.317 0.55 0 0.975 0.232 0.317 0.995 0.973 1.503 1.566 0.735 0.727 1.351 1.573 1.816 2.507l0.025 0.055c0.212 0.612-0.106 0.93-0.72 0.93zM20.604 1.004h-9.207c-8.403 0-10.392 1.989-10.392 10.392v9.207c0 8.403 1.989 10.392 10.392 10.392h9.207c8.403 0 10.392-1.989 10.392-10.392v-9.207c0-8.403-2.011-10.392-10.392-10.392z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p class="footer__bottom-section">© 2002–2025 Компания {{ companyShortName }}.</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.footer-wrapper {
  background-color: $footer_background_color;

  .footer {
    max-width: $app_width;
    margin: 0 auto;
    padding: 20px 0;

    &__top-section {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid $dark_gray_text_color;

      .categories {
        display: flex;
        gap: 60px;

        .category {
          display: flex;
          flex-direction: column;
          gap: 10px;

          &__name {
            color: $white-text-color;
            padding-bottom: 10px;
            border-bottom: 1px solid $dark_gray_text_color;
          }

          &-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            flex-wrap: wrap;

            &__item {
              color: $white-text-color;
            }
          }
        }
      }
    }

    .contacts {
      display: flex;
      flex-direction: column;
      gap: 10px;

      & > * {
        color: $white-text-color;
      }

      &__title {
        padding-bottom: 10px;
        border-bottom: 1px solid $dark_gray_text_color;
      }

      .socials-list {
        display: flex;
        gap: 10px;

        &__icon > * {
          color: $white-text-color;
        }
      }
    }

    &__bottom-section {
      text-align: center;
      color: $white-text-color;
      opacity: 0.5;
    }
  }
}
</style>
