<script setup>
import {defineProps} from "vue";

const props = defineProps({
  chattingPendingRoom: {
    type: Object,
  }
})
</script>

<template>
  <div class="chattingPendingCard">
    <div class="user-icon">
      <img src="@/assets/images/chatting/profile.png" alt="프로필사진"/>
    </div>
    <div class="div-wrapper">
      <div class="text-wrapper">{{chattingPendingRoom.chattingRoomTitle}}</div>
    </div>
  </div>
</template>



<style>
.chattingPendingCard {
  align-items: center;
  border: 1px solid #0000001a;
  display: flex;
  gap: 20px;

  height: 60px;
  padding: 10px 20px;
  position: relative;
}

.user-icon {
  position: relative !important;
}

.div-wrapper {
  width : 100%;
  align-self: stretch;
  flex: 1;
  position : relative;
  display: flex;              /* Flexbox 사용 */
  flex-direction: row;        /* 가로 방향 정렬 (기본값이긴 하지만 명시적으로 작성) */
  align-items: center;   /* 세로(상하) 가운데 정렬 */
  justify-content: flex-start;
}

.text-wrapper {
  color: #000000;
  font-family: "Inter-Regular",Helvetica;
  font-size: 14px;
  display: flex;
  align-items: center;   /* 세로(상하) 가운데 정렬 */
  justify-content: flex-start; /* 가로(좌측) 정렬 */
  height: 100%;          /* 부모 높이 기준 */
  padding-left: 10px;
}
</style>
