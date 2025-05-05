<script setup>
import {onMounted, reactive, ref} from 'vue'
import ChattingInsertFrame from "@/features/chatting/components/chattingView/ChattingInsertFrame.vue";
import {getChatting, getChattingRoomList} from "@/features/chatting/api.js";
import ChattingRoomListFrame from "@/features/chatting/components/chattingView/ChattingRoomListFrame.vue"
import ChattingListFrame from "@/features/chatting/components/chattingView/ChattingListFrame.vue";
const newBreadCrumbItems = ref(['채팅','채팅','참여 중인 채팅방'])
const emit = defineEmits(['updateBreadCrumb'])
const chattingRooms = ref([]);
const chattings = ref([]);
const selectedRoom = ref(0);
const myChatting = reactive([
  [{
    userId :  1,
    nickname : '닉네임1',
    message : '1111-1',
    timestamp : '시간1-1'
  },
    {
      userId :  1,
      nickname : '닉네임1',
      message : '1111-2',
      timestamp : '시간1-2'
    }],
  [
    {
      userId :  2,
      nickname : '닉네임2',
      message : '2222-1',
      timestamp : '시간2-1'
    },
    {
      userId :  2,
      nickname : '닉네임2',
      message : '2222-2',
      timestamp : '시간2-2'
    }
  ]]);

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

const fetchChattings = async (chattingRoomId) => {
  try{
  // api 호출 (axios lib)
    const { data : wrapper } = await getChatting(chattingRoomId);
    const respData = wrapper.data;
    chattings.value = respData.chattingList || [];
    // Object.assign(target, ...sources) : source의 속성을 모두 꺼내 target에 덮어쓰기
    console.log('채팅 내역 : ',chattings.value);
} catch(e) {
  console.log('채팅 내역 로드 실패', e);
}
}

const onRoomSelected = (room) => {
  selectedRoom.value = room;
  console.log(`chattingRoomId : ${selectedRoom.value}`);
  fetchChattings(selectedRoom.value);
  chattings.value = myChatting[selectedRoom.value-1];
  chattings.value.forEach(msg => {
    console.log(msg);
  });
}

const sendMessage = (message) => {
  console.log(`send : ${selectedRoom.value} , ${message}`);
  chattings.value.push({
    userId :  2,
    nickname : '닉네임2',
    message : message,
    timestamp : '시간2-2'
  })
}

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
  fetchChattingRoomList();
  chattingRooms.value = [
    {chattingRoomId : 1,
    chattingRoomTitle : '채팅방1',
    userCount : 1,},
    {chattingRoomId : 2,
      chattingRoomTitle : '채팅방2',
      userCount : 2},
    {chattingRoomId : 3,
      chattingRoomTitle : '채팅방3',
      userCount : 3}
  ]

  const original = [...myChatting[1]];
  for (let i = 0; i < 5; i++) {
    myChatting[1].push(...original);
  }

  myChatting[1].forEach(msg => {
    console.log(msg);
  });
});
</script>

<template>
    <div class = "content-frame">
      <ChattingRoomListFrame :rooms="chattingRooms" @selectRoom="onRoomSelected"/>

      <div class = "chattingFrame">
        <ChattingListFrame :chattings="chattings"/>
        <ChattingInsertFrame v-if="selectedRoom" class = "chattingInsertFrame" @sendMessage="sendMessage"/>
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