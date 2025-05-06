<script setup>
import {defineProps} from "vue";

const props = defineProps({
  nickname: {
    type: String,
  }
})
</script>

<template>
  <div class="user-frame">
    <div class="frame">
      <div class="text-wrapper">{{ props.nickname }}</div>
    </div>
    <div class="user-icon">
      <img src="../../../../assets/images/chatting/profile.png" alt="프로필사진" />
    </div>
  </div>
</template>

<style scoped>
.user-frame {
  display: flex;
  flex-direction: column;
  align-items: center;       /* 가로 기준 가운데 정렬 */
  justify-content: center;   /* 세로 기준 가운데 정렬 */
  height: 80px;
  width: 60px;
  gap: 8px;
  position: relative;
}

.frame {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.text-wrapper {
  font-family: "Inter-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 1.2;
  position: static; /* 기존 absolute 제거 */
}

.user-icon img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  display: block;
  border-radius: 50%;
}
</style>
