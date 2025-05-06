<script setup>

import OtherChatting from "@/features/chatting/components/chattingView/OtherChatting.vue";
import UserFrame from "@/features/chatting/components/chattingView/UserFrame.vue";
import {computed, defineProps} from "vue";

const props = defineProps({
  chatting: {
    type: Object,
  }
})

const formattedTimestamp = computed(() => {
  const timestamp = new Date(props.chatting.timestamp);
  let hours = timestamp.getHours();
  const minutes = timestamp.getMinutes().toString().padStart(2, '0');
  const isAM = hours < 12;

  const period = isAM ? '오전' : '오후';
  hours = hours % 12 || 12; // 0시는 12로 변환

  return `${period} ${hours}:${minutes}`;
});
</script>

<template>
<div class="other-chatting-wrapper">
  <UserFrame :nickname="props.chatting.nickname"/>
  <div class = "element">
    <OtherChatting class="other-chatting-instnace" :chatting="props.chatting"/>
    <p class = "timestamp">{{formattedTimestamp}}</p>
  </div>
</div>
</template>

<style scoped>
.other-chatting-wrapper{
  align-items : flex-end;
  display : flex;
  gap: 10px;
  padding: 10px 15px;
  position : relative;
}
.element {
  display: flex;
  align-items: flex-end; /* 하단 정렬 */
  gap: 10px;
  padding: 20px;
  position: relative;
}

.timestamp {
  font-size: 12px;
  color: gray;
}


</style>