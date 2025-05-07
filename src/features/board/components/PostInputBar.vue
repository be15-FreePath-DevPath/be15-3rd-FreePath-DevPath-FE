<template>
  <div class="post-input-bar">
    <!-- 카테고리 -->
    <div class="form-group">
      <label for="category">카테고리</label>
      <select
          id="category"
          :value="category"
          @change="onCategoryChange"
      >
        <option disabled value="">카테고리를 선택하세요</option>
        <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
        >
          {{ cat.label }}
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
      <QuillEditor
          theme="snow"
          :toolbar="toolbar"
          v-model:content="editorContent"
          contentType="html"
          @ready="onEditorReady"
          @update:content="$emit('update:content', editorContent)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { uploadTempImage } from '@/features/board/api.js'

// Props & Emits
const props = defineProps({
  category: String,
  title: String,
  content: String
})
const emit = defineEmits([
  'update:category',
  'update:title',
  'update:content',
  'add-used-image'
])

// 카테고리 목록 및 선택 처리
const categories = [
  { id: 1, label: '자유게시판' },
  { id: 2, label: '직무 정보 게시판' },
  { id: 3, label: '프로젝트 매칭 게시판' }
]
const onCategoryChange = (event) => {
  emit('update:category', event.target.value)
}

// 에디터 바인딩 값
const editorContent = ref(props.content)

// 툴바 설정
const toolbar = [
  ['bold', 'italic', 'underline'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image']
]

// 에디터 인스턴스 초기화 시 이미지 핸들러 설정
const onEditorReady = (quill) => {
  const toolbar = quill.getModule('toolbar')
  toolbar.addHandler('image', () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      try {
        const res = await uploadTempImage(file)
        const imageUrl = res.data.url
        const range = quill.getSelection()
        quill.insertEmbed(range.index, 'image', imageUrl)
        emit('add-used-image', imageUrl)
      } catch (e) {
        console.error('이미지 업로드 실패:', e)
        alert('이미지 업로드에 실패했습니다.')
      }
    }
  })
}
</script>

<style scoped>
.post-input-bar {
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.form-group {
  margin-bottom: 16px;
}

::v-deep(.ql-editor) {
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
