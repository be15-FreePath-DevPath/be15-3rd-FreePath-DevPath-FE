<script setup>
import {onMounted, ref} from "vue";
import ChattingPendingCard from "@/features/chatting/components/ChattingPendingView/ChattingPendingCard.vue";
import {getChatting, getChattingPendingList} from "@/features/chatting/api.js";

const newBreadCrumbItems = ref(['채팅','채팅','참여 대기 중인 채팅방'])
const emit = defineEmits(['updateBreadCrumb'])
const chattingPendingList = ref([]);

const fetchChattingPendingList = async () => {
  const { data : wrapper } = await getChattingPendingList();
  const respData = wrapper.data;
  chattingPendingList.value = respData.waitingChattingRoomDTOList;

}

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
  fetchChattingPendingList()
  chattingPendingList.value = [
    {chattingRoomTitle : '채팅방 제목1'},
    {chattingRoomTitle : '채팅방 제목2'},
    {chattingRoomTitle : '채팅방 제목3'},
    {chattingRoomTitle : '채팅방 제목4'},
    {chattingRoomTitle : '채팅방 제목5'}
  ];
});

</script>

<template>
  <div class = "content-frame">
    <div class = "chattingRoomList">
      <ChattingPendingCard v-for = "chattingPendingRoom in chattingPendingList " :chattingPendingRoom = "chattingPendingRoom"/>
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