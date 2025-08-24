<script setup lang="ts">
import { companyShortName, mail, phone } from '~/assets/constants/global'
import { useFastPurchaseModal } from '~/stores/fast-purchase-modal'
import { useLoginModal } from '~/stores/login-modal'

defineProps<{ mainPage?: boolean }>()

const auth = useAuth()

const isFastPurchaseModalShown = useFastPurchaseModal()

const isHeaderTopHidden = ref(false)
const isCatalogOpen = ref(false)
const catalogOffset = ref(0)
const isLoginTooltipShown = ref(false)
const isLoginModalShown = ref(false)

const isLoginModalShownState = useLoginModal()

const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  isHeaderTopHidden.value = scrollTop > 41
  catalogOffset.value = scrollTop > 5 ? 106 : 147
}

onMounted(async () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  catalogOffset.value = scrollTop > 41 ? 106 : 147
  window.addEventListener('scroll', handleScroll)

  cart.refreshCart()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(isLoginModalShownState, (newValue) => {
  if (newValue) {
    isLoginModalShown.value = true
  }
})

watch(isLoginModalShown, (newValue) => {
  if (!newValue) {
    isLoginModalShownState.value = false
  }
})

const toogleCatalog = () => {
  isCatalogOpen.value = !isCatalogOpen.value
}

const cart = useCart()
</script>

<template>
  <div class="header-wrapper">
    <header class="header">
      <div
        class="header__top-section"
        :class="{ 'header__top-section_with-padding': isHeaderTopHidden }"
      >
        <ButtonText>
          <span class="address">
            <MdiIcon icon="mdiMapMarker" size="1rem" />
            Москва, Большая Якиманка, 27
          </span>
        </ButtonText>

        <div class="links-container">
          <NuxtLink to="/vse-uslugi"><ButtonText>Услуги</ButtonText></NuxtLink>
          <NuxtLink to="/ceni"> <ButtonText>Цены</ButtonText></NuxtLink>
          <NuxtLink to="/trebovniya-k-maketam"><ButtonText>Требования к макетам</ButtonText></NuxtLink>
          <NuxtLink to="/oplata-i-dostavka"><ButtonText>Оплата и доставка</ButtonText></NuxtLink>
          <ButtonText>Акции</ButtonText>
          <NuxtLink to="/kontakti"><ButtonText>Контакты</ButtonText></NuxtLink>
          <ButtonText>О типографии</ButtonText>
        </div>

        <div class="contact-container">
          <ButtonText>{{ mail }}</ButtonText>
          <ButtonText>{{ phone }}</ButtonText>
        </div>
      </div>

      <nav
        id="header-middle"
        class="header__middle-section"
        :class="{
          'header__middle-section_fixed': isHeaderTopHidden,
          'header__middle-section_with-shadow': !mainPage
        }"
      >
        <div class="middle-section-container">
          <div class="logo-container">
            <div class="logo">
              <NuxtLink to='/'><span class="logo__text"> {{ companyShortName }} </span></NuxtLink>
              <ButtonSolid class="logo__button" @click="toogleCatalog">
                <span class="with-icon logo__catalog">
                  <MdiIcon icon="mdiDotsGrid" size="20px" class="chevron-icon" />
                  Каталог
                </span>
              </ButtonSolid>
            </div>
          </div>

          <AppHeaderSearchInput />

          <div class="profile-buttons">
            <ButtonIcon
              class="profile-buttons__button"
              icon="mdiClockFast"
              solid
              shine
              @click="isFastPurchaseModalShown = true"
            >
              Быстрый заказ
            </ButtonIcon>
            <ButtonIcon
              class="profile-buttons__button"
              icon="mdiProgressCheck"
              @click="auth.isAuthorized.value ? navigateTo('/my/tekushie-zakazy') :  navigateTo('/order-status')"
            >
              Статус заказа
            </ButtonIcon>
            <ButtonIcon
              class="profile-buttons__button profile-buttons__button_cart"
              icon="mdiCartOutline"
              @click="navigateTo('/korzina')"
            >
              <span class="cart-badge">{{ cart.cartItems.value.length }}</span>
              Корзина
            </ButtonIcon>

            <div v-if="auth.user.value?.name">
              <ButtonIcon
                class="profile-buttons__button"
                icon="mdiAccountOutline"
                @click="navigateTo('/my')"
              >
                Профиль {{ auth.user.value.name }}
              </ButtonIcon>
            </div>
            <div
              v-else
              class="profile-buttons__profile"
              @mouseenter="isLoginTooltipShown = true"
              @mouseleave="isLoginTooltipShown = false"
            >
              <ButtonIcon
                @click="isLoginModalShown = true"
                class="profile-buttons__button"
                icon="mdiAccountOutline"
              >
                Войти
              </ButtonIcon>
              <div v-if="isLoginTooltipShown" style="width: 200px; height: 10px; position: absolute"></div>
              <Transition name="tooltip-fade">
                <div v-if="isLoginTooltipShown" class="profile-tooltip">
                  <div class="tooltip-arrow"></div>
                  <p class="profile-tooltip__text">
                    Войдите, чтобы отслеживать заказы и пользоваться персональными скидками и
                    баллами.
                  </p>
                  <ButtonSolid class="profile-tooltip__login" @click="isLoginModalShown = true"
                    >Войти или зарегистрироваться</ButtonSolid
                  >
                  <ButtonSolid
                    @click="navigateTo('/my')"
                    variant="secondary"
                    class="profile-tooltip__cabinet"
                    >Личный кабинет</ButtonSolid
                  >
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
  <AppHeaderCatalog
    :isShown="isCatalogOpen"
    :catalog-offset="catalogOffset"
    @close="toogleCatalog"
  />
  <AppHeaderLoginModal v-model="isLoginModalShown" />
  <AppHeaderFastPurchaseModal v-model="isFastPurchaseModalShown" />
</template>

<style scoped lang="scss">
.cart-badge {
  position: absolute;
  top: 0px;
  right: 0px;
  background: $primary_background;
  color: white;
  border-radius: 50%;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
}

.with-icon {
  color: $white-text-color;
  display: flex;
  gap: 10px;
  align-items: center;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.3s ease;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

.tooltip-fade-enter-from .tooltip-content,
.tooltip-fade-leave-to .tooltip-content {
  transform: scale(0.95);
  opacity: 0;
}

.header-wrapper {
  position: relative;
  .header {
    &__top-section {
      max-width: $app_width;
      margin: 0 auto;
      margin-top: $normal_gap;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &_with-padding {
        padding-bottom: 106px;
      }

      .address {
        display: flex;
        align-items: center;
        gap: 0.2rem;
      }

      .links-container {
        display: flex;
        gap: $normal_gap;
        align-items: center;
      }

      .contact-container {
        gap: $normal_gap;
        display: flex;
        align-items: center;
      }
    }

    &__middle-section {
      background-color: $white_background_color;
      z-index: 11;
      padding: $normal_gap 0;

      &_with-shadow {
        box-shadow: $box_shadow_header;
      }

      .middle-section-container {
        display: flex;
        align-items: center;
        gap: $normal_gap;
        margin: 0 auto;
        width: $app_width;
      }

      &_fixed {
        top: 0;
        left: 0;
        right: 0;
        position: fixed;
      }

      .logo-container {
        display: flex;
        align-items: center;

        .logo {
          background-color: $light_gray_background_color;
          height: 64px;
          border-radius: $border-radius-normal;
          display: flex;
          align-items: center;
          gap: $normal_gap;
          padding: 0 $normal_gap;

          .logo__text {
            font-weight: 700;
            font-size: 24px;
          } 

          &__button {
            height: 44px;
          }

          .logo__catalog {
            color: $white-text-color;
          }
        }

        .chevron-icon {
          & > * {
            color: $white-text-color;
          }
        }
      }

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

      .profile-buttons {
        gap: $normal_gap;
        display: flex;
        align-items: center;

        &__button {
          &_cart {
            position: relative;
          }
        }

        &__profile {
          position: relative;
          z-index: 99;

          .tooltip-arrow {
            position: absolute;
            top: -6px;
            transform: translateX(-50%);
            left: 50%; /* отступ слева */
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid $light_gray_background_color; /* цвет стрелочки */
          }

          .profile-tooltip {
            z-index: 9999;
            display: flex;
            flex-direction: column;
            position: absolute;
            top: calc(100% + 8px);
            left: 50%;
            width: 300px;
            background-color: $white_background_color;
            border-radius: $border_radius_normal;
            box-shadow: $box_shadow_normal;
            transform: translateX(-50%);
            padding: $normal_gap;

            &__login {
              margin-top: $normal_gap;
              font-size: $font-size_normal;
            }

            &__cabinet {
              font-size: $font-size_normal;
              margin-top: calc($normal_gap/2);
            }

            &__text {
              font-size: $font-size_normal;
            }
          }
        }

        .cart-btn > * {
          color: $dark_gray_text_color;
        }
      }
    }
  }
}
</style>
