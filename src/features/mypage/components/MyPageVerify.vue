<script setup>
import { ref } from 'vue'
import { emailCheck } from '@/features/user/api'
import { errorMap } from '@/features/user/errorcode.js'

// 컴포넌트 import
import Check from "@/assets/images/user/check.png";
import UserModal from "@/features/user/components/UserModal.vue";
import MyPageInput from "@/features/mypage/components/MyPageInput.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";

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

// 인증 버튼 클릭 시 실행
async function verify() {
  if (!authNum.value) {
    showModal.value = true
    modalTitle.value = '인증 번호 누락'
    modalSubtitle.value = '인증 번호를 입력해주세요.'
    return
  }

  try {
    const res = await emailCheck(props.email, authNum.value, props.purpose)

    if (res.data.isVerified) {
      // 성공 시 부모에 이벤트 emit
      emit('verify-success')
    } else {
      showModal.value = true
      modalTitle.value = '인증 실패'
      modalSubtitle.value = '인증번호가 올바르지 않습니다.'
    }
  } catch (error) {
    const code = error.response?.data?.errorCode
    const message = error.response?.data?.message

    if (code && errorMap[code]) {
      modalTitle.value = errorMap[code].title
      modalSubtitle.value = message || errorMap[code].subtitle
    } else {
      modalTitle.value = '알 수 없는 오류'
      modalSubtitle.value = message || '잠시 후 다시 시도해주세요.'
    }
    showModal.value = true
  }
}
</script>


<template>
  <div class="content">
    <MyPageInput
        v-model="authNum"
        label="인증 번호"
        placeholder="인증 번호를 입력해주세요"
    />
    <UserButtonPurple
        text="인증 하기"
        :icon="Check"
        :bgColor="'#E5ECF6'"
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
