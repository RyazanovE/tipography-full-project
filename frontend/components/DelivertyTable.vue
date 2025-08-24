<template>
  <div class="delivery-table-container">
    <h3 v-if="title" class="delivery-table__title">{{ title }}</h3>
    <div class="delivery-table-wrapper">
      <table class="delivery-table">
        <thead class="delivery-table__head">
          <tr class="delivery-table__row">
            <th class="delivery-table__header">
              <div class="header-content">
                <MdiIcon icon="mdiTruckDelivery" class="header-icon" />
                <span>Вид доставки</span>
              </div>
            </th>
            <th class="delivery-table__header">
              <div class="header-content">
                <MdiIcon icon="mdiCash" class="header-icon" />
                <span>Стоимость</span>
              </div>
            </th>
            <th class="delivery-table__header">
              <div class="header-content">
                <MdiIcon icon="mdiClockOutline" class="header-icon" />
                <span>Сроки</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="delivery-table__body">
          <tr
            class="delivery-table__row"
            v-for="(item, index) in deliveries"
            :key="index"
            :class="{ 'delivery-table__row--highlight': index % 2 === 0 }"
          >
            <td class="delivery-table__cell delivery-type">
              <div class="delivery-type-content">
                <MdiIcon :icon="getDeliveryIcon(item.type)" class="delivery-icon" />
                <div class="delivery-info">
                  <span class="delivery-name">{{ item.type }}</span>
                  <span v-if="item.note" class="delivery-note">{{ item.note }}</span>
                </div>
              </div>
            </td>
            <td class="delivery-table__cell delivery-cost" v-html="item.cost" />
            <td class="delivery-table__cell delivery-time">
              <div class="time-badge">
                <MdiIcon icon="mdiClockTimeFourOutline" class="time-icon" />
                <span>{{ item.time }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  },
  deliveries: {
    type: Array,
    required: true,
    validator: (arr) => arr.every((item) => 'type' in item && 'cost' in item && 'time' in item)
  }
})

const getDeliveryIcon = (type) => {
  const icons = {
    Самовывоз: 'mdiStoreOutline',
    'Курьерская доставка': 'mdiBikeFast',
    'Доставка СДЭК': 'mdiTruckDelivery',
    'Почта России': 'mdiEmailOutline',
    'Экспресс-доставка': 'mdiRocketLaunchOutline',
    'Транспортная компания': 'mdiTruckOutline'
  }

  return icons[type] || 'mdiTruckOutline'
}
</script>

<style scoped lang="scss">
.delivery-table-container {
  margin-bottom: 32px;
}

.delivery-table__title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  text-align: center;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 2px;
  }
}

.delivery-table-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.delivery-table {
  width: 100%;
  border-collapse: collapse;
  background: white;

  &__head {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  }

  &__row {
    transition: all 0.3s ease;
    border-bottom: 1px solid #e2e8f0;

    &--highlight {
      background: linear-gradient(90deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%);
    }

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__header {
    padding: 20px 16px;
    font-weight: 600;
    color: white;
    text-align: center;
    border: none;

    & > * {
      color: white;

      & > * {
        color: white;

        & > * {
          color: white;
        }
      }
    }
  }

  &__cell {
    padding: 20px 16px;
    text-align: center;
    transition: all 0.2s ease;
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
}

.header-icon {
  font-size: 20px;
  opacity: 0.9;
}

.delivery-type {
  text-align: left;

  .delivery-type-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.delivery-icon {
  font-size: 24px;
  color: #6366f1;
  flex-shrink: 0;
}

.delivery-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.delivery-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 16px;
}

.delivery-note {
  font-size: 14px;
  color: #6b7280;
  font-style: italic;
}

.delivery-cost {
  font-weight: 700;
  color: #059669;
  font-size: 18px;

  :deep(*) {
    font-weight: 700;
    color: #059669;
  }
}

.delivery-time {
  .time-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f0f9ff;
    padding: 10px 16px;
    border-radius: 20px;
    border: 2px solid #e0f2fe;
    transition: all 0.3s ease;
  }
}

.time-icon {
  font-size: 18px;
  color: #0369a1;
}

// Анимации
.delivery-table {
  animation: tableAppear 0.6s ease;
}

@keyframes tableAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Адаптивность
@media (max-width: 768px) {
  .delivery-table-container {
    margin-bottom: 24px;
  }

  .delivery-table__title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .delivery-table-wrapper {
    border-radius: 12px;
    overflow-x: auto;
  }

  .delivery-table {
    min-width: 500px;
  }

  .delivery-table__header,
  .delivery-table__cell {
    padding: 16px 12px;
  }

  .header-content {
    flex-direction: row;
    gap: 6px;
  }

  .header-icon {
    font-size: 16px;
  }

  .delivery-type-content {
    gap: 8px;
  }

  .delivery-icon {
    font-size: 20px;
  }

  .delivery-name {
    font-size: 14px;
  }

  .delivery-note {
    font-size: 12px;
  }

  .delivery-cost {
    font-size: 16px;
  }

  .time-badge {
    padding: 8px 12px;
  }

  .time-icon {
    font-size: 16px;
  }
}
</style>
