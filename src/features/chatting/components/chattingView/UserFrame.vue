<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  nickname: String,
  mine: Boolean,
});

const showBlockModal = ref(false);
const profileRef = ref(null);
const modalRef = ref(null);

const toggleModal = () => {
  if (!props.mine) showBlockModal.value = !showBlockModal.value;
};

const handleClickOutside = (e) => {
  if (
      modalRef.value &&
      !modalRef.value.contains(e.target) &&
      !profileRef.value.contains(e.target)
  ) {
    showBlockModal.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="user-frame">
    <!-- Block Modal -->
    <div
        v-if="showBlockModal"
        class="block-modal"
        ref="modalRef"
        @click="$emit('userBlock')"
    >
      채팅 차단
    </div>
    <!-- 닉네임 -->
    <div class="frame">
      <div class="text-wrapper">{{ props.nickname }}</div>
    </div>

    <!-- 프로필 사진 -->
    <div class="user-icon" ref="profileRef" @click="toggleModal">
      <img
          src="../../../../assets/images/chatting/profile.png"
          alt="프로필사진"
      />
    </div>


  </div>
</template>

<style scoped>
.user-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 80px;
  width: 60px;
  gap: 8px;
}

.user-icon img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
}

/* 차단 모달 */
.block-modal {
  position: absolute;
  width: max-content;
  bottom: 70px; /* 이미지 위에 위치 */
  background: white;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 13px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  z-index: 100;
  cursor : pointer;
}

/* 닉네임 */
.frame {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.text-wrapper {
  font-size: 14px;
  text-align: center;
}
</style>
