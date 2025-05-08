<script setup>
import { ref, onMounted, computed } from 'vue';
import MyPageBoardLarge from "@/features/mypage/components/MyPageBoardLarge.vue";
import MyPageInput from "@/features/mypage/components/MyPageInput.vue";
import MyPageButtonUpdate from "@/features/mypage/components/MyPageButtonUpdate.vue";
import MyPageItNewsSub from "@/features/mypage/components/MyPageItNewsSub.vue";
import {userInfo, modifyUserInfo} from '@/features/mypage/api';
import UserModal from "@/features/user/components/UserModal.vue";
import {errorMap} from '@/features/user/errorcode'

// 상태 값들
const nickname = ref(""); // 서버용 닉네임 값
const displayNickname = ref(""); // 입력창용 닉네임 값
const itNewsSubscription = ref("Y");

// 원본 값 (수정 여부 판단용)
const originalNickname = ref("");
const originalItNewsSubscription = ref("Y");

// 수정 여부
const isModified = computed(() => {
  const hasChanges =
      displayNickname.value.trim() !== originalNickname.value ||
      itNewsSubscription.value !== originalItNewsSubscription.value;

  const isNicknameValid = displayNickname.value.trim() !== "";

  return hasChanges && isNicknameValid;
});

// 모달 상태 관리
const isModalOpen = ref(false);
const modalTitle = ref("");
const modalSubtitle = ref("");

function showModal(title, subtitle) {
  modalTitle.value = title;
  modalSubtitle.value = subtitle;
  isModalOpen.value = true;
}

// 초기 데이터 세팅
onMounted(async () => {
  try {
    const res = await userInfo();
    const data = res.data.data;

    nickname.value = data.nickname || "";
    itNewsSubscription.value = data.itNewsSubscription || "Y";

    originalNickname.value = nickname.value;
    originalItNewsSubscription.value = itNewsSubscription.value;

    // 입력창은 비워두기
    displayNickname.value = "";
  } catch (error) {
    alert("유저 정보를 가져오는 중 오류가 발생했습니다.");
  }
});

// 수정 처리
async function handleUpdate() {
  if (!isModified.value) {
    return;
  }

  try {
    // 입력값을 서버용 닉네임에 복사
    nickname.value = displayNickname.value;

    const response = await modifyUserInfo(nickname.value, itNewsSubscription.value);

    if (response && response.data.success) {
      showModal("Success!", "회원 정보가 성공적으로 수정되었습니다.");
      // 원본 값도 갱신
      originalNickname.value = nickname.value;
      originalItNewsSubscription.value = itNewsSubscription.value;

      // 입력창 비우기
      displayNickname.value = "";
    } else {
      showModal("수정 실패", "회원 정보 수정에 실패했습니다.");
    }
  } catch (error) {
    const code = error.response?.data?.errorCode
    const message = error.response?.data?.message

    if (code && errorMap[code]) {
      showModal(errorMap[code].title, message || errorMap[code].subtitle)
    } else {
      showModal('알 수 없는 오류', message || '잠시 후 다시 시도해 주세요.')
    }
  }
}
</script>

<template>
  <MyPageBoardLarge title="내 정보 수정">
    <!-- 닉네임 입력 -->
    <MyPageInput
        label="새 닉네임"
        placeholder="새 닉네임을 입력해주세요"
        v-model="displayNickname"
    />
    <p class="helper-text">기존 닉네임: {{ originalNickname }}</p>

    <template #withButton>
      <!-- 구독 여부 선택 -->
      <MyPageItNewsSub v-model="itNewsSubscription"/>

      <!-- 수정 버튼 -->
      <MyPageButtonUpdate
          text="수정하기"
          @click="isModified ? handleUpdate() : null"
          :disabled="!isModified"
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
.helper-text {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
