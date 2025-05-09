<script setup>
import {ref, computed, watch, onMounted} from 'vue'
import { useRouter } from 'vue-router'

// API 함수
import { signupTemp } from '@/features/user/api'  // loginUser 제거
import { errorMap } from '@/features/user/errorcode.js'

// 컴포넌트들
import UserForm from "@/features/user/components/UserForm.vue"
import UserLogo from "@/features/user/components/UserLogo.vue"
import UserInput from "@/features/user/components/UserInput.vue"
import UserItNewsSubWhite from "@/features/user/components/UserItNewsSub.vue"
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue"
import FourLeafClover from "@/assets/images/user/four_leaf_clover.png"
import UserVerify from "@/features/user/components/UserVerify.vue"
import UserModal from "@/features/user/components/UserModal.vue"

const newBreadCrumbItems = ref(['회원가입', '일반 회원가입']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})

// 입력 값들
const loginId = ref('')
const password = ref('')
const confirmPassword = ref('')
const userName = ref('')
const email = ref('')
const nickname = ref('')
const itNewsSubscription = ref('N')

// 인증창 보이기 여부
const verifyVisible = ref(false)

// 모달창 상태 관리
const showModal = ref(false)
const modalTitle = ref('')
const modalSubtitle = ref('')

// 로딩 상태
const isLoading = ref(false)
const loadingDots = ref('')

// 비밀번호 불일치 여부
const passwordMismatch = computed(() => {
  return confirmPassword.value !== '' && password.value !== confirmPassword.value
})

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

// 회원가입 함수
async function signup() {
  if (passwordMismatch.value) {
    modalTitle.value = '비밀번호 오류'
    modalSubtitle.value = '비밀번호가 일치하지 않습니다.'
    showModal.value = true
    return
  }

  isLoading.value = true
  try {
    await signupTemp({
      email: email.value,
      loginId: loginId.value,
      password: password.value,
      nickname: nickname.value,
      userName: userName.value,
      itNewsSubscription: itNewsSubscription.value,
      loginMethod: "GENERAL"
    })

    verifyVisible.value = true

  } catch (error) {
    const code = error.response?.data?.errorCode
    const message = error.response?.data?.message

    if (code && errorMap[code]) {
      modalTitle.value = errorMap[code].title
      modalSubtitle.value = message || '잠시 후 다시 시도해 주세요.'
    } else {
      modalTitle.value = '알 수 없는 오류'
      modalSubtitle.value = message || '잠시 후 다시 시도해 주세요.'
    }
    showModal.value = true
  } finally {
    isLoading.value = false
  }
}

// 인증 성공 시 실행
function handleVerificationSuccess() {
  modalTitle.value = 'Success!'
  modalSubtitle.value = 'DevPath에 오신 것을 환영합니다!'
  showModal.value = true

  verifyVisible.value = false
}

// 모달 닫을 때 로그인 페이지로 이동
async function handleModalClose() {
  showModal.value = false

  try {
    isLoading.value = true
    router.push('/user/login/general')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="content-frame">
    <UserLogo/>
    <UserForm
        title="Sign up"
        subtitle="회원 정보를 입력해주세요"
    >
      <UserInput v-model="loginId" label="로그인 ID" placeholder="로그인 ID를 입력해주세요"/>
      <UserInput
          v-model="password"
          label="비밀번호"
          placeholder="영문과 특수문자로 된 6~12자리를 입력하세요"
          type="password"
      />
      <UserInput
          v-model="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 재입력해주세요"
          type="password"
      />
      <p v-if="passwordMismatch" class="error-message">
        비밀번호가 일치하지 않습니다
      </p>

      <UserInput v-model="userName" label="이름" placeholder="수정할 수 없으니 확인 후 회원가입 해주세요"/>
      <UserInput v-model="email" label="이메일" placeholder="이메일을 입력해주세요"/>
      <UserInput v-model="nickname" label="닉네임" placeholder="닉네임을 입력해주세요"/>

      <UserItNewsSubWhite v-model="itNewsSubscription"/>

      <template #button>
        <div class="button-with-loading">
          <UserButtonPurple
              text="회원가입 하기"
              :icon="FourLeafClover"
              :disabled="isLoading"
              @click="signup"
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
            purpose="SIGN_UP"
            @verify-success="handleVerificationSuccess"
        />
      </template>
    </UserForm>

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

.error-message {
  color: #ff6b6b;
  font-size: 12px;
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
