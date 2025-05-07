<script setup>
import { ref } from 'vue'
import MyPageContentMenu from "@/features/mypage/components/MyPageContentMenu.vue";
import MyPageContentList from "@/features/mypage/components/MyPageContentList.vue";

const selectedMain = ref('게시글') // 기본 값
const selectedSub = ref('작성한 게시물') // 기본 값

const handleSelectMain = (menu) => {
  selectedMain.value = menu
  selectedSub.value = menu === '게시글' ? '작성한 게시물' : '작성한 댓글'
}

const handleSelectSub = (menu) => {
  selectedSub.value = menu
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

</template>

<style scoped>
</style>
