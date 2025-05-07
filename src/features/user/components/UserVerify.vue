<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { errorMap } from '@/features/user/errorcode.js'

// 컴포넌트 import
import UserInput from "@/features/user/components/UserInput.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";
import Check from "@/assets/images/user/check.png";

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

// 에러 상태
const showError = ref(false)
const errorMessage = ref('')

// 인증 요청 + 최종 회원가입 완료 처리
async function verify() {
  try {
    const token = localStorage.getItem('jwtToken')

    // 1) 이메일 인증 확인
    const response = await axios.post('http://localhost:8080/email/check', {
      email: props.email,
      authNum: authNum.value,
      purpose: props.purpose
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('인증 성공', response.data)

    // 2) 인증 성공 시 회원가입 최종 완료 처리
    await axios.post('http://localhost:8080/user/signup', {
      email: props.email
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('회원가입 최종 완료')

    emit('verify-success')

  } catch (error) {
    console.error('에러 발생:', error.response?.data || error)

    const code = error.response?.data?.errorCode
    const message = error.response?.data?.message

    if (code && errorMap[code]) {
      errorMessage.value = errorMap[code].subtitle
    } else {
      errorMessage.value = message || '인증에 실패했습니다. 다시 시도해 주세요.'
    }
    showError.value = true
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
    <p v-if="showError" class="error-text">{{ errorMessage }}</p>
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

.error-text {
  color: red;
  font-size: 12px;
}
</style>
