<script setup>
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue'
import ChattingInsertFrame from "@/features/chatting/components/chattingView/ChattingInsertFrame.vue";
import {
  getChatting,
  getChattingRoomJoinUsers,
  getChattingRoomList,
  getWaitingRoom,
  putGroupChattingAccept, updateGroupChattingRoom
} from "@/features/chatting/api.js";
import ChattingRoomListFrame from "@/features/chatting/components/chattingView/ChattingRoomListFrame.vue"
import ChattingListFrame from "@/features/chatting/components/chattingView/ChattingListFrame.vue";
import { connectStomp, subscribeStomp, sendMessage, disconnectStomp } from '@/features/chatting/stomp-client.js';
import ChattingHeaderFrame from "@/features/chatting/components/chattingView/ChattingHeaderFrame.vue";
import ChattingOptionModal from "@/features/chatting/components/chattingView/ChattingOptionModal.vue";
import WaitingListModal from "@/features/chatting/components/chattingView/WaitingListModal.vue";
import UserModal from "@/features/user/components/UserModal.vue";
import ChangeChattingRoomModal from "@/features/chatting/components/chattingView/ChangeChattingRoomModal.vue";

const newBreadCrumbItems = ref(['채팅','채팅','참여 중인 채팅방'])
const emit = defineEmits(['updateBreadCrumb'])
const chattingRooms = ref([]);
const chattings = ref([]);
const selectedRoom = ref(0);
const chattingUsers = ref([]);
const isOptionModal = ref(false)
const isWaitingListModal = ref(false)
const waitingUsers = ref([])
const isUserModal = ref(false)
const modalTitle = ref('');
const modalSubtitle = ref('');
const isChangeChattingRoomModal = ref(false);

const showOptionModal = async () => {
  isOptionModal.value = true
  try{
    const { data : wrapper } = await getChattingRoomJoinUsers(selectedRoom.value);
    const respData = wrapper.data;
    chattingUsers.value = respData.chattingroomJoinUserList;
    console.log('채팅 참여자 : '+chattingUsers.value);
  }catch(e){
    console.log("채팅방 참여 인원 조회 실패",e);
  }
}
const showWaitingUListModal = async () => {
  isWaitingListModal.value = true;
  try{
    const { data : wrapper } = await getWaitingRoom(selectedRoom.value);
    const respData = wrapper.data;
    waitingUsers.value = respData.chattingRoomWatingDTOList;
    console.log('참여대기자 : '+waitingUsers.value);
  }catch(e){
    console.log("참여대기자 조회 실패",e);
  }
}


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

const onRoomSelected = async (room) => {
  selectedRoom.value = room;
  console.log(`chattingRoomId : ${selectedRoom.value}`);
  await fetchChattings(selectedRoom.value);
  subscribeStomp((subResponse) => {
    console.log("새 메시지 도착:", subResponse);
    addChat(subResponse);
  }, room);
}

const addChat = (subResponse) => {
  chattings.value.push({
     userId : subResponse.userId,
     nickname : subResponse.nickname,
     message : subResponse.message,
     timestamp : subResponse.timestamp
  })

}

const sendChat = (message) => {
  console.log(`send : ${selectedRoom.value} , ${message}`);
  sendMessage('/app/chatting/send', { chattingRoomId: selectedRoom.value, chattingMessage:message });
}

const getRoomTitle = (roomId) => {
  const room = chattingRooms.value.find(r => r.chattingRoomId === roomId);
  return room ? room.chattingRoomTitle : '채팅방';
};

const groupChattingAccept = async (userId,action) => {
  const payload = {
    chattingRoomId : selectedRoom.value,
    inviteeId : userId,
    action : action
  }
  console.log(payload);
  try{
    await putGroupChattingAccept(payload);
    modalTitle.value = '참여 요청 처리 완료';
    modalSubtitle.value = '참여 요청을 처리했습니다.'
  }catch(e){
    modalTitle.value = '참여 요청 처리 실패';
    modalSubtitle.value = '알수 없는 오류가 발생했습니다.'
  }
  isUserModal.value = true;
}

const renameRoom = async (newName) => {
  const payload = {
    chattingRoomId : selectedRoom.value,
    chattingRoomTitle : newName
  }
  try{
    await updateGroupChattingRoom(payload)
    modalTitle.value = '채팅방 제목 변경 완료';
    modalSubtitle.value = '채팅방 제목을 변경했습니다..'
  }catch(e){
    modalTitle.value = '채팅방 제목 변경 실패';
    modalSubtitle.value = '알수 없는 오류가 발생했습니다.'
  }
  isUserModal.value = true;
  isChangeChattingRoomModal.value = false;
  await fetchChattingRoomList();
}



onMounted(async () => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
  await connectStomp();
  await fetchChattingRoomList();
});

// 컴포넌트가 제거될 때 연결 해제
onBeforeUnmount(() => {
  disconnectStomp();
})
</script>

<template>
    <div class = "content-frame" style="position: relative">
      <ChattingRoomListFrame :rooms="chattingRooms" @selectRoom="onRoomSelected"/>

      <div class = "chattingFrame">
        <ChattingHeaderFrame
            v-if="selectedRoom"
            :roomTitle="getRoomTitle(selectedRoom)"
            @openOptions="showOptionModal"

        />
        <ChattingOptionModal
            v-if="isOptionModal"
            :users="chattingUsers"
            @close="isOptionModal = false"
            @clickWaitingList = "showWaitingUListModal"
            @changeChattingRoomTitle = "isChangeChattingRoomModal = true"/>
        <WaitingListModal
            v-if="isWaitingListModal"
            :waitingUsers="waitingUsers"
            @close = "isWaitingListModal = false"
            @groupChattingAccept = "groupChattingAccept"
        />
        <ChattingListFrame :chattings="chattings"/>
        <ChattingInsertFrame v-if="selectedRoom" class = "chattingInsertFrame" @sendMessage="sendChat"/>
      </div>
    </div>
  <ChangeChattingRoomModal
      v-if="isChangeChattingRoomModal"
      @submit="renameRoom"
      @close="isChangeChattingRoomModal = false"
  />
  <UserModal
      v-if="isUserModal"
      :title="modalTitle"
      :subtitle="modalSubtitle"
      @close="isUserModal = false"
  />
</template>

<style scoped>
.content-frame {
  display: flex;
  height: 100%;         /* 💡 부모(main-content)에 꽉 차게 */
  width: 100%;
  flex-direction: row;
  overflow: hidden;     /* 스크롤 제거 */
  border : #666666;
}
.chattingFrame{
  flex: 1;
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  overflow: hidden; /* 전체 프레임은 스크롤 안 생기게 */
  border-left: 1px solid #ddd;
}

.chattingInsertFrame {
  height : fit-content; /* 원하는 고정 높이 */
  flex-shrink: 0;
  border-top: 1px solid #ddd;

}

</style>