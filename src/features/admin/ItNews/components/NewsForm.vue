<template>
  <div class="form">
    <label>
      제목
      <input v-model="modelValue.title" :readonly="isReadOnly" />
    </label>

    <label>
      링크
      <template v-if="isReadOnly">
        <a
            :href="modelValue.link"
            target="_blank"
            rel="noopener noreferrer"
            style="display: block; padding: 10px; background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 5px; color: #1a0dab; word-break: break-all;"
        >
          {{ modelValue.link || '링크 없음' }}
        </a>
      </template>
      <template v-else>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <input v-model="modelValue.link" />
          <a
              v-if="modelValue.link"
              :href="modelValue.link"
              target="_blank"
              rel="noopener noreferrer"
              style="color: #1a0dab; font-size: 14px;"
          >
            링크 열기
          </a>
        </div>
      </template>
    </label>

    <label>
      내용
      <textarea v-model="modelValue.content" :readonly="isReadOnly" />
    </label>

    <label>
      발송일
      <input type="date" v-model="formattedMailingDate" :readonly="isReadOnly" />
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Object,
  isReadOnly: Boolean
})

const emit = defineEmits(['update:modelValue'])

// 날짜 문자열 포맷 (YYYY-MM-DD)
const formattedMailingDate = computed({
  get() {
    return props.modelValue?.mailingDate?.substring(0, 10) || ''
  },
  set(val) {
    emit('update:modelValue', {
      ...props.modelValue,
      mailingDate: val
    })
  }
})
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  font-size: 16px;
  font-weight: 500;
}

input, textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

textarea {
  resize: vertical;
  min-height: 150px;
}

input[readonly], textarea[readonly] {
  background-color: #f5f5f5;
}
</style>
