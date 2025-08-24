import type { AddressInfo, ClientInfo } from '~/types/orders'

export const useAuth = () => {
  const user = useState<{
    name: string
    email: string
    id: number
    role: string
    phone: string
    address: AddressInfo
  } | null>('auth_user', () => null)
  const loading = useState('auth_loading', () => true)

  const isAuthorized = computed(() => Boolean(user.value))

  const api = useApi()

  const fetchUser = async () => {
    loading.value = true
    try {
      const res = await api.get('/user/profile')
      user.value = res.data
    } catch {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const confirmResetPassword = async (token: string, newPassword: string) => {
    await api.post('/user/confirm-reset', { token, newPassword })
  }

  const register = async (payload: { email: string; password: string; name: string }) => {
    await api.post('/user', payload)
  }

  const resetPassword = async (email: string) => {
    await api.post('/user/request-reset', { email })
  }

  const login = async (payload: { email: string; password: string }) => {
    await api.post('/auth/login', payload)
    await fetchUser()
  }

  const logout = async () => {
    await api.post('/auth/signout')
    user.value = null
  }

  const updateUserAddress = async (address: AddressInfo) => {
    await api.patch('/user', { address })
  }

  const updateUserInfo = async (info: ClientInfo) => {
    const clientInfo = { ...info }
    Object.keys(clientInfo).forEach(
      (key) => !info[key as keyof typeof info] && delete info[key as keyof typeof info]
    )
    await api.patch('/user', { ...info, name: info.fio, fio: undefined })
  }

  return {
    updateUserInfo,
    updateUserAddress,
    user,
    loading,
    confirmResetPassword,
    register,
    login,
    resetPassword,
    logout,
    fetchUser,
    isAuthorized
  }
}
