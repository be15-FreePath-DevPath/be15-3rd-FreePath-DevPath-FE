<script setup>
import { ref } from 'vue'
import MyPageContentMenu from "@/features/mypage/components/MyPageContentMenu.vue";
import MyPageContentList from "@/features/mypage/components/MyPageContentList.vue";
import PagingBar from "@/components/common/PagingBar.vue";

const selectedMain = ref('게시글') // 기본 값
const selectedSub = ref('작성한 게시물') // 기본 값

const handleSelectMain = (menu) => {
  selectedMain.value = menu
  selectedSub.value = menu === '게시글' ? '작성한 게시물' : '작성한 댓글'
}

const handleSelectSub = (menu) => {
  selectedSub.value = menu
}

// ✅ Paging 관련 상태
const currentPage = ref(1)
const totalPages = ref(10) // 임시 값 (예: 10페이지까지 있다고 가정)
const totalItems = ref(100) // 임시 값 (예: 총 100개 아이템)

const handlePageChange = (page) => {
  currentPage.value = page
  // 페이지 변경 시 데이터 재조회 로직 위치
}
</script>

<template>
  <MyPageContentMenu
      :selectedMain="selectedMain"
      :selectedSub="selectedSub"
      @selectMain="handleSelectMain"
      @selectSub="handleSelectSub"
  />

  <MyPageContentList
      :selectedMain="selectedMain"
      :selectedSub="selectedSub"
  />

  <PagingBar
      :total-items="totalItems"
      :total-pages="totalPages"
      :current-page="currentPage"
      @page-changed="handlePageChange"
  />
</template>

<style scoped>
</style>
