<template>
  <div class="sidebar-section">
    <!-- 회색 소제목 -->
    <p class="section-label">마이페이지</p>

    <!-- 하위 그룹: 마이페이지 -->
    <SidebarMyPageGroup />

    <!-- 하위 그룹: 개발자 성향 테스트 -->
    <SidebarDevtiGroup />
  </div>
</template>

<script setup>
import SidebarMyPageGroup from './SidebarMyPageGroup.vue'
import SidebarDevtiGroup from './SidebarDevtiGroup.vue'
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
</style>
