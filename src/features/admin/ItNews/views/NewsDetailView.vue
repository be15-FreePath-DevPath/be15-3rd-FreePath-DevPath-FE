<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep, isEqual } from 'lodash'
import NewsForm from '@/features/admin/ItNews/components/NewsForm.vue'
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
    const { data: responseData } = await getNewsDetail(id)
    const newsData = responseData
    if (newsData) {
      originalNews.value = cloneDeep(newsData)
      currentNews.value = cloneDeep(newsData)
    } else {
      console.error('뉴스 데이터가 없습니다.')
      alert('뉴스 데이터를 불러오는 데 실패했습니다. 데이터가 존재하지 않거나 형식이 잘못되었습니다.')
      goToList();
    }
  } catch (e) {
    console.error('뉴스 불러오기 실패:', e)
    alert('뉴스 데이터를 불러오는 데 실패했습니다.')
    goToList();
  }
}

watch(currentNews, (newVal) => {
  isModified.value = !isEqual(newVal, originalNews.value)
}, { deep: true })

const isSentOrPast = computed(() => {
  if (!currentNews.value?.mailingDate) {
    return false;
  }
  try {
    const mailing = new Date(currentNews.value.mailingDate);
    mailing.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return mailing <= today;
  } catch (e) {
    console.error("날짜 비교 오류:", e);
    return false;
  }
});


const isValid = computed(() => {
  return (
      currentNews.value &&
      currentNews.value.title?.trim() &&
      currentNews.value.content?.trim()
  )
})

const goToList = () => {
  router.push({ path: '/admin', query: { tab: 'news', reload: true } })
}

const handleUpdate = async () => {
  if (!isValid.value || !isModified.value) {
    alert('수정할 내용이 없거나 필수 입력 항목이 누락되었습니다.');
    return;
  }
  if (isSentOrPast.value) {
    alert('이미 발송되었거나 발송일이 지난 뉴스는 수정할 수 없습니다.');
    return;
  }
  if (!confirm('정말 수정하시겠습니까?')) {
    return;
  }
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
    goToList();
  } catch (e) {
    console.error('뉴스 수정 실패:', e)
    alert('뉴스 수정에 실패했습니다.')
  }
}

const handleSend = async () => {
  if (isSentOrPast.value) {
    alert('이미 발송되었거나 발송일이 지난 뉴스는 다시 발송할 수 없습니다.');
    return;
  }
  if (!confirm('정말 이 뉴스를 발송하시겠습니까?')) {
    return;
  }
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
  if (isSentOrPast.value) {
    alert('이미 발송되었거나 발송일이 지난 뉴스는 삭제할 수 없습니다.');
    return;
  }
  if (!confirm('정말 이 뉴스를 삭제하시겠습니까?')) {
    return;
  }
  try {
    await deleteNews(newsId)
    alert('뉴스가 삭제되었습니다.')
    goToList()
  } catch (e) {
    console.error('뉴스 삭제 실패:', e)
    alert('뉴스 삭제에 실패했습니다.')
  }
}

</script>

<template>
  <div v-if="currentNews && currentNews.itNewsId" class="detail-wrapper">
    <NewsForm v-model="currentNews" :isReadOnly="isSentOrPast" />
    <div class="button-area">
      <button @click="goToList">목록</button>

      <button v-if="!isSentOrPast" @click="handleDelete">삭제</button>
      <button v-if="!isSentOrPast" @click="handleSend">발송</button>
      <button
          v-if="!isSentOrPast"
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
