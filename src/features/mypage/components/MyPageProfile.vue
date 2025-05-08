<script setup>
import { ref, onMounted } from 'vue'
import { userInfo } from '@/features/mypage/api.js'
import MyPageButtonUpdate from '@/features/mypage/components/MyPageButtonUpdate.vue'

// 초기 값 세팅 (에러 방지용)
const user = ref({
  loginId: '',
  email: '',
  userName: '',
  nickname: '',
  developerPersonality: '',
  itNewsSubscription: '' // 여기도 초기화 필요
})

onMounted(async () => {
  try {
    const res = await userInfo()
    user.value = {
      loginId: res.data.data.loginId || '',
      email: res.data.data.email || '',
      userName: res.data.data.userName || '',
      nickname: res.data.data.nickname || '',
      developerPersonality: res.data.data.developerPersonality || '',
      itNewsSubscription: res.data.data.itNewsSubscription || ''
    }
  } catch (error) {
    console.error('유저 정보 조회 실패:', error)
  }
})
</script>

<template>
  <div class="content">
    <img src="@/assets/images/mypage/profile.png" alt="profile img" />
    <div class="user-info">
      <div class="profile-text">{{ user.nickname || '-' }}</div>
      <div class="profile-text">{{ user.email || '-' }}</div>
      <div class="profile-text">로그인 ID : {{ user.loginId || '-' }}</div>
      <div class="profile-text">IT 기사 구독 : {{ user.itNewsSubscription || '-' }}</div>
      <div class="profile-text">개발자 성향 테스트 : {{ user.developerPersonality || '' }}</div>
    </div>
  </div>
  <div class="button-area">
    <MyPageButtonUpdate
        text="내 정보 수정하기"
        goTo="/mypage/edit"
    />
  </div>
</template>

<style scoped>
.content {
  padding: 12px 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 41px;
  position: relative;
}

.user-info {
  width: 198px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
}

.profile-text {
  font-size: 14px;
}

.button-area {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
</style>
