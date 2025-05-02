<script setup>
import { ref ,onMounted} from 'vue'
import NewsList from '@/features/admin/ItNews/components/NewsList.vue'
//import ReportList from '@/components/admin/ReportList.vue'
//import CSQuizList from '@/components/admin/CSQuizList.vue'
import { useRouter } from 'vue-router'
import {getNewsList} from "@/features/admin/ItNews/api.js";

const selectedTab = ref('news')
const router = useRouter()
const ItNews = ref([]);

const goToAddNews = () => {
  router.push('/admin/news/write') // 실제 경로에 맞게 조정
}

const goToAddQuiz = () => {
  router.push('/admin/csquiz/write') // 실제 경로에 맞게 조정
}

const fetchNews = async () => {
  try {
    const response = await getNewsList()
    console.log(response)
    ItNews.value = response.data.data.news
  } catch (e) {
    console.error('뉴스 불러오기 실패', e)
  }
}


onMounted(fetchNews)
</script>

<template>
  <div class="admin-main">
    <!-- 탭 버튼 -->
    <section class="tab-buttons">
      <button @click="selectedTab = 'news'">IT 뉴스</button>
      <button @click="selectedTab = 'report'">신고</button>
      <button @click="selectedTab = 'quiz'">CS 퀴즈</button>
    </section>

    <!-- 콘텐츠 영역 -->
    <section class="content-area">
      <NewsList v-if="selectedTab === 'news'" :ItNews="ItNews"/>
      <ReportList v-else-if="selectedTab === 'report'" />
      <CSQuizList v-else-if="selectedTab === 'quiz'" />
    </section>

    <!-- 하단 버튼 -->
    <div class="bottom-button" v-if="selectedTab === 'news'">
      <button @click="goToAddNews">뉴스 추가</button>
    </div>
    <div class="bottom-button" v-else-if="selectedTab === 'quiz'">
      <button @click="goToAddQuiz">CS 퀴즈 추가</button>
    </div>
    <!-- 신고에는 버튼 없음 -->
  </div>
</template>


