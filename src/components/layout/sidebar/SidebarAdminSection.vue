<template>
  <div class="sidebar-section">
    <!-- 회색 소제목 -->
    <p class="section-label">관리자</p>

    <!-- 하위 그룹: CS 퀴즈 -->
    <SidebarAdminCsQuizGroup />

    <!-- 하위 그룹: IT 기사 -->
    <SidebarAdminItArticleGroup />

    <!-- 하위 그룹: 회원 신고 -->
    <SidebarAdminReportGroup />
  </div>
</template>

<script setup>
import SidebarAdminCsQuizGroup from './SidebarAdminCsQuizGroup.vue'
import SidebarAdminItArticleGroup from './SidebarAdminItNewsGroup.vue'
import SidebarAdminReportGroup from './SidebarAdminReportGroup.vue'
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
