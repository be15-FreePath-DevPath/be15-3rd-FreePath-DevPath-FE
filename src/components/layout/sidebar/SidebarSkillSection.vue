<template>
  <div class="sidebar-section">
    <!-- 회색 소제목 -->
    <p class="section-label">개발자 역량 강화</p>

    <!-- 하위 그룹: CS 퀴즈 -->
    <SidebarSkillQuizGroup />

    <!-- 하위 그룹: 모의 면접 -->
    <SidebarSkillInterviewGroup />
  </div>
</template>

<script setup>
import SidebarSkillQuizGroup from './SidebarSkillQuizGroup.vue'
import SidebarSkillInterviewGroup from './SidebarSkillInterviewGroup.vue'
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

/* 검은색 섹션 제목 텍스트 */
.section-title {
  font-size: 14px;
  font-weight: 500;
  color: #1c1c1c;
}
</style>
