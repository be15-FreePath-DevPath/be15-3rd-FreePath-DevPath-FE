<template>
  <div class="sidebar-section">
    <!-- 섹션 헤더 (아이콘 + 제목 + 토글 화살표) -->
    <div class="section-header" @click="toggleOpen">
      <img :src="arrowIcon" alt="토글" class="arrow-icon" />
      <img :src="devtiIcon" alt="성향 아이콘" class="section-icon" />
      <span class="section-title">개발자 성향 테스트</span>
    </div>

    <!-- 하위 메뉴 리스트 컨테이너 -->
    <div v-if="isOpen" class="menu-list">
      <SidebarItem text="개발자 성향 테스트 응시" to="/mypage/devti/solve" />
      <SidebarItem text="개발자 성향 테스트 결과" to="/mypage/devti/result" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SidebarItem from '@/components/common/SidebarItem.vue'

import arrowDown from '@/assets/images/common/sidebar/ArrowDown.png'
import arrowRight from '@/assets/images/common/sidebar/ArrowRight.png'
import devtiIcon from '@/assets/images/common/sidebar/sidebar-devti-icon.png'

const isOpen = ref(true)
const toggleOpen = () => (isOpen.value = !isOpen.value)
const arrowIcon = computed(() => (isOpen.value ? arrowDown : arrowRight))
</script>

<style scoped>
/* 전체 섹션 컨테이너 */
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
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
