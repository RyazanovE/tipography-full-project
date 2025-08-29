<template>
  <UiCard class="contact-info">
    <UiSubHeader class="contact-info__title">
      2. Добавление контактных данных
    </UiSubHeader>
    
    <div class="contact-info__form-fields">
      <!-- FIO Fields in Flex Container -->
      <div class="contact-info__fio-container">
        <UiInput
          v-model="firstName"
          :disabled="disabled"
          required
          label="Имя"
          placeholder="Иван"
          id="firstName"
          :error="errors.includes('fio')"
        />
        <UiInput
          v-model="lastName"
          :disabled="disabled"
          required
          label="Фамилия"
          placeholder="Иванов"
          id="lastName"
          :error="errors.includes('fio')"
        />
        <UiInput
          v-model="middleName"
          :disabled="disabled"
          label="Отчество (необязательно)"
          placeholder="Иванович"
          id="middleName"
        />
      </div>
      
      <UiInput
        v-model="clientInfo.email"
        :disabled="disabled"
        required
        label="Почта"
        placeholder="example@mail.com"
        id="email"
        :error="errors.includes('email')"
      />
      <UiInput
        v-model="clientInfo.phone"
        :disabled="disabled"
        required
        label="Телефон"
        placeholder="+7 (___) ___-__-__"
        mask="phone"
        id="phone"
        :error="errors.includes('phone')"
      />
      <UiInput
        v-model="clientInfo.phoneBackup"
        :disabled="disabled"
        label="Дополнительный телефон"
        placeholder="+7 (___) ___-__-__"
        mask="phone"
        id="phone-backup"
        :error="errors.includes('phoneBackup')"
      />
    </div>

    <div class="contact-info__actions">
      <ButtonSolid
        @click="$emit('continue')"
        :disabled="!isFormValid"
      >
        Продолжить
      </ButtonSolid>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { ClientInfo } from '~/types/orders'

interface ContactInfoProps {
  clientInfo: ClientInfo
  errors: string[]
  disabled?: boolean
}

interface ContactInfoEmits {
  continue: []
  'update:clientInfo': [ClientInfo]
}

const props = withDefaults(defineProps<ContactInfoProps>(), {
  disabled: false
})

const emit = defineEmits<ContactInfoEmits>()

// Split FIO into separate fields
const firstName = ref('')
const lastName = ref('')
const middleName = ref('')

// Initialize separate fields from combined FIO
onMounted(() => {
  if (props.clientInfo.fio) {
    const fioParts = props.clientInfo.fio.split(' ')
    firstName.value = fioParts[0] || ''
    lastName.value = fioParts[1] || ''
    middleName.value = fioParts[2] || ''
  }
})

// Watch for changes in separate fields and update the combined FIO
watch([firstName, lastName, middleName], () => {
  const fioParts = [firstName.value, lastName.value, middleName.value].filter(part => part.trim())
  props.clientInfo.fio = fioParts.join(' ')
}, { deep: true })

// Watch for changes in the combined FIO and update separate fields
watch(() => props.clientInfo.fio, (newFio) => {
  if (newFio && !firstName.value && !lastName.value && !middleName.value) {
    const fioParts = newFio.split(' ')
    firstName.value = fioParts[0] || ''
    lastName.value = fioParts[1] || ''
    middleName.value = fioParts[2] || ''
  }
})

const isFormValid = computed(() => {
  return firstName.value && 
         lastName.value && 
         props.clientInfo.email && 
         props.clientInfo.phone
  // phoneBackup and middleName are optional, so we don't validate them
})
</script>

<style lang="scss" scoped>
.contact-info {
  margin-bottom: $normal_gap;

  &__title {
    margin-bottom: $normal_gap;
    font-size: 1.1rem;
    font-weight: 600;
  }

  &__form-fields {
    display: flex;
    flex-direction: column;
    gap: $normal_gap;
  }

  &__fio-container {
    display: flex;
    gap: $normal_gap;
    
    /* Responsive design for FIO fields */
    @media (max-width: 768px) {
      flex-direction: column;
      gap: $normal_gap;
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
