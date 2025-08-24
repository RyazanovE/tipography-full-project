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
                    sidebar__item_active: selectedTab.value === item.value,
                    sidebar__item_disabled: !auth.user.value && item.value !== 'Главная'
                  }"
                  @click="onTabSelected(item)"
                >
                  {{ item.label }}
                </li>
              </ul>
            </div>
            <div class="sidebar__sections">
              <ul class="sidebar__list">
                <li v-if="auth.user.value" class="sidebar__item" @click="logout">Выйти</li>
              </ul>
            </div>
          </div>
        </div>
      </UiCard>

      <UiCard>
        <h2 class="section__header">
          {{ selectedTab.label }}
        </h2>
        <component :is="selectedTab.component ?? MyTabsMain" />
      </UiCard>
    </div>
  </template>
  <UiLoader v-else />
</template>

<script setup lang="ts">
import {
  MyTabsBonuses,
  MyTabsMain,
  MyTabsMockups,
  MyTabsCurrentSupportRequests,
  MyTabsSupportRequestsHistory,
  MyTabsAccount,
  MyTabsOrdersHistory,
  MyTabsCurrentOrders
} from '#components'
import { useBreadcrumbs } from '~/stores/breadcrumbs'

type SectionItem = {
  label: string
  value: string
  component: any
}

const selectedTab = ref<SectionItem>({
  label: 'Главная',
  value: 'Главная',
  component: MyTabsMain
})

watch(
  () => selectedTab.value,
  () => {
    localStorage.setItem('selectedTab', selectedTab.value.value)
  }
)

onMounted(() => {
  const selectedTabFromStorage = localStorage.getItem('selectedTab')

  if (selectedTabFromStorage) {
    selectedTab.value = sections
      .flatMap((section) => section.items)
      .find((item) => item.value === selectedTabFromStorage) ?? {
      label: 'Главная',
      value: 'Главная',
      component: MyTabsMain
    }
  }
})

onBeforeUnmount(() => {
  localStorage.removeItem('selectedTab')
})

const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Личный кабинет',
    to: '/my'
  }
]

const sections = [
  {
    title: 'Личная информация',
    items: [
      { label: 'Главная', value: 'Главная', component: MyTabsMain },
      { label: 'Сохраненные макеты', value: 'Сохраненные макеты', component: MyTabsMockups },
      { label: 'Баллы и бонусы', value: 'Баллы и бонусы', component: MyTabsBonuses }
    ]
  },
  {
    title: 'Заказы',
    items: [
      { label: 'Текущие заказы', value: 'Текущие заказы', component: MyTabsCurrentOrders },
      { label: 'История заказов', value: 'История заказов', component: MyTabsOrdersHistory }
    ]
  },
  {
    title: 'Поддержка',
    items: [
      {
        label: 'Текущие обращения',
        value: 'Текущие обращения',
        component: MyTabsCurrentSupportRequests
      },
      {
        label: 'История ображений',
        value: 'История ображений',
        component: MyTabsSupportRequestsHistory
      }
    ]
  },
  {
    title: 'Настройка аккаунта',
    items: [{ label: 'Моя учетная запись', value: 'Моя учетная запись', component: MyTabsAccount }]
  }
]

const auth = useAuth()

const logout = async () => {
  try {
    await auth.logout()
    localStorage.removeItem('selectedTab')
    window.location.reload()
  } catch (error) {
    console.error(error)
  }
}

const onTabSelected = (item: SectionItem) => {
  if (auth.user.value) {
    selectedTab.value = item
  }
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
}
</style>
