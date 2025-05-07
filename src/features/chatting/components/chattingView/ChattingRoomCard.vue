<script setup>
import { defineProps } from 'vue'

const emit = defineEmits(['selectRoom'])

const {room} = defineProps({
  room: {
    type: Object
  }
});

const onClick = () => {
  emit('selectRoom', room.chattingRoomId)
  console.log(`ChattingRoomCard : chattingRoomId : ${room.chattingRoomId}`);
}
</script>

<template>
<div class = "chattingRoomCard" @click="onClick">
<div class = Profile>
<!--  나중에 사용자 이미지로 수정-->
  <img src="../../../../assets/images/common/header/navToggle.png" alt="아이콘" class="icon" />
</div>
  <div class ="chattingRoomName">
    {{room.chattingRoomTitle}}
  </div>
  <div class = "userCount">
    {{ room.userCount }}
  </div>
</div>
</template>

<style scoped>
.chattingRoomCard{
  width:232px;
  height: 60px;
  align-items: center;
  align-content: center;
  display : inline-flex;
  flex-direction: row;
  gap : 10px;
  padding: 10px 10px;
  position : relative;
  cursor: pointer;
}
.Profile{
  width : 40px;
  height : 40px;
}
.chattingRoomName{
width : 138px;
  height: 40px;
  font-size : 14px;
}
.userCount{
  width : 14px;
  height : 40px;
  font-size : 14px
}

</style>