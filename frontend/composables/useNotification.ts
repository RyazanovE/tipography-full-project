export const useNotification = () => {
  const notification = useState<{ message: string; type: string; duration: number }>(
    'notification',
    () => null
  )

  const notify = (message: string, type = 'info', duration = 3000) => {
    let timer
    if (timer) return

    notification.value = { message, type, duration }

    timer = setTimeout(() => {
      notification.value = null
      clearTimeout(timer)
    }, duration)
  }

  return { notification, notify }
}
