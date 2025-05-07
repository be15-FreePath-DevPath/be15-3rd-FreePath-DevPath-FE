<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { logoutUser } from '@/features/user/api.js'

const emit = defineEmits(['navToggle'])
const navToggle = () => {
  emit('navToggle', { navToggled: true })
}

defineProps({
  breadcrumbItems: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  try {
    await logoutUser()
  } catch (e) {
    console.error('로그아웃 API 실패', e)
  }
  authStore.clearAuth()
  await router.push('/user/login')
}
</script>

<template>
  <div class="header">
    <div class="breadcrumb">
      <button class="nav-toggle" @click="navToggle">
        <img src="@/assets/images/common/header/navToggle.png" alt="아이콘" class="icon" />
      </button>
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <span v-if="index !== 0" class="slash">/</span>
        <span :class="['breadcrumb-item', { gray: index === 0 }]">
          {{ item }}
        </span>
      </template>
    </div>

    <div class="user-actions">
      <template v-if="authStore.isAuthenticated">
        <button class="user-button" @click="handleLogout">로그아웃</button>
      </template>

      <template v-else>
        <RouterLink to="/user/login" class="user-button">로그인</RouterLink>
        <RouterLink to="/user/signup" class="user-button">회원 가입</RouterLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
.header {
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  height: 68px;
  justify-content: space-between;
  padding: 20px 28px;
}

.nav-toggle {
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
}

.breadcrumb {
  align-items: center;
  display: inline-flex;
  gap: 8px;
}

.user-actions {
  align-items: center;
  display: inline-flex;
  gap: 20px;
  padding-right: 20px;
}

.user-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 4px;
  font-size: 14px;
  text-decoration: none;
}

.gray {
  color: rgba(0, 0, 0, 0.4) !important;
}

.slash {
  color: rgba(0, 0, 0, 0.2);
}
</style>
