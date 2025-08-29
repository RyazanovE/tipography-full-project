<template>
  <UiModal v-model="isShown">
    <ButtonText v-if="formState !== 'login'" class="" @click="formState = 'login'">
      <MdiIcon class="back-icon" icon="mdiArrowLeft" size="25" />
      <span style="margin-left: 30px">Вход в аккаунт</span>
    </ButtonText>

    <div class="login-modal-wrapper">
      <transition name="slide" mode="out-in">
        <div :key="formState">
          <div v-if="formState === 'login'" class="login-modal">
            <h2 class="login-modal__header">Вход в аккаунт</h2>
            <UiInput v-model="email" :error="errorObj.email" id="email" placeholder="Почта" />
            <UiInput
              v-model="password"
              :error="errorObj.password"
              id="password"
              placeholder="Пароль"
              type="password"
            />
            <ButtonSolid @click="login">Войти</ButtonSolid>
            <div class="login-modal__register">
              Нет аккаунта?
              <ButtonLink @click="formState = 'register'">Регистрация</ButtonLink>
            </div>
            <ButtonLink @click="formState = 'forgot'">Забыли пароль?</ButtonLink>
          </div>

          <div v-else-if="formState === 'register'" class="login-modal">
            <h2 class="login-modal__header">Регистрация</h2>
            <UiInput v-model="name" :error="errorObj.name" id="name" placeholder="Имя" />
            <UiInput v-model="email" :error="errorObj.email" id="email" placeholder="Почта" />
            <UiInput
              v-model="password"
              :error="errorObj.password"
              id="password"
              placeholder="Пароль"
              type="password"
            />
            <p class="password-hint">* Пароль должен быть не менее 6 символов</p>
            <ButtonSolid @click="register" :isLoading>Регистрация</ButtonSolid>
          </div>

          <div v-else-if="formState === 'forgot'" class="login-modal">
            <h2 class="login-modal__header">Восстановить пароль</h2>
            <UiInput :error="errorObj.email" v-model="email" id="email" placeholder="Почта" />
            <ButtonSolid @click="resetPassword" :isLoading>Восстановить</ButtonSolid>
          </div>

          <div v-else-if="formState === 'forgot-confirmation'" class="login-modal">
            <h2 class="login-modal__header">Подтверждение сброса пароля</h2>
            <p>
              Письмо с подтверждением <strong>отправлено на почту {{ email }}</strong>, перейдите по ссылке в
              письме, чтобы завершить сброс пароля.
            </p>
          </div>

          <div v-else-if="formState === 'register-confirmation'" class="login-modal">
            <h2 class="login-modal__header">Завершение регистрации</h2>
            <p>
              Письмо с подтверждением <strong>отправлено на почту {{ email }}</strong>, перейдите по ссылке в
              письме, чтобы завершить регистрацию.
            </p>
          </div>
        </div>
      </transition>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
const authApi = useAuth()
const cart = useCart()
const notification = useNotification()

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const isShown = defineModel<boolean>()
const formState = ref<'login' | 'register' | 'forgot' | 'register-confirmation' | 'forgot-confirmation'>('login')

const errorObj = ref<Record<'name' | 'email' | 'password', boolean>>({
  name: false,
  email: false,
  password: false
})

watch(isShown, (visible) => {
  if (!visible) {
    formState.value = 'login'
    name.value = ''
    email.value = ''
    password.value = ''
  }
})

const resetErrors = () => {
  Object.assign(errorObj.value, {
    name: false,
    email: false,
    password: false
  })
}

const validateForm = (fields: Partial<Record<'name' | 'email' | 'password', boolean>>) => {
  let isValid = true

  Object.keys(fields).forEach((key) => {
    const k = key as keyof typeof errorObj.value
    if (!fields[k]) {
      errorObj.value[k] = true
      isValid = false
    }
  })

  if (!isValid) {
    setTimeout(resetErrors, 3000)
  }

  return isValid
}

const resetPassword = async () => {
  try {
    const isValid = validateForm({
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    })

    if (!isValid) return

    isLoading.value = true
    await authApi.resetPassword(email.value)
    formState.value = 'forgot-confirmation'
  } catch (error) {
    notification.notify('Данный email не найден', 'error')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const login = async () => {
  try {
    const isValid = validateForm({
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
      password: password.value.length >= 6
    })

    if (!isValid) return

    isLoading.value = true

    await authApi.login({ email: email.value, password: password.value })
    notification.notify('Успешный вход', 'success')
    isShown.value = false
    await cart.refreshCart()
  } catch (error) {
    notification.notify('Неправильный email или пароль', 'error')
    Object.assign(errorObj.value, { email: true, password: true })
    setTimeout(resetErrors, 3000)
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const register = async () => {
  const isValid = validateForm({
    name: !!name.value,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
    password: password.value.length >= 6
  })

  if (!isValid) return

  isLoading.value = true
  try {
    await authApi.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    formState.value = 'register-confirmation'
  } catch (error) {
    notification.notify(error.message, 'error')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
<style scoped lang="scss">
.back-icon {
  position: absolute;
  top: $normal_gap;
  left: $normal_gap;
}
.password-hint {
  font-size: 12px;
  color: #888;
  margin-top: -10px;
  margin-bottom: 10px;
}

.login-modal-wrapper {
  width: 450px;
  height: 500px;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  overflow: hidden;
  position: relative;
}

.login-modal {
  display: flex;
  flex-direction: column;
  gap: $normal_gap;
  width: 350px;

  &__header {
    text-align: center;
    margin-bottom: $normal_gap;
  }

  &__register {
    display: flex;
    gap: calc($normal_gap / 4);
    justify-content: center;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
  position: absolute;
  width: 350px; // фиксируем ширину контейнера, как в вашем wrapper
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
