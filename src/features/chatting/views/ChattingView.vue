<script setup>
import {onMounted, ref} from 'vue'
import ChattingRoomCard from "@/features/chatting/components/chattingView/ChattingRoomCard.vue";
import ChattingInsertFrame from "@/features/chatting/components/chattingView/ChattingInsertFrame.vue";
import ChattingCard from "@/features/chatting/components/chattingView/ChattingCard.vue";
import {getChattingRoomList} from "@/features/chatting/api.js";
import ChattingRoomList from "@/features/chatting/components/chattingView/ChattingRoomList.vue"
const newBreadCrumbItems = ref(['채팅','채팅','참여 중인 채팅방'])
const emit = defineEmits(['updateBreadCrumb'])
const chattingRooms = ref([]);

const fetchChattingRoomList =async() => {
  try {
    // api 호출 (axios lib)
    const { data : wrapper } = await getChattingRoomList();
    const respData = wrapper.data;
    chattingRooms.value = respData.chattingRooms || [];
    // Object.assign(target, ...sources) : source의 속성을 모두 꺼내 target에 덮어쓰기
    console.log('채팅방 목록 : ',chattingRooms.value);
  } catch(e) {
    console.log('채팅방 목록 로드 실패', e);
  }
}



onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
  fetchChattingRoomList();
  chattingRooms.value = [
    {chattingRoomId : 1,
    chattingRoomTitle : '채팅방1',
    userCount : 2},
    {chattingRoomId : 1,
      chattingRoomTitle : '채팅방1',
      userCount : 2},
  ]
});
</script>

<template>
    <div class = "content-frame">
      <ChattingRoomList :rooms="chattingRooms" />

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