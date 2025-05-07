<template>
  <aside class="sidebar">
    <!-- 로고 영역 -->
    <SidebarLogo />

    <!-- 조건부 섹션 렌더링 -->
    <SidebarBoardSection v-if="isGuest || isUser || isAdmin" />
    <SidebarChatSection v-if="isUser || isGuest" />
    <SidebarSkillSection v-if="isUser || isGuest" />
    <SidebarMyPageSection v-if="isUser || isAdmin" />
    <SidebarAdminSection v-if="isAdmin" />
  </aside>
</template>

<script setup>
import SidebarLogo from './sidebar/SidebarLogo.vue'
import SidebarBoardSection from './sidebar/SidebarBoardSection.vue'
import SidebarChatSection from './sidebar/SidebarChatSection.vue'
import SidebarSkillSection from './sidebar/SidebarSkillSection.vue'
import SidebarMyPageSection from './sidebar/SidebarMyPageSection.vue'
import SidebarAdminSection from './sidebar/SidebarAdminSection.vue'
import { useAuthStore } from '@/stores/auth.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const auth = useAuthStore()
const { isAuthenticated, userRole } = storeToRefs(auth)

const isGuest = computed(() => !isAuthenticated.value)
const isUser = computed(() => isAuthenticated.value && userRole.value === 'USER')
const isAdmin = computed(() => isAuthenticated.value && userRole.value === 'ADMIN')
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
