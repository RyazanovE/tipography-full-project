import { pechatVizitokPrices } from '../constants/pechat-vizitok'

export interface VizitkiFormData {
  material: string
  size: string
  designType: string
  color: string
  format: string
  amount: string
  productionTime: string
  lamination: string
  corners: boolean
  holes: boolean
}

export interface Step {
  label: string
  description: string
}

export const useVizitkiPage = () => {
  // State
  const currentStep = ref(0)
  const isMockupError = ref(false)
  const files = ref<FileList | null>(null)

  const formValue = ref<VizitkiFormData>({
    material: 'Мелованная бумага',
    size: '90x50 мм',
    designType: 'Использовать свой макет',
    color: 'Черно-белая',
    format: 'Двусторонняя',
    amount: '100',
    productionTime: 'Стандартное 1-2 рабочих дня',
    lamination: 'Не требуется',
    corners: false,
    holes: false
  })

  // Constants
  const steps: Step[] = [
    {
      label: 'Выбор формата макета',
      description: 'Выберите макет или доверьте дизайн нам'
    },
    {
      label: 'Расчет стоимости',
      description: 'Расчет стоимости и сроков изготовления'
    },
  ]

  // Composables
  const cart = useCart()
  const { notify } = useNotification()

  // Computed
  const summ = computed(() => {
    try {
      const printColor = formValue.value.color === 'Черно-белая' ? 1 : 4
      const printTypeParsed =
        printColor + '+' + (formValue.value.format === 'Односторонняя' ? '0' : printColor)
      const amount = Number(formValue.value.amount)
      const index = Math.floor(amount / 100) - 1
      const prices = pechatVizitokPrices[formValue.value.material][printTypeParsed]
      return prices[index] ?? 0
    } catch {
      return 0
    }
  })

  // Methods
  const addToCart = async () => {
    if (!files.value) {
      isMockupError.value = true
      return
    }

    const payload = new FormData()
    Array.from(files.value).forEach((file) => payload.append('files', file))
    payload.append(
      'options',
      JSON.stringify({
        ...formValue.value,
        summ: summ.value,
        type: 'Печать визиток',
        timestamp: Date.now()
      })
    )

    try {
      await cart.addToCart(payload)
      notify('Товар добавлен в корзину', 'success')
    } catch (error) {
      console.error(error)
      notify('Ошибка при добавлении в корзину', 'error')
    }
  }

  const onFileChange = () => {
    isMockupError.value = false
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep.value) {
      currentStep.value = stepIndex
    }
  }

  const goToNextStep = () => {
    currentStep.value = Math.min(currentStep.value + 1, steps.length - 1)
  }

  const goToPreviousStep = () => {
    currentStep.value = Math.max(currentStep.value - 1, 0)
  }

  const resetForm = () => {
    formValue.value = {
      material: 'Мелованная бумага',
      size: '90x50 мм',
      designType: 'Использовать свой макет',
      color: 'Черно-белая',
      format: 'Двусторонняя',
      amount: '100',
      productionTime: 'Стандартное 1-2 рабочих дня',
      lamination: 'Не требуется',
      corners: false,
      holes: false
    }
    files.value = null
    isMockupError.value = false
  }

  return {
    // State
    currentStep: readonly(currentStep),
    isMockupError: readonly(isMockupError),
    files,
    formValue,

    // Constants
    steps,

    // Computed
    summ,

    // Methods
    addToCart,
    onFileChange,
    handleStepClick,
    goToNextStep,
    goToPreviousStep,
    resetForm,

    // Actions
    setCurrentStep: (step: number) => currentStep.value = step,
    setFiles: (newFiles: FileList | null) => files.value = newFiles,
    setFormValue: (newValue: Partial<VizitkiFormData>) => {
      formValue.value = { ...formValue.value, ...newValue }
    }
  }
}
