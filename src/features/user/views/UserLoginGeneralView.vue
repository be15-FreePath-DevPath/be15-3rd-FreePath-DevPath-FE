<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '@/features/user/api.js'
import { useAuthStore } from '@/stores/auth.js'
import UserForm from '@/features/user/components/UserForm.vue'
import UserInput from '@/features/user/components/UserInput.vue'
import UserLogo from '@/features/user/components/UserLogo.vue'
import UserButtonPurple from '@/features/user/components/UserButtonPurple.vue'
import FourLeafClover from '@/assets/images/user/four_leaf_clover.png'
import UserExtraService from '@/features/user/components/UserExtraService.vue'

const loginId = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    const response = await loginUser({
      loginId: loginId.value,
      password: password.value
    })

    const accessToken = response.data.data.accessToken
    authStore.setAuth(accessToken)
    await router.push('/')
  } catch (error) {
    alert(error.response?.data?.message || '로그인 실패')
    console.error(error)
  }
}
</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Sign in"
        subtitle="로그인을 해주세요"
    >
      <UserInput
          v-model="loginId"
          label="로그인 ID"
          placeholder="로그인 ID를 입력해주세요"
      />
      <UserInput
          v-model="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
      />

      <template #button>
        <UserButtonPurple
            text="로그인 하기"
            :icon="FourLeafClover"
            @click="handleLogin"
        />
      </template>
    </UserForm>

    <UserExtraService
        topText="혹시 기억이 나지 않으신가요?"
        :links="['아이디 찾기', '비밀번호 재설정']"
        :urls="['/user/findId', '/user/resetPw']"
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
