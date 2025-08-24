<template>
  <UiModal v-model="isShown">
    <div class="modal">
      <h3 class="modal__header">Быстрый заказ</h3>
      <p class="modal__subheader">Заполните форму и мы свяжемся с Вами в ближайшее время</p>
      <form  @submit.prevent class="fast-purchase-form">
        <UiInput
          v-model="formValues.name"
          :error="invalidFields.includes('name')"
          label="Имя"
          placeholder="Федор"
          id="name"
          required
        />
        <UiSelect
          v-model="formValues.contactMethod"
          placeholder=""
          label="Предпочтительный способ связи"
          :options="options"
        />
        <UiInput
          :error="invalidFields.includes('phone')"
          :required="formValues.contactMethod !== 'email'"
          placeholder="+7 (___) ___-__-__"
          id="phone"
          label="Телефон"
          mask="phone"
          v-model="formValues.phone"
        />

        <UiInput
          :error="invalidFields.includes('email')"
          :required="formValues.contactMethod === 'email'"
          placeholder="your@email.here"
          id="email"
          label="Электронная почта"
          v-model="formValues.email"
        />
        <UiInput
          class="fast-purchase-form__comment"
          textarea
          placeholder=""
          id="comment"
          label="Технические требования к заказу"
        />
        <div class="fast-purchase-form__file">
          <div class="file-input">
            
            <label for="file-input" class="file-input__label"
              >
              <span v-if="!file">Перетащите или <ButtonLink>выберите файлы</ButtonLink> для загрузки</span>
              <span v-else>Файлов приложено: {{ file.length }}</span>
              </label
            >
            <input multiple id="file-input" class="file-input__input" type="file" @change="onFileAdded" />
          </div>
        </div>
        <ButtonSolid class="fast-purchase-form__submit" type="submit" @click="onSubmit"
          >Отправить</ButtonSolid
        >
      </form>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
const isShown = defineModel<boolean>()

const auth = useAuth()

const formValues = ref({
  name: '',
  contactMethod: 'phone',
  phone: '',
  email: '',
  comment: ''
})

watch(isShown, () => {
  file.value = null

  if (auth.user.value) {
    formValues.value.name = auth.user.value.name ?? ''
    formValues.value.email = auth.user.value.email ?? ''
    formValues.value.phone = auth.user.value.phone ?? ''
  }
})

const file = ref<FileList | null>(null)
const invalidFields = ref<string[]>([])

const options = [
  { label: 'Телефон', value: 'phone' },
  { label: 'Telegram', value: 'telegram' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Email', value: 'email' }
]

function onFileAdded(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    file.value = target.files
  }
}

function validateForm(): boolean {
  invalidFields.value = []

  if (!formValues.value.name.trim()) invalidFields.value.push('name')

  if (formValues.value.contactMethod === 'email') {
    const email = formValues.value.email.trim()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!email || !validEmail) invalidFields.value.push('email')
  } else {
    const phone = formValues.value.phone.trim()
    if (!phone || phone.length < 10) invalidFields.value.push('phone')
  }

  return invalidFields.value.length === 0
}

async function onSubmit() {
  if (!validateForm()) return

  const formData = new FormData()

  Object.entries(formValues.value).forEach(([key, value]) => {
    formData.append(key, value)
  })

  if (file.value) {
    for (let i = 0; i < file.value.length; i++) {
      formData.append('files', file.value[i])
    }
  }

  try {
    const api = useApi()

    await api.post('/orders/fast-order', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    alert('Заявка отправлена')
    isShown.value = false
  } catch (err) {
    console.error('Ошибка отправки формы', err)
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 600px;

  &__subheader {
    margin-bottom: $normal_gap;
    font-size: $font-size_normal;
  }
}

:deep(.select__selected) {
  background-color: $light_gray_background_color;
}

.fast-purchase-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $normal_gap;

  &__submit {
    grid-column: span 2;
    margin-top: $normal_gap;
  }

  &__comment {
    grid-column: span 2;
  }

  &__file {
    position: relative;
    grid-column: span 2;
    height: 44px;
    background-color: $light_gray_background_color;
    border-radius: $border_radius_small;
    border: 1px dashed $primary_border_color;
    transition: $all_transition;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
}

.file-input {
  position: relative;
  height: 44px;
  cursor: pointer;

  &__label {
    width: 60%;
    position: absolute;
    font-size: $font-size_normal;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
  }

  &__input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    opacity: 0;
  }
}
</style>
