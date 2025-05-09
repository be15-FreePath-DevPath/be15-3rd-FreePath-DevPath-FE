<script setup>
import { ref } from 'vue'
import { emailCheck, signupUser } from '@/features/user/api'  // api.js에서 함수 가져오기
import { errorMap } from '@/features/user/errorcode.js'

// 컴포넌트 import
import UserInput from "@/features/user/components/UserInput.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";
import Check from "@/assets/images/user/check.png";
import UserModal from "@/features/user/components/UserModal.vue";

// 부모로부터 email과 purpose 값을 전달 받음
const props = defineProps({
  email: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  }
})

// emit 이벤트 정의
const emit = defineEmits(['verify-success'])

// 인증번호 입력 값
const authNum = ref('')

// 모달 상태 관리
const showModal = ref(false)
const modalTitle = ref('')
const modalSubtitle = ref('')

// 인증 요청 + 최종 회원가입 완료 처리
async function verify() {
  try {
    const response = await emailCheck(props.email, authNum.value, props.purpose)  // 인증 확인
    console.log('인증 성공', response.data)

    // 용도에 따라 처리 분기
    if (props.purpose === 'SIGN_UP') {
      // 회원가입 완료 처리
      await signupUser(props.email)
      emit('verify-success')
    } else {
      emit('verify-success')
    }

  } catch (error) {
    console.error('에러 발생:', error.response?.data || error)

    const code = error.response?.data?.errorCode
    const message = error.response?.data?.message

    // 에러 메시지 처리
    if (code && errorMap[code]) {
      modalTitle.value = errorMap[code].title
      modalSubtitle.value = message || '잠시 후 다시 시도해 주세요.'
    } else {
      modalTitle.value = '알 수 없는 오류'
      modalSubtitle.value = message || '잠시 후 다시 시도해 주세요.'
    }

    // 모달 띄우기
    showModal.value = true
  }
}
</script>

<template>
  <div class="content">
    <UserInput
        v-model="authNum"
        label="인증 번호"
        placeholder="인증 번호를 입력해주세요"
    />
    <UserButtonPurple
        text="인증 하기"
        :icon="Check"
        @click="verify"
    />

    <!-- 인증 실패 시 모달 -->
    <UserModal
        v-if="showModal"
        :title="modalTitle"
        :subtitle="modalSubtitle"
        @close="showModal = false"
    />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  outline: none;
  gap: 10px;
}
</style>
