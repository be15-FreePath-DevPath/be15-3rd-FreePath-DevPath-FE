<template>
  <aside class="sidebar">
    <!-- 로고 영역 -->
    <SidebarLogo />

    <!-- 섹션별 사이드바 조각들 -->
    <SidebarBoardSection />
    <SidebarChatSection />
    <SidebarSkillSection />
    <SidebarMyPageSection />
    <SidebarAdminSection />
  </aside>
</template>

<script setup>
import SidebarLogo from './sidebar/SidebarLogo.vue'
import SidebarBoardSection from './sidebar/SidebarBoardSection.vue'
import SidebarChatSection from './sidebar/SidebarChatSection.vue'
import SidebarSkillSection from './sidebar/SidebarSkillSection.vue'
import SidebarMyPageSection from './sidebar/SidebarMyPageSection.vue'
import SidebarAdminSection from './sidebar/SidebarAdminSection.vue'
</script>

<style scoped>
.sidebar {
  width: 270px;
  height: 100vh;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: 1px solid rgba(28, 28, 28, 0.1);
  background-color: #fff;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

</style>
