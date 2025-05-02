<script setup>
import {onMounted, ref} from "vue";
import ChattingCard from "@/features/chatting/components/chattingView/ChattingCard.vue";
import ChattingPendingCard from "@/features/chatting/components/ChattingPendingView/ChattingPendingCard.vue";

const newBreadCrumbItems = ref(['마이페이지','마이페이지','채팅 차단 목록 조회'])
const emit = defineEmits(['updateBreadCrumb'])

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
});

</script>

<template>
  <div class = "content-frame">
    <div class = "userBlockList">
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