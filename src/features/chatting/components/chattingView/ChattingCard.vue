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
  <div :class="['chatting-wrapper', props.chatting.mine ? 'my-chat' : 'other-chat']">
    <UserFrame :nickname="props.chatting.nickname" />
    <div class="element">
      <OtherChatting class="other-chatting-instance" :chatting="props.chatting" />
    </div>
    <p class="timestamp">{{ formattedTimestamp }}</p>
  </div>
</template>


<style scoped>
.chatting-wrapper {
  display: flex;
  gap: 10px;
  padding: 10px 15px;
  position: relative;
  align-items: flex-end;
}

/* 기본 왼쪽 정렬 */
.other-chat {
  flex-direction: row;
  justify-content: flex-start;
}

/* 내 채팅일 때 오른쪽 정렬 */
.my-chat {
  flex-direction: row-reverse;
}

.element {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 20px;
  position: relative;
}

.timestamp {
  font-size: 12px;
  color: gray;
}


</style>