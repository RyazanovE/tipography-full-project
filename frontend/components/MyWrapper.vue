<template>
  <template v-if="!auth.loading.value">
    <h1 class="cabinet__title">Личный кабинет</h1>
    <div class="cabinet__container">
      <UiCard>
        <div class="sidebar">
          <div class="sidebar__profile">
            <NuxtImg src="images/profile.png" class="sidebar__avatar" />
            <h4 class="sidebar__name">{{ auth.user.value?.name ?? 'Гость' }}</h4>
            <ButtonText
              :class="{ 'sidebar__edit-button_disabled': !auth.user.value }"
              class="sidebar__edit-button"
              >Изменить профиль</ButtonText
            >
          </div>

          <div class="sidebar__sections">
            <div
              v-for="(section, sectionIndex) in sections"
              :key="sectionIndex"
              class="sidebar__section"
            >
              <span class="sidebar__title">{{ section.title }}</span>
              <ul class="sidebar__list">
                <li
                  v-for="(item, itemIndex) in section.items"
                  :key="itemIndex"
                  class="sidebar__item"
                  :class="{
                    sidebar__item_active: $route.path === `/my/${item.value}`,
                    sidebar__item_disabled: !auth.user.value && item.value !== 'main'
                  }"
                >
                  <NuxtLink @click='onNavLinkClick(item.value)' class="sidebar__link">
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="sidebar__sections">
              <ul class="sidebar__list">
                <li v-if="auth.isAuthorized.value" class="sidebar__item" @click="logout">Выйти</li>
              </ul>
            </div>
          </div>
        </div>
      </UiCard>

      <UiCard>
        <h2 class="section__header">
          {{ currentTab?.label || 'Главная' }}
        </h2>
        <slot />
      </UiCard>
    </div>
  </template>
  <UiLoader v-else />
</template>

<script setup lang="ts">
import { sections } from '~/constants/my'

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const { notify } = useNotification()

const currentTab = computed(() => {
  const tabValue = route.path.split('/my/')[1] || 'glavnaya'
  return sections.flatMap((section) => section.items).find((item) => item.value === tabValue)
})

const logout = async () => {
  try {
    await auth.logout()
    await router.push('/my/glavnaya')
    notify('Вы успешно вышли', 'success')
  } catch (error) {
    console.error(error)
  }
}

const onNavLinkClick = (link: string) => {
  if (!auth.isAuthorized.value) return;

  navigateTo(`/my/${link}`)
}
</script>

<style scoped lang="scss">
.section__header {
  margin-bottom: $normal_gap;
}

.cabinet {
  &__title {
    margin-bottom: $normal_gap;
  }

  &__container {
    display: grid;
    grid-template-columns: 3fr 9fr;
    gap: $normal_gap;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: calc($normal_gap/2);

  &__profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc($normal_gap/2);
  }

  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__name {
    font-size: $font_size_large;
    font-weight: bold;
    text-align: center;
  }

  &__edit-button {
    font-size: 14px;
    color: $primary_background_color;
    cursor: pointer;

    &_disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  &__sections {
    display: flex;
    flex-direction: column;
    gap: $normal_gap;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: calc($normal_gap/2);
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    padding-left: 10px;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  &__item {
    font-size: 14px;
    color: #555;
    cursor: pointer;
    transition: color 0.3s;
    padding: 5px 10px;

    &:hover {
      text-decoration: underline;
    }

    &_active {
      background-color: $light_gray_background_color;
      margin-right: auto;
      padding: 5px 10px;
      border-radius: $border_radius_small;
      color: $primary_background_color;
    }

    &_disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  &__link {
    color: inherit;
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
