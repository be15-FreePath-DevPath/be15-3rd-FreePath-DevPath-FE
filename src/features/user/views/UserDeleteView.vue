<script setup>
import {onMounted, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import {deleteUser, logoutUser} from '@/features/user/api.js'
import { verifyEmail, userInfo } from '@/features/mypage/api.js'

// 컴포넌트 import
import UserForm from '@/features/user/components/UserForm.vue'
import UserLogo from '@/features/user/components/UserLogo.vue'
import UserInput from '@/features/user/components/UserInput.vue'
import UserButtonPurple from '@/features/user/components/UserButtonPurple.vue'
import UserVerify from '@/features/user/components/UserVerify.vue'
import UserModal from '@/features/user/components/UserModal.vue'
import SmileySad from '@/assets/images/user/smiley_sad.png'
import {errorMap} from "@/features/user/errorcode.js";

const newBreadCrumbItems = ref(['회원 탈퇴 하기', '']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})

// 상태 변수
const email = ref('')
const verifyVisible = ref(false)
const showModal = ref(false)
const modalTitle = ref('')
const modalSubtitle = ref('')
const isLoading = ref(false)
const loadingDots = ref('')
const originalEmail = ref('')
const displayEmail = ref('')

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

onMounted(async () => {
  try {
    const res = await userInfo()
    const data = res.data.data

    email.value = data.email || ''
    originalEmail.value = email.value

    displayEmail.value = ''
  } catch (error) {
    alert('유저 정보를 가져오는 중 오류가 발생했습니다.')
  }
})

// 탈퇴 버튼 클릭 시
async function handleDeleteClick() {
  if (!displayEmail.value) {
    modalTitle.value = '이메일 입력 필요'
    modalSubtitle.value = '탈퇴를 위해 이메일을 입력해주세요.'
    showModal.value = true
    isSuccessModal.value = false
    return
  }

  // 입력한 이메일과 userInfo로 가져온 이메일이 다른 경우
  if (displayEmail.value !== originalEmail.value) {
    modalTitle.value = '이메일 불일치'
    modalSubtitle.value = '입력한 이메일이 가입한 이메일과 일치하지 않습니다.'
    showModal.value = true
    isSuccessModal.value = false
    return
  }

  isLoading.value = true

  try {
    // 이메일 인증 번호 요청 API 호출
    await verifyEmail({
      email: displayEmail.value,
      purpose: 'DELETE_USER'
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
    await deleteUser(email.value)
    await logoutUser()
    modalTitle.value = '탈퇴 완료'
    modalSubtitle.value = '그동안 DevPath를 이용해주셔서 감사합니다.'
    showModal.value = true
    isSuccessModal.value = true

    verifyVisible.value = false

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
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
      await router.push('/')
      window.location.reload()
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
        title="Leaving DevPath?"
        subtitle="탈퇴하시나요...?"
    >
      <UserInput
          v-model="displayEmail"
          label="이메일"
          placeholder="DevPath에서 사용중인 이메일"
      />

      <template #button>
        <div class="button-with-loading">
          <UserButtonPurple
              text="탈퇴 하기"
              :icon="SmileySad"
              :disabled="isLoading"
              @click="handleDeleteClick"
          />
          <p v-if="isLoading" class="loading-message">
            입력하신 이메일로 인증 번호 보내는 중{{ loadingDots }}
          </p>
        </div>
      </template>

      <template #verify-button>
        <UserVerify
            v-if="verifyVisible"
            :email="displayEmail"
            purpose="DELETE_USER"
            @email-sent="handleEmailSent"
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
