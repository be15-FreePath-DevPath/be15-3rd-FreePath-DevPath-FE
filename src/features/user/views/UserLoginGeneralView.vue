<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useAuthStore} from "@/stores/auth.js";
// 컴포넌트들
import UserForm from "@/features/user/components/UserForm.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserInput from "@/features/user/components/UserInput.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";
import FourLeafClover from "@/assets/images/user/four_leaf_clover.png"
import UserExtraService from "@/features/user/components/UserExtraService.vue";
import UserModal from "@/features/user/components/UserModal.vue";

// 에러 코드 매핑
import { errorMap } from "@/features/user/errorcode";

// ✅ API 함수 import
import { loginUser } from "@/features/user/api";

const form = reactive({
  loginId: '',
  password: ''
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const showModal = ref(false)
const modalTitle = ref('')
const modalSubtitle = ref('')
const isLoginSuccess = ref(false)

const login = async () => {
  console.log('로그인 요청 값:', { loginId: form.loginId, password: form.password })

  try {
    const response = await loginUser({
      loginId: form.loginId,
      password: form.password
    });

    console.log('로그인 성공', response.data)
    const accessToken = response.data.data.accessToken;
    authStore.setAuth(accessToken);

    modalTitle.value = '로그인 성공';
    modalSubtitle.value = 'DevPath에 오신 것을 환영합니다!';
    isLoginSuccess.value = true;
  } catch (error) {
    const errorCode = error.response?.data?.errorCode || '기타 오류';
    const errorMessage = errorMap[errorCode] || {
      title: '로그인 실패',
      subtitle: '알 수 없는 오류가 발생했습니다.'
    };

    modalTitle.value = errorMessage.title;
    modalSubtitle.value = errorMessage.subtitle;
    isLoginSuccess.value = false;
  } finally {
    showModal.value = true; // 한 곳에서 처리
  }

}

const handleModalClose = () => {
  showModal.value = false;
  if (isLoginSuccess.value) {
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    localStorage.removeItem('redirectAfterLogin'); // 사용 후 제거

    // redirectPath가 존재하고, 문자열이며, 빈 문자열이 아닐 경우만 사용
    if (typeof redirectPath === 'string' && redirectPath.trim() !== '') {

      router.replace(redirectPath);
    } else {
      router.replace('/'); // 기본 홈으로 이동
    }
  }
};
</script>

<template>
  <div class="content-frame">
    <UserLogo/>
    <UserForm
        title="Sign in"
        subtitle="로그인을 해주세요"
    >
      <!-- 아이디 입력 -->
      <UserInput
          v-model="form.loginId"
          label="로그인 ID"
          placeholder="로그인 ID를 입력해주세요"
      />

      <!-- 비밀번호 입력 -->
      <UserInput
          v-model="form.password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
      />

      <!-- 로그인 버튼 -->
      <template #button>
        <UserButtonPurple
            text="로그인 하기"
            :icon="FourLeafClover"
            @click="login"
        />
      </template>
    </UserForm>

    <UserExtraService
        topText="혹시 기억이 나지 않으신가요?"
        :links="['아이디 찾기', '비밀번호 재설정']"
        :urls="['/user/findId', '/user/resetPw']"
    />

    <!-- 로그인 성공/실패 모달 -->
    <UserModal
        v-if="showModal"
        :title="modalTitle"
        :subtitle="modalSubtitle"
        @close="handleModalClose"
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
