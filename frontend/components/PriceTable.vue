<template>
  <div class="price-table-container">
    <h3 v-if='title' class="price-table__title">{{ title }}</h3>
    <div class="price-table-wrapper">
      <table class="price-table">
        <thead class="price-table__head">
          <tr class="price-table__row">
            <th rowspan="2" class="price-table__header format-header">
              <div class="header-content">
                <MdiIcon icon="mdiFormatListBulleted" class="header-icon" />
                <span>Формат / Цветность</span>
              </div>
            </th>
            <th :colspan="quantities.length" class="price-table__header quantity-header">
              <div class="header-content">
                <MdiIcon icon="mdiPrinter" class="header-icon" />
                <span>Количество экземпляров и стоимость</span>
              </div>
            </th>
          </tr>
          <tr class="price-table__row">
            <th v-for="qty in quantities" :key="qty" class="price-table__header qty-header">
              <div class="qty-badge">{{ qty }} шт.</div>
            </th>
          </tr>
        </thead>
        <tbody class="price-table__body">
          <tr
            v-for="(row, index) in rows"
            :key="index"
            class="price-table__row"
            :class="{ 'price-table__row--highlight': index % 2 === 0 }"
          >
            <td class="price-table__cell format-cell">
              <span class="format-label">{{ row.label }}</span>
            </td>
            <td v-for="(price, i) in row.prices" :key="i" class="price-table__cell price-cell">
              <div class="price-badge">
                <span class="price-value">{{ price }}</span>
                <span class="price-currency">₽</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String },
  quantities: {
    type: Array,
    default: () => [50, 100, 200, 300, 500, 1000]
  },
  rows: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.price-table-container {
  margin-bottom: 32px;
}

.price-table__title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
  text-align: center;
  background: $primary-background-color;
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

.price-table-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  background: white;

  &__head {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  }

  &__row {
    transition: background-color 0.2s ease;

    &--highlight {
      background: linear-gradient(90deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%);
    }
  }

  &__header {
    padding: 20px 16px;
    font-weight: 600;
    color: white !important;
    text-align: center;
    position: relative;
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

    &.format-header {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    }

    &.quantity-header {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    }
  }

  &__body {
    background: white;
  }

  &__cell {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
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

.qty-header {
  .qty-badge {
    background: rgba(255, 255, 255, 0.15);
    padding: 8px 12px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.format-cell {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
  text-align: left;
  border-right: 2px solid #e2e8f0;

  .format-label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.price-cell {
  font-weight: 500;
}

.price-badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: white;
  padding: 10px 16px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  min-width: 80px;
  justify-content: center;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }
}

.price-value {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.price-currency {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
}

// Анимации
.price-table {
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
@media (max-width: 1024px) {
  .price-table-wrapper {
    overflow-x: auto;
  }

  .price-table {
    min-width: 600px;
  }

  .price-table__header,
  .price-table__cell {
    padding: 14px 12px;
  }

  .price-badge {
    padding: 8px 12px;
    min-width: 70px;
  }
}

@media (max-width: 768px) {
  .price-table__title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .header-content {
    flex-direction: row;
    gap: 6px;
  }

  .header-icon {
    font-size: 16px;
  }

  .qty-badge {
    padding: 6px 10px;
    font-size: 12px;
  }

  .price-value {
    font-size: 14px;
  }

  .price-currency {
    font-size: 12px;
  }
}

// Темная тема
</style>
