<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="content">
    <div class="text-area">
      <div class="text">{{ label }}</div>
    </div>
    <input
        class="input-area"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
    />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.text-area {
  height: 20px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.text {
  color: #ffffff;
  font-size: 12px;
  line-height: 20px;
}

.input-area {
  background-color: #ffffff;
  height: 28px;
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 0 8px;
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
  box-shadow:
      inset 3px 3px 6px #ccdbe8,
      inset -3px -3px 6px 1px #FFFFFF;
}
</style>
