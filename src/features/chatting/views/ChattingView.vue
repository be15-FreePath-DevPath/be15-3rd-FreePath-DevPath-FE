<script setup>
import {onMounted, ref} from 'vue'
import ChattingRoomCard from "@/features/chatting/components/chattingView/ChattingRoomCard.vue";
import ChattingInsertFrame from "@/features/chatting/components/chattingView/ChattingInsertFrame.vue";
import ChattingCard from "@/features/chatting/components/chattingView/ChattingCard.vue";

const newBreadCrumbItems = ref(['채팅','채팅','참여 중인 채팅방'])
const emit = defineEmits(['updateBreadCrumb'])

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
});
</script>

<template>
    <div class = "content-frame">
      <div class = "chattingRoomList">
          <ChattingRoomCard/>
        <ChattingRoomCard/><ChattingRoomCard/><ChattingRoomCard/><ChattingRoomCard/><ChattingRoomCard/><ChattingRoomCard/><ChattingRoomCard/><ChattingRoomCard/>
        <ChattingRoomCard/>
        <ChattingRoomCard/>
        <ChattingRoomCard/> <ChattingRoomCard/>
        <ChattingRoomCard/>

        <ChattingRoomCard/>
        <ChattingRoomCard/>
      </div>
      <div class = "chattingFrame">
        <div class = "chattingList">
        <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
          <ChattingCard/>
      </div>
        <ChattingInsertFrame class = "chattingInsertFrame"/>
      </div>
    </div>
</template>

<style scoped>
.content-frame {
  display: flex;
  height: 100%;         /* 💡 부모(main-content)에 꽉 차게 */
  width: 100%;
  flex-direction: row;
  overflow: hidden;     /* 스크롤 제거 */
}
.chattingRoomList{
  width: fit-content;
  height: 100%;         /* 💡 세로 꽉 채움 */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.chattingFrame{
  flex: 1;
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  overflow: hidden; /* 전체 프레임은 스크롤 안 생기게 */
}
.chattingList{
  flex: 1;
  overflow-y: auto; /* 여기만 스크롤 */
  min-height: 0;
}
.chattingInsertFrame {
  height : fit-content; /* 원하는 고정 높이 */
  flex-shrink: 0;
  border-top: 1px solid #ddd;
}

</style>