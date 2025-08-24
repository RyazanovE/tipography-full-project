import axios from 'axios'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin(() => {
  const auth = useAuth()

  const api = axios.create({
    baseURL: useRuntimeConfig().public.API_BASE_URL as string,
    withCredentials: true
  })

  let isRefreshing = false
  let failedQueue: (() => void)[] = []

  const retryFailed = () => {
    failedQueue.forEach((callback) => callback())
    failedQueue = []
  }

  api.interceptors.request.use(
    config => {
      if (isRefreshing && config.url !== '/auth/refresh') {
        const error = {
          response: {
            status: 401,
            data: {
              message: 'Токен истёк'
            }
          },
          config
        }
        return Promise.reject(error)
      }
      return config
    },
    error => Promise.reject(error)
  )

  
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config

      if (
        error.response?.status === 401 &&
        error.response?.data?.message === 'Токен истёк' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true

        if (!isRefreshing) {
          isRefreshing = true
          try {
            await api.post('/auth/refresh')
            const retriedRequest = api(originalRequest)
            retryFailed()
            return retriedRequest
          } catch (err) {
            failedQueue = []
            auth.user.value = null
            return Promise.reject(err)
          } finally {
            isRefreshing = false
          }
        }

        return new Promise((resolve, reject) => {
          failedQueue.push(() => {
            resolve(api(originalRequest))
          })
        })
      }

      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api
    }
  }
})
