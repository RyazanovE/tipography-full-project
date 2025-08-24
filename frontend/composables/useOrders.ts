import { useApi } from '@/composables/useApi'
import type { Order } from '~/types/orders'

export const useOrders = () => {
  const api = useApi()

  const getSingleOrder = async (orderNumber: string, email: string) => {
    return api.get<Order>(`/orders/${orderNumber}`, { params: { email } })
  }

  const getMultipleOrders = async () => {
    return api.get<{items: Order[], total: number}>(`/orders`)
  }

  const getAllCurrentOrders = async (limit?: number, offset?: number) => {
    return api.get<{items: Order[], total: number}>(`/orders/current`, { params: { limit, offset } })
  }

  const getOrdersHistory = async (limit?: number, offset?: number) => {
    return api.get<{items: Order[], total: number}>(`/orders/history`, { params: { limit, offset } })
  }

  const getMockups = async () => {
    return api.get('/orders/mockups')
  }

  return {
    getMockups,
    getSingleOrder,
    getMultipleOrders,
    getOrdersHistory,
    getAllCurrentOrders
  }
}
