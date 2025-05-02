<script setup>
import {onMounted, ref} from "vue";
import ChattingCard from "@/features/chatting/components/chattingView/ChattingCard.vue";
import ChattingPendingCard from "@/features/chatting/components/waitingChattingRoom/ChattingPendingCard.vue";

const newBreadCrumbItems = ref(['채팅','채팅','참여 대기 중인 채팅방'])
const emit = defineEmits(['updateBreadCrumb'])

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
});

</script>

<template>
  <div class = "content-frame">
    <div class = "chattingRoomList">
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>
      <ChattingPendingCard/>

      <ChattingPendingCard/>
      <ChattingPendingCard/>

    </div>
  </div>
</template>

<style scoped>
.content-frame{
  display: flex;
  height: 100%;         /* 💡 부모(main-content)에 꽉 차게 */

  flex-direction: column;
}
.chattingRoomList{
  position : relative;
  flex: 1;
  width : 100%;

  min-width: 0;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  gap:10px;
  padding: 10px 10px;
}
</style>