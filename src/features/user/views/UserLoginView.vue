<script setup>
import { useAuthStore } from "@/stores/auth.js"
import { useRouter } from 'vue-router'

// API 함수 (구글 로그인 요청)
import { loginGoogle } from "@/features/user/api.js"
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserForm from "@/features/user/components/UserForm.vue";
import UserExtraService from "@/features/user/components/UserExtraService.vue";
import UserButtonWhite from "@/features/user/components/UserButtonWhite.vue";
import {onMounted, ref} from "vue";

const newBreadCrumbItems = ref(['로그인', '']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})

const authStore = useAuthStore()
const router = useRouter()

// 구글 로그인 API 요청 처리
const loginGoogleMethod = async () => {
  try {
    // 구글 로그인 요청 (서버에서 구글 로그인 후 accessToken 응답)
    const response = await loginGoogle()

    // 응답에서 accessToken 받아오기
    const accessToken = response.data.data.accessToken
    if (accessToken) {
      // accessToken 저장
      authStore.setAuth(accessToken)

      // 로그인 후 리디렉션 (홈 또는 이전 페이지)
      const redirectPath = localStorage.getItem('redirectAfterLogin')
      if (typeof redirectPath === 'string') {
        localStorage.removeItem('redirectAfterLogin')
        router.replace(redirectPath)
      } else {
        router.replace('/')
      }
    }
  } catch (error) {
    console.error('구글 로그인 실패', error)
  }
}
</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Welcome back to DevPath"
        subtitle="다시 와주셨군요!"
    >
      <UserButtonWhite
          general="일반 로그인"
          google="구글 로그인"
          generalUrl="/user/login/general"
          @click-google="loginGoogleMethod"
      />
    </UserForm>
    <UserExtraService
        topText="아직 회원이 아니신가요?"
        :links="['회원가입 하러 가기']"
        :urls="['/user/signup']"
    />
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
