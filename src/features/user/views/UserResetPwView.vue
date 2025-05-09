<script setup>
import {computed, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import { resetPw } from '@/features/user/api.js'
import { verifyEmail } from '@/features/mypage/api.js'

// 컴포넌트 import
import UserForm from '@/features/user/components/UserForm.vue'
import UserLogo from '@/features/user/components/UserLogo.vue'
import UserInput from '@/features/user/components/UserInput.vue'
import UserButtonPurple from '@/features/user/components/UserButtonPurple.vue'
import UserVerify from '@/features/user/components/UserVerify.vue'
import UserModal from '@/features/user/components/UserModal.vue'
import UserExtraService from "@/features/user/components/UserExtraService.vue";
import {errorMap} from "@/features/user/errorcode.js";
import Vector from "@/assets/images/user/vector.png"

// 상태 변수
const email = ref('')
const loginId = ref('')
const newPassword = ref('')
const newPasswordCheck = ref('')
const verifyVisible = ref(false)
const showModal = ref(false)
const modalTitle = ref('')
const modalSubtitle = ref('')
const isLoading = ref(false)
const loadingDots = ref('')

// 로딩 dots 애니메이션
let loadingInterval = null

watch(isLoading, (newVal) => {
  if (newVal) {
    let dotCount = 0
    loadingInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4
      loadingDots.value = '.'.repeat(dotCount)
    }, 500)
  } else {
    clearInterval(loadingInterval)
    loadingDots.value = ''
  }
})

const router = useRouter()
const isSuccessModal = ref(false) // 성공 여부 상태 변수

const passwordMismatch = computed(() => {
  return newPasswordCheck.value !== '' && newPasswordCheck.value !== newPassword.value
})

async function handleResetPwClick() {
  if (!email.value) {
    modalTitle.value = '이메일 입력 필요'
    modalSubtitle.value = '비밀번호 재설정을 위해 이메일을 입력해주세요.'
    showModal.value = true
    isSuccessModal.value = false
    return
  }

  if (!loginId.value) {
    modalTitle.value = '로그인 ID 입력 필요'
    modalSubtitle.value = '비밀번호 재설정을 위해 이메일을 입력해주세요.'
    showModal.value = true
    isSuccessModal.value = false
    return
  }

  if (passwordMismatch.value) {
    modalTitle.value = '비밀번호 오류'
    modalSubtitle.value = '비밀번호가 일치하지 않습니다.'
    showModal.value = true
    return
  }

  isLoading.value = true

  try {
    // 이메일 인증 번호 요청 API 호출
    await verifyEmail({
      email: email.value,
      purpose: 'RESET_PASSWORD'
    })

    handleEmailSent()

  } catch (error) {
    const code = error.response?.data?.errorCode
    const message = error.response?.data?.message

    if (code && errorMap[code]) {
      modalTitle.value = errorMap[code].title
      modalSubtitle.value = message || errorMap[code].subtitle
    } else {
      modalTitle.value = '알 수 없는 오류'
      modalSubtitle.value = message || '잠시 후 다시 시도해 주세요.'
    }

    showModal.value = true
    isSuccessModal.value = false
  } finally {
    isLoading.value = false
  }
}

// 인증창 이메일 전송 성공 시 호출됨
function handleEmailSent() {
  isLoading.value = false
  verifyVisible.value = true
}

// 인증 성공 시 실행
async function handleVerificationSuccess() {
  try {
    await resetPw(email.value, loginId.value, newPassword.value)

    modalTitle.value = 'Reset'
    modalSubtitle.value = '비밀번호가 성공적으로 재설정 되었습니다'
    showModal.value = true
    isSuccessModal.value = true

    verifyVisible.value = false
  } catch (error) {
    const code = error.response?.data?.errorCode
    const message = error.response?.data?.message

    if (code && errorMap[code]) {
      modalTitle.value = errorMap[code].title
      modalSubtitle.value = message || errorMap[code].subtitle
    } else {
      modalTitle.value = '알 수 없는 오류'
      modalSubtitle.value = message || '잠시 후 다시 시도해 주세요.'
    }

    showModal.value = true
    isSuccessModal.value = false
  }
}

// 모달 닫기 시 분기 처리
async function handleModalClose() {
  showModal.value = false

  if (isSuccessModal.value) {
    try {
      isLoading.value = true
      await router.push('/user/login/general')
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="New password"
        subtitle="비밀번호를 재설정 합니다"
    >
      <!-- 기본 슬롯 (입력 폼들) -->
      <UserInput
          label="이메일"
          placeholder="DevPath에서 사용하는 이메일"
          v-model="email"/>
      <UserInput
          label="로그인 ID"
          placeholder="로그인 ID를 입력해주세요"
          v-model="loginId"/>
      <UserInput
          label="새 비밀번호"
          placeholder="영문과 특수문자로 된 6~12자리를 입력하세요"
          v-model="newPassword"
          type="password"
      />
      <UserInput
          label="새 비밀번호 확인"
          placeholder="비밀번호를 재입력해주세요"
          v-model="newPasswordCheck"
          type="password"
      />
      <p v-if="passwordMismatch" class="error-message">
        비밀번호가 일치하지 않습니다
      </p>

      <!-- 버튼 슬롯 -->
      <template #button>
        <div class="button-with-loading">
        <UserButtonPurple
            text="비밀번호 재설정"
            :icon="Vector"
            :disabled="isLoading"
            @click="handleResetPwClick"
        />
        <p v-if="isLoading" class="loading-message">
          입력하신 이메일로 인증 번호 보내는 중{{ loadingDots }}
        </p>
        </div>
      </template>

      <template #verify-button>
        <UserVerify
            v-if="verifyVisible"
            :email="email"
            purpose="RESET_PASSWORD"
            @email-sent="handleEmailSent"
            @verify-success="handleVerificationSuccess"
        />
      </template>
    </UserForm>
    <UserExtraService
        topText="로그인 ID도 잊으셨나요?"
        :links="['로그인 ID 찾기']"
        :urls="['/user/findLoginId']"
    />

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

.button-with-loading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.loading-message {
  color: #ffffff;
  font-size: 13px;
}

.error-message {
  color: #ff6b6b;
  font-size: 12px;
}
</style>
