<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NewsList from '@/features/admin/ItNews/components/NewsList.vue'
import CsQuizList from '@/features/admin/csquiz/components/CsQuizList.vue'
import { getNewsList } from '@/features/admin/ItNews/api.js'
import ReportList from "@/features/admin/report/components/ReportList.vue";

const newBreadCrumbItems = ref(['관리자페이지']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
});

const route = useRoute()
const router = useRouter()
const ItNews = ref([])

const fetchNews = async () => {
  try {
    const response = await getNewsList()
    ItNews.value = response.data.data.news
  } catch (e) {
    console.error('뉴스 불러오기 실패', e)
  }
}

onMounted(() => {
  if (!route.query.tab) {
    // 기본값으로 news 탭 설정
    router.replace({ path: '/admin', query: { tab: 'news' } })
  } else if (route.query.tab === 'news') {
    fetchNews()
  }
})
// tab 변경 감지 시 뉴스 새로고침
watch(() => route.query.tab, (newTab) => {
  if (newTab === 'news') {
    fetchNews()
  }
})
// 탭 클릭 시 URL 쿼리 갱신
const selectTab = (tabName) => {
  router.push({ path: '/admin', query: { tab: tabName } })
}

const goToAddNews = () => router.push('/admin/news/write')
const goToAddQuiz = () => router.push('/admin/csquiz/write')
</script>

<template>
  <div class="admin-main">
    <!-- 탭 버튼 -->
    <section class="tab-buttons">
      <button
          :class="{ active: $route.query.tab === 'news' }"
          @click="selectTab('news')"
      >
        IT 뉴스
      </button>
      <button
          :class="{ active: $route.query.tab === 'report' }"
          @click="selectTab('report')"
      >
        신고
      </button>
      <button
          :class="{ active: $route.query.tab === 'quiz' }"
          @click="selectTab('quiz')"
      >
        CS 퀴즈
      </button>
    </section>
    <div class="blank"></div>

    <!-- 콘텐츠 영역 -->
    <section class="content-area">
      <NewsList v-if="$route.query.tab === 'news'" :ItNews="ItNews" />
      <ReportList v-else-if="$route.query.tab === 'report'" />
      <CsQuizList v-else-if="$route.query.tab === 'quiz'" />
    </section>

    <!-- 하단 버튼 -->
    <div class="bottom-button" v-if="$route.query.tab === 'news'">
      <button @click="goToAddNews">뉴스 추가</button>
    </div>
    <div class="bottom-button" v-else-if="$route.query.tab === 'quiz'">
      <button @click="goToAddQuiz">CS 퀴즈 추가</button>
    </div>
  </div>
</template>

<style scoped>
.blank{
  width: 100%;
  height: 50px;
  background-color: #F7F9FB;
  border-radius: 15px;
}
.admin-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  font-family: 'Pretendard', sans-serif;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 120px;
  margin-bottom: 32px;
}

.tab-buttons button {
  width: 130px;
  height: 56px;
  background-color: #e9e9e9;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.tab-buttons button.active {
  background-color: #b3b3b3;
}

.content-area {
  width: 100%;
  display: flex;
  justify-content: center;
}

.bottom-button {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1200px;
  padding-top: 32px;
}

.bottom-button button {
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

.bottom-button button:hover {
  background-color: #1c1c1c;
  color: white;
}
</style>
