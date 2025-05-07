<script setup>
import { ref, onMounted } from 'vue'
import { signupGoogle } from '@/features/user/api' // 여기서 가져옴

import UserForm from "@/features/user/components/UserForm.vue"
import UserLogo from "@/features/user/components/UserLogo.vue"
import UserInput from "@/features/user/components/UserInput.vue"
import UserItNewsSubWhite from "@/features/user/components/UserItNewsSub.vue"
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue"
import fourLeafClover from '@/assets/images/user/four_leaf_clover.png'

// 입력값 상태 관리
const nickname = ref('')
const itNewsSubscription = ref('')

// 이메일 상태도 ref로 관리
const email = ref('')

// 페이지가 열릴 때 URL 파라미터로 이메일 가져와서 localStorage에 저장
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const emailParam = params.get('email')
  if (emailParam) {
    localStorage.setItem('socialSignUpEmail', emailParam)
    email.value = emailParam
  } else {
    // localStorage에 저장된 값으로 fallback
    email.value = localStorage.getItem('socialSignUpEmail') || ''
  }
})

// 버튼 클릭 시 API 호출
const submitSocialSignup = async () => {
  try {
    await signupGoogle(email.value, nickname.value, itNewsSubscription.value)
    alert('회원가입 완료')
    window.location.href = '/'
  } catch (error) {
    console.error(error)
    alert('회원가입 실패')
  }
}
</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Sign up"
        subtitle="회원 정보를 입력해주세요"
    >
      <!-- 닉네임 입력 -->
      <UserInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          v-model="nickname"
      />

      <!-- IT 뉴스 구독 여부 입력 -->
      <UserItNewsSubWhite v-model="itNewsSubscription" />

      <!-- 버튼 -->
      <template #button>
        <UserButtonPurple
            text="회원가입 하기"
            :icon="fourLeafClover"
            @click="submitSocialSignup"
        />
      </template>
    </UserForm>
  </div>
</template>

<style scoped>
.content-frame {
  width: 100%;
  height: 956px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
}
</style>
