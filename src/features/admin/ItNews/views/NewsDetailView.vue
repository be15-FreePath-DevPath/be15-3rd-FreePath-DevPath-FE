<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep, isEqual } from 'lodash'
import NewsForm from '@/features/admin/ItNews/components/NewsForm.vue'
import LayoutDefault from '@/components/layout/LayoutDefault.vue'
import { deleteNews, getNewsDetail, sendNews, updateNews } from '@/features/admin/ItNews/api.js'

const router = useRouter()
const route = useRoute()
const newsId = route.params.id

const originalNews = ref({})
const currentNews = ref({})
const isModified = ref(false)

onMounted(async () => {
  await fetchNews(newsId)
})

async function fetchNews(id) {
  try {
    const response = await getNewsDetail(id)
    const newsData = response.data
    originalNews.value = cloneDeep(newsData)
    currentNews.value = cloneDeep(newsData)
  } catch (e) {
    console.error('뉴스 불러오기 실패:', e)
    alert('뉴스 데이터를 불러오는 데 실패했습니다.')
  }
}

watch(currentNews, (newVal) => {
  isModified.value = !isEqual(newVal, originalNews.value)
}, { deep: true })

const isPastDate = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return currentNews.value?.mailingDate < today
})

const isValid = computed(() => {
  return (
      currentNews.value?.title?.trim() &&
      currentNews.value?.content?.trim()
  )
})

const goToList = () => {
  router.push({ path: '/admin', query: { reload: true } })
}

const handleUpdate = async () => {
  const payload = {
    title: currentNews.value.title,
    content: currentNews.value.content,
    link: currentNews.value.link,
    mailingDate: currentNews.value.mailingDate
  }
  try {
    await updateNews(newsId, payload)
    alert('뉴스가 수정되었습니다.')
    originalNews.value = cloneDeep(currentNews.value)
    isModified.value = false
  } catch (e) {
    console.error('뉴스 수정 실패:', e)
    alert('뉴스 수정에 실패했습니다.')
  }
}

const handleSend = async () => {
  try {
    await sendNews(newsId)
    alert('뉴스가 발송되었습니다.')
    await fetchNews(newsId)
    goToList()
  } catch (e) {
    console.error('뉴스 발송 실패:', e)
    alert('뉴스 발송에 실패했습니다.')
  }
}

const handleDelete = async () => {
  try {
    await deleteNews(newsId)
    alert('뉴스가 삭제되었습니다.')
    goToList()
  } catch (e) {
    alert('뉴스 삭제에 실패했습니다.')
  }
}
</script>

<template>
    <div v-if="currentNews" class="detail-wrapper">
      <NewsForm v-model="currentNews" :isReadOnly="isPastDate" />
      <div class="button-area">
        <button @click="goToList">목록</button>
        <button v-if="!isPastDate" @click="handleDelete">삭제</button>
        <button v-if="!isPastDate" @click="handleSend">발송</button>
        <button
            v-if="!isPastDate"
            :disabled="!isModified || !isValid"
            @click="handleUpdate"
        >
          수정
        </button>
      </div>
    </div>
    <div v-else>
      <p>뉴스 데이터를 불러오는 중입니다...</p>
    </div>
</template>

<style scoped>
.detail-wrapper {
  width: 1116px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.button-area {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
.button-area button {
  width: 130px;
  height: 56px;
  background-color: #e9e9e9;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.button-area button:disabled {
  background-color: #cccccc;
  color: #666;
  cursor: not-allowed;
}
.button-area button:hover:enabled {
  background-color: #1c1c1c;
  color: white;
}
</style>
