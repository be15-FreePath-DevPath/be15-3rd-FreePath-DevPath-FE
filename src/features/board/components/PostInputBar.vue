<template>
  <div class="post-input-bar">
    <!-- 카테고리 -->
    <div class="form-group">
      <label for="category">카테고리</label>
      <select
          id="category"
          :value="category"
          @change="$emit('update:category', $event.target.value)"
      >
        <option disabled value="">카테고리를 선택하세요</option>
        <option
            v-for="cat in categories"
            :key="cat"
            :value="cat"
        >
          {{ cat }}
        </option>
      </select>
    </div>

    <!-- 제목 -->
    <div class="form-group">
      <label for="title">제목</label>
      <input
          id="title"
          type="text"
          :value="title"
          placeholder="제목을 입력하세요"
          @input="$emit('update:title', $event.target.value)"
      />
    </div>

    <!-- Quill 에디터 -->
    <div class="form-group">
      <QuillEditor theme="snow" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  category: { type: String, default: '' },
  title:    { type: String, default: '' },
  content:  { type: String, default: '' }
})
const emit = defineEmits([
  'update:category',
  'update:title',
  'update:content'
])

const categories = [
  '자유게시판',
  '프로젝트 매칭 게시판',
  '질문게시판'
]
</script>

<style scoped>
.post-input-bar {
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.form-group {
  margin-bottom: 16px;
}

/deep/ .ql-editor {
  min-height: 400px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  color: #333;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
