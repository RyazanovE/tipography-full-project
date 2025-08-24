<template>
  <div class="input">
    <label v-if="label" class="input__label" :for="id">
      <span>
        {{ label }}
      </span>
      <MdiIcon v-if="required" icon="mdiAsterisk" class="input__required-icon" />
    </label>
    <input
      v-if="!textarea"
      ref="inputRef"
      class="input__control"
      :class="{ input__control_error: error, input__control_disabled: disabled }"
      :id="id"
      :disabled="disabled"
      :type="type ?? 'text'"
      v-model="model"
      :placeholder="placeholder"
    />
    <textarea
      v-else
      class="input__control input__control--textarea"
      :id="id"
      v-model="model"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import IMask from 'imask'

const props = defineProps<{
  id: string
  disabled?: boolean
  placeholder: string
  label?: string
  textarea?: boolean
  type?: string
  error?: boolean
  mask?: 'phone' | 'email'
  required?: boolean
}>()

const model = defineModel<string>()
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  const el = inputRef.value

  if (el && props.mask === 'phone') {
    IMask(el, { mask: '+{7} (000) 000-00-00' })
  }
})
</script>

<style scoped lang="scss">
.input__control_disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none !important;

  &:hover {
    box-shadow: none;
  }
}

.input {
  display: flex;
  flex-direction: column;

  &__label {
    display: flex;
    font-size: $font-size_normal;
    margin-bottom: calc($normal_gap / 4);
  }

  &__required-icon {
    height: 7px;
    margin-top: 3px;

    & > * {
      fill: red;
    }
  }

  &__control {
    background-color: $light_gray_background_color;
    border-radius: $border_radius_small;
    padding: calc($normal_gap / 2) $normal_gap;
    resize: none;
    border: 1px solid $primary_border_color;
    transition: $all-transition;

    &:hover {
      box-shadow: $box_shadow_normal;
    }

    &--textarea {
      height: 88px;
    }

    &_error {
      border-color: red;
    }
  }
}
</style>
