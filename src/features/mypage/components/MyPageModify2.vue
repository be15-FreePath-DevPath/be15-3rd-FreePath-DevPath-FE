<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// API 함수
import { verifyEmail, userInfo } from '@/features/mypage/api'

// 컴포넌트들
import MyPageBoardLarge from "@/features/mypage/components/MyPageBoardLarge.vue"
import MyPageInput from "@/features/mypage/components/MyPageInput.vue"
import MyPageButtonUpdate from "@/features/mypage/components/MyPageButtonUpdate.vue"
import MyPageVerify from "@/features/mypage/components/MyPageVerify.vue"
import UserModal from "@/features/user/components/UserModal.vue"

// 입력 값들
const email = ref('') // 서버로 보낼 이메일
const displayEmail = ref('') // 입력창용 이메일
const purpose = ref('CHANGE_EMAIL')
const verificationCode = ref('')
const apiType = ref('changeEmail')

// 원본 이메일 (placeholder용)
const originalEmail = ref('')

// 로딩 상태
const isLoading = ref(false)
const loadingDots = ref('')

// 수정 여부
const isModified = computed(() => {
  return displayEmail.value.trim() !== '' && displayEmail.value.trim() !== originalEmail.value
})

// 모달 상태 관리
const isModalOpen = ref(false)
const modalTitle = ref('')
const modalSubtitle = ref('')

function showModal(title, subtitle) {
  modalTitle.value = title
  modalSubtitle.value = subtitle
  isModalOpen.value = true
}

// 인증창 보이기 여부
const verifyVisible = ref(false)

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

// 초기 데이터 세팅
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

// 이메일 수정 요청 (인증 메일 발송)
async function handleEmailChange() {
  if (!isModified.value) {
    return
  }

  isLoading.value = true
  try {
    email.value = displayEmail.value

    await verifyEmail({
      email: email.value,
      purpose: purpose.value
    })

    verifyVisible.value = true
  } catch (error) {
    const code = error.response?.data?.errorCode
    const message = error.response?.data?.message

    if (code && errorMap[code]) {
      showModal(errorMap[code].title, message || errorMap[code].subtitle)
    } else {
      showModal('알 수 없는 오류', message || '잠시 후 다시 시도해 주세요.')
    }
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <MyPageBoardLarge title="이메일 수정">
    <MyPageInput
        v-model="displayEmail"
        label="새 이메일"
        placeholder="새 이메일을 입력해주세요"
    />
    <template #withButton>
      <p class="helper-text">기존 이메일: {{ originalEmail }}</p>

      <MyPageButtonUpdate
          text="수정하기"
          @click="isModified ? handleEmailChange() : null"
          :disabled="!isModified"
      />
    </template>

    <p v-if="isLoading" class="loading-message">
      입력하신 이메일로 인증 번호 보내는 중{{ loadingDots }}
    </p>

    <template v-if="verifyVisible">
      <!-- MyPageVerify로 이메일과 목적을 전달 -->
      <MyPageVerify
          :email="email"
          :current-email="originalEmail"
          :apiType="apiType"
          purpose="CHANGE_EMAIL"
          @verify-success="handleVerifyCode"
      />
    </template>
  </MyPageBoardLarge>

  <UserModal
      v-if="isModalOpen"
      :title="modalTitle"
      :subtitle="modalSubtitle"
      @close="isModalOpen = false"
  />
</template>

<style scoped>
.loading-message {
  font-size: 13px;
}

.helper-text {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
