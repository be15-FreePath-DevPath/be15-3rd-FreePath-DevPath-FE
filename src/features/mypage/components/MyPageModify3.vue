<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// API 함수
import { userInfo, verifyEmail } from '@/features/mypage/api'
import { errorMap } from '@/features/user/errorcode'

// 컴포넌트들
import MyPageBoardLarge from "@/features/mypage/components/MyPageBoardLarge.vue"
import MyPageInput from "@/features/mypage/components/MyPageInput.vue"
import MyPageButtonUpdate from "@/features/mypage/components/MyPageButtonUpdate.vue"
import MyPageVerify from "@/features/mypage/components/MyPageVerify.vue"
import UserModal from "@/features/user/components/UserModal.vue"

// 입력 값들
const email = ref('')
const purpose = ref('CHANGE_PASSWORD')
const currentPassword = ref('')
const newPassword = ref('')
const apiType = ref('changePassword')

// 인증창 보이기 여부
const verifyVisible = ref(false)

// 로딩 상태
const isLoading = ref(false)
const loadingDots = ref('')

// 수정 가능 여부
const isModified = computed(() => {
  return currentPassword.value.trim() !== '' && newPassword.value.trim() !== ''
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
  } catch (error) {
    alert('유저 정보를 가져오는 중 오류가 발생했습니다.')
  }
})

// 이메일 인증 요청 (비밀번호 변경은 MyPageVerify에서 진행)
async function handleSendVerifyEmail() {
  if (!isModified.value) {
    return
  }

  try {
    isLoading.value = true
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
  <MyPageBoardLarge title="비밀번호 수정">
    <div class="frame-container">
      <!-- 좌측 : Input + Verify -->
      <div class="left-frame">
        <MyPageInput
            v-model="currentPassword"
            label="현재 비밀번호"
            placeholder="지금 사용하는 비밀번호를 입력해주세요"
            type="password"
        />
        <MyPageInput
            v-model="newPassword"
            label="새 비밀번호"
            placeholder="새 비밀번호를 입력해주세요"
            type="password"
        />

        <p v-if="isLoading" class="loading-message">
          입력하신 이메일로 인증 번호 보내는 중{{ loadingDots }}
        </p>

        <!-- 인증 화면 -->
        <template v-if="verifyVisible">
          <MyPageVerify
              :email="email"
              :current-email="email"
              :purpose="purpose"
              :api-type="apiType"
              :current-password="currentPassword"
              :new-password="newPassword"
          />
        </template>
      </div>

      <!-- 우측 : Button -->
      <div class="right-frame">
        <MyPageButtonUpdate
            text="수정하기"
            @click="isModified ? handleSendVerifyEmail() : null"
            :disabled="!isModified"
        />
      </div>
    </div>

    <!-- 모달 -->
    <UserModal
        v-if="isModalOpen"
        :title="modalTitle"
        :subtitle="modalSubtitle"
        @close="isModalOpen = false"
    />
  </MyPageBoardLarge>
</template>

<style scoped>
.frame-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  gap: 16px;
}

.left-frame {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.right-frame {
  display: flex;
  align-items: flex-end;
}

.loading-message {
  font-size: 13px;
}
</style>
