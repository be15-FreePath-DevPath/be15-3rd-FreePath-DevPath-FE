<script setup>
import {ref, computed, watch, onMounted} from 'vue'
import {useRouter} from 'vue-router'

// API 함수
import {verifyEmail, userInfo, changeEmail} from '@/features/mypage/api'  // 기존 userInfo 추가
import {emailCheck} from "@/features/user/api.js";
import {errorMap} from '@/features/user/errorcode'

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

    // 입력창은 비워두기
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
    // 입력값을 서버용 이메일에 복사
    email.value = displayEmail.value

    await verifyEmail({
      email: email.value,
      purpose: purpose.value
    })

    // 인증 이메일을 성공적으로 발송한 후 인증 화면 표시
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

// 이메일 인증 번호 확인
async function handleVerifyCode() {
  if (!verificationCode.value) {
    return
  }

  isLoading.value = true
  try {
    const response = await emailCheck({
      email: email.value,
      verificationCode: verificationCode.value
    })

    if (response.data.isVerified) {
      await changeEmail({email: email.value})

      showModal('이메일 변경 완료', '이메일 변경이 완료되었습니다.')

      // 원본 이메일 갱신
      originalEmail.value = email.value
      displayEmail.value = ''
      verifyVisible.value = false
    } else {
      showModal('인증 실패', '인증번호가 잘못되었습니다. 다시 시도해 주세요.')
    }
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
    <!-- 이메일 입력 -->
    <template v-if="!verifyVisible">
      <MyPageInput
          v-model="displayEmail"
          label="새 이메일"
          placeholder="새 이메일을 입력해주세요"
      />
      <template #withButton>
        <p class="helper-text">기존 이메일: {{ originalEmail }}</p>

        <!-- 이메일 수정 버튼 -->
        <MyPageButtonUpdate
            text="수정하기"
            @click="isModified ? handleEmailChange() : null"
            :disabled="!isModified"
        />
      </template>

      <!-- 로딩 중 메시지 -->
      <p v-if="isLoading" class="loading-message">
        입력하신 이메일로 인증 번호 보내는 중{{ loadingDots }}
      </p>
    </template>

    <!-- 인증 화면 -->
    <template v-else>
      <MyPageVerify
          :email="email"
          purpose="CHANGE_EMAIL"
          @verify-success="handleVerifyCode"
      />
    </template>
  </MyPageBoardLarge>

  <!-- 모달 -->
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
