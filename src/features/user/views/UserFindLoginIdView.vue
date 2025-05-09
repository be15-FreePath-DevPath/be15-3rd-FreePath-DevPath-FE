<script setup>
import {ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import { findLoginId } from '@/features/user/api.js'
import { verifyEmail } from '@/features/mypage/api.js'

// 컴포넌트 import
import UserForm from '@/features/user/components/UserForm.vue'
import UserLogo from '@/features/user/components/UserLogo.vue'
import UserInput from '@/features/user/components/UserInput.vue'
import UserButtonPurple from '@/features/user/components/UserButtonPurple.vue'
import UserVerify from '@/features/user/components/UserVerify.vue'
import UserModal from '@/features/user/components/UserModal.vue'
import MagnifyingGlass from "@/assets/images/user/magnifying_glass.png";
import UserExtraService from "@/features/user/components/UserExtraService.vue";
import {errorMap} from "@/features/user/errorcode.js";

// 상태 변수
const email = ref('')
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

async function handleFindLoginIdClick() {
  if (!email.value) {
    modalTitle.value = '이메일 입력 필요'
    modalSubtitle.value = '로그인 ID를 위해 이메일을 입력해주세요.'
    showModal.value = true
    isSuccessModal.value = false
    return
  }

  isLoading.value = true

  try {
    // 이메일 인증 번호 요청 API 호출
    await verifyEmail({
      email: email.value,
      purpose: 'FIND_LOGINID'
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
    const res = await findLoginId(email.value)
    const loginId = res.data.data

    modalTitle.value = 'Find it!'
    modalSubtitle.value = `회원님의 로그인 ID는 ${loginId} 입니다.`
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
        title="Let's find your ID"
        subtitle="로그인 ID를 찾아드릴게요"
    >
      <!-- 기본 슬롯 (입력 폼들) -->
      <UserInput
          v-model="email"
          label="이메일"
          placeholder="DevPath에서 사용중인 이메일"
      />

      <!-- 버튼 슬롯 -->
      <template #button>
        <div class="button-with-loading">
         <UserButtonPurple
             text="로그인 ID 찾기"
             :icon="MagnifyingGlass"
             :disabled="isLoading"
             @click="handleFindLoginIdClick"
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
            purpose="FIND_LOGINID"
            @email-sent="handleEmailSent"
            @verify-success="handleVerificationSuccess"
        />
      </template>
    </UserForm>
    <UserExtraService
        topText="비밀번호도 잊으셨나요?"
        :links="['비밀번호 재설정']"
        :urls="['/user/resetPw']"
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
</style>
