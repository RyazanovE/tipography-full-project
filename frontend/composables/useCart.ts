import { useApi } from '@/composables/useApi'

export interface CartItem {
  id: number
  quantity: number
  type: string
  options: Options
  fileNames: string[]
}

export interface Options {
  size: string
  summ: number
  type: string
  color: string
  holes: boolean
  amount: string
  format: string
  corners: boolean
  material: string
  printType: string
  designType: string
  lamination: string
  productionTime: string
  timestamp: number
  originalFileName: string
}

export const useCart = () => {
  const api = useApi()
  const cartItems = useState<CartItem[]>('cartItems', () => [])

  const summ = computed(() => cartItems.value.reduce((acc, item) => acc + item.options.summ, 0))

  async function refreshCart() {
    try {
      const res = await getCart()
      cartItems.value = res.data
    } catch (e) {
      console.error('cart error:', e)
    }
  }

  async function getCart() {
    return api.get<CartItem[]>('/cart')
  }

  async function addToCart(payload: FormData) {
    await api.post('/cart', payload)
    await refreshCart()
  }

  async function editItemQuantity(id: number, quantity: number) {
    await api.patch(`/cart/${id}/edit-quantity`, { quantity })
  }

  async function removeItem(id: number) {
    await api.delete(`/cart/${id}`)
    await refreshCart()
  }

  async function clearCart() {
    await api.delete('/cart')
    await refreshCart()
  }

  const createOrder = async (order: any) => {
    return await api.post<{ orderNumber: string, email: string }>('/orders', order)
  }



  return {
    cartItems,
    getCart,
    addToCart,
    removeItem,
    createOrder,
    clearCart,
    editItemQuantity,
    refreshCart,
    summ
  }
}
