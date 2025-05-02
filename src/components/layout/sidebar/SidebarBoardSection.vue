<template>
  <div class="sidebar-section">
    <!-- 섹션 소제목 -->
    <p class="section-label">게시판</p>

    <!-- 섹션 헤더 (화살표 + 아이콘 + 제목) -->
    <div class="section-header" @click="toggleOpen">
      <img :src="arrowIcon" alt="토글" class="arrow-icon" />
      <img :src="boardIcon" alt="게시판 아이콘" class="section-icon" />
      <span class="section-title">게시판</span>
    </div>

    <!-- 펼침 상태일 때만 메뉴 표시 -->
    <div v-if="isOpen" class="menu-list">
      <SidebarItem text="자유 게시판" to="/board/free" />
      <SidebarItem text="직무 정보 게시판" to="/board/job" />
      <SidebarItem text="프로젝트 매칭 게시판" to="/board/project" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SidebarItem from '@/components/common/SidebarItem.vue'

// 이미지 import
import arrowDown from '@/assets/images/common/sidebar/ArrowDown.png'
import arrowRight from '@/assets/images/common/sidebar/ArrowRight.png'
import boardIcon from '@/assets/images/common/sidebar/sidebar-board-icon.png'

const isOpen = ref(true)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const arrowIcon = computed(() => (isOpen.value ? arrowDown : arrowRight))
</script>

<style scoped>
/* 전체 섹션 컨테이너 */
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* 회색 소제목 */
.section-label {
  font-size: 14px;
  color: rgba(28, 28, 28, 0.4);
  padding-left: 8px;
  font-weight: 500;
  margin-bottom: 2px;
}

/* 섹션 헤더 (아이콘 + 제목 + 토글 화살표) */
.section-header {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 4px 8px;
}

/* 화살표 아이콘 (펼침/접힘) */
.arrow-icon {
  width: 16px;
  height: 16px;
}

/* 섹션의 대표 아이콘 */
.section-icon {
  width: 18px;
  height: 18px;
}

/* 검은색 섹션 제목 텍스트 */
.section-title {
  font-size: 14px;
  font-weight: 500;
  color: #1c1c1c;
}

/* 하위 메뉴 리스트 컨테이너 */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
