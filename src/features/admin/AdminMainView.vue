<script setup>
import { ref ,onMounted} from 'vue'
import NewsList from '@/features/admin/ItNews/components/NewsList.vue'
//import ReportList from '@/components/admin/ReportList.vue'
import CsQuizList from '@/features/admin/csquiz/components/CsQuizList.vue'
import LayoutDefault from '@/components/layout/LayoutDefault.vue'

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
  <layout-default>
    <div class="admin-main">
      <!-- 탭 버튼 -->
      <section class="tab-buttons">
        <button
            :class="{ active: selectedTab === 'news' }"
            @click="selectedTab = 'news'"
        >
          IT 뉴스
        </button>
        <button
            :class="{ active: selectedTab === 'report' }"
            @click="selectedTab = 'report'"
        >
          신고
        </button>
        <button
            :class="{ active: selectedTab === 'quiz' }"
            @click="selectedTab = 'quiz'"
        >
          CS 퀴즈
        </button>
      </section>


      <!-- 콘텐츠 영역 -->
      <section class="content-area">
        <NewsList v-if="selectedTab === 'news'" :ItNews="ItNews"/>
        <!--      <ReportList v-else-if="selectedTab === 'report'" />-->
        <CsQuizList v-else-if="selectedTab === 'quiz'"/>
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
  </layout-default>
</template>

<style scoped>
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

/* 탭 버튼 영역 */
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

/* 선택된 탭 스타일 */
.tab-buttons button.active {
  background-color: #b3b3b3;
}

/* 콘텐츠 영역 */
.content-area {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

/* 하단 버튼 */
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

