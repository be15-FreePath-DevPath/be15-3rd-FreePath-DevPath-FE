<script setup>

import LayoutDefault from "@/components/layout/LayoutDefault.vue";

import {provide, ref} from 'vue'
import ChattingRoomCard from "@/features/chatting/components/ChattingRoomCard.vue";
import ChattingInsertFrame from "@/features/chatting/components/ChattingInsertFrame.vue";
import ChattingCard from "@/features/chatting/components/ChattingCard.vue";

const items = ref(['DevPath','채팅'])

provide('items', items);
</script>

<template>
  <LayoutDefault>
    <div class = "content-frame">
      <div class = "chattingRoomList">
          <ChattingRoomCard/>
        <ChattingRoomCard/>
        <ChattingRoomCard/>
        <ChattingRoomCard/>
      </div>
      <div class = "chattingFrame">
        <div class = "chattingList">
        <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
      </div>
        <ChattingInsertFrame/>
      </div>
    </div>
  </LayoutDefault>
</template>

<style scoped>
.content-frame {
  display: flex;
  flex: 1;
  flex-direction: row;  /* 가로 방향*/


  gap: 10px;

  align-items: flex-start; /* 정렬: 왼쪽 정렬 */
  justify-content: flex-start; /* 정렬: 위쪽 정렬 */

  padding: 27px 46px 0px 27px; /* 위 오른쪽 아래 왼쪽 순서 (시계방향) */

  overflow: hidden; /* Clip content 과 같음 */
}
.chattingRoomList{
  width: 240px;
  height: 100%;

  display: flex;
  flex-direction: column;
}
.chattingFrame{
  width : 100%;
  height : 100%;
}
</style>