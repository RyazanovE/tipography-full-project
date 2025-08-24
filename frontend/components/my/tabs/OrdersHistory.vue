<script setup lang="ts">
import { orderStatusDict } from '~/constants/order'
import type { Order } from '~/types/orders'

const ordersApi = useOrders()

const orders = ref<Order[]>([])

const selectedOrder = ref<Order | null>(null)

const offset = ref(0)
const itemsCount = ref(0)

const getOrdersHistory = async () => {
  const {
    data: { items, total }
  } = await ordersApi.getOrdersHistory(5, offset.value)

  orders.value = items
  itemsCount.value = total
}

watch(offset, getOrdersHistory)

onMounted(getOrdersHistory)
</script>

<template>
  <div class="orders">
    <div v-if="!selectedOrder">
      <OrderList :orders @openOrder="selectedOrder = $event" />
    </div>
    <div class="order-info" v-else>
      <ButtonIcon icon="mdiArrowLeft" class="back-icon" inline @click="selectedOrder = null"
        >к списку заказов
      </ButtonIcon>
      <div class="order-info__header">
        <div>
          <span
            >Заказ: <strong>{{ selectedOrder.orderNumber }}</strong></span
          >
          <span
            >Дата:
            <strong>{{ new Date(selectedOrder.createdAt).toLocaleDateString() }}</strong></span
          >
        </div>
        <span
          >Статус:
          <strong
            class="order-info__status"
            :style="{ backgroundColor: orderStatusDict[selectedOrder.status].color }"
            >{{ orderStatusDict[selectedOrder.status].text }}</strong
          ></span
        >
      </div>

      <OrderInfo
        :clientInfo="selectedOrder.info.clientInfo"
        :addressInfo="selectedOrder.info.deliveryInfo.addressInfo"
        :tkInfo="selectedOrder.info.deliveryInfo.tkInfo"
        :selected-delivery-method="selectedOrder.info.deliveryInfo.deliveryMethod"
        :cart-items="selectedOrder.items"
        @close="selectedOrder = null"
      />
    </div>
    <Pagination
      v-if="!selectedOrder && itemsCount > 5"
      class="pagination"
      :total="itemsCount"
      :limit="5"
      :offset
      @update:offset="offset = $event"
    />
  </div>
</template>

<style scoped lang="scss">
.orders {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.pagination {
  align-self: center;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: $normal_gap;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__status {
    border-radius: $border_radius_small;
    font-size: $font_size_small;
    padding: calc($normal_gap/4) calc($normal_gap/2);
  }
}

.back-icon {
  cursor: pointer;
  align-self: start;
}
</style>
