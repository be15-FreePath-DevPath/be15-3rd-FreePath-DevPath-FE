<script setup>
import { ref, onMounted } from 'vue'
import { signupGoogle } from '@/features/user/api'
import { errorMap } from '@/features/user/errorcode'

import UserForm from "@/features/user/components/UserForm.vue"
import UserLogo from "@/features/user/components/UserLogo.vue"
import UserInput from "@/features/user/components/UserInput.vue"
import UserItNewsSubWhite from "@/features/user/components/UserItNewsSub.vue"
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue"
import UserModal from "@/features/user/components/UserModal.vue"
import fourLeafClover from '@/assets/images/user/four_leaf_clover.png'

// 입력값 상태 관리
const nickname = ref('')
const itNewsSubscription = ref('N')

// 이메일 상태도 ref로 관리
const email = ref('')

// 모달 상태 관리
const showModal = ref(false)
const modalTitle = ref('')
const modalSubtitle = ref('')
const onModalCloseAfterSuccess = ref(false) // 성공 시 닫을 때만 이동

// 페이지가 열릴 때 URL 파라미터로 이메일 가져와서 localStorage에 저장
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const emailParam = params.get('email')
  if (emailParam) {
    localStorage.setItem('socialSignUpEmail', emailParam)
    email.value = emailParam
  } else {
    email.value = localStorage.getItem('socialSignUpEmail') || ''
  }
})

// 버튼 클릭 시 API 호출
const submitSocialSignup = async () => {
  try {
    await signupGoogle(email.value, nickname.value, itNewsSubscription.value)

    // 성공 시 모달에 성공 메시지 표시
    modalTitle.value = 'Success!'
    modalSubtitle.value = 'DevPath에 오신 것을 환영합니다!'
    showModal.value = true
    onModalCloseAfterSuccess.value = true // 성공 여부 체크

  } catch (error) {
    console.error(error)
    handleApiError(error)
  }
}

// 에러 처리 함수
// 에러 처리 함수
function handleApiError(error) {
  const errorCode = error.response?.data?.errorCode
  const errorMessage = error.response?.data?.message
  const errorInfo = errorMap[errorCode]

  // ✅ 콘솔로 값 출력
  console.log('에러코드:', errorCode)
  console.log('errorMap 매핑결과:', errorInfo)
  console.log('서버 메시지:', errorMessage)

  if (errorInfo) {
    modalTitle.value = errorInfo.title
    modalSubtitle.value = errorMessage || '잠시 후 다시 시도해주세요'
  } else {
    modalTitle.value = '오류 발생'
    modalSubtitle.value = errorMessage || '잠시 후 다시 시도해주세요'
  }

  showModal.value = true
  onModalCloseAfterSuccess.value = false // 실패 시 이동 안 함
}

// 모달 닫기 핸들러
function closeModal() {
  showModal.value = false

  if (onModalCloseAfterSuccess.value) {
    window.location.href = '/user/login'
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

    <!-- 모달 -->
    <UserModal
        v-if="showModal"
        :title="modalTitle"
        :subtitle="modalSubtitle"
        @close="closeModal"
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
