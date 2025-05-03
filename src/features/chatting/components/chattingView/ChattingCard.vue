<script setup>

import OtherChatting from "@/features/chatting/components/chattingView/OtherChatting.vue";
import UserFrame from "@/features/chatting/components/chattingView/UserFrame.vue";
import {defineProps} from "vue";

const props = defineProps({
  chatting: {
    type: Object,
  }
})
</script>

<template>
<div class="other-chatting-wrapper">
  <UserFrame :nickname="props.chatting.nickname"/>
  <div class = "element">
    <OtherChatting class="other-chatting-instnace" :chatting="props.chatting"/>
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
.element{
  align-items : center;
  display: flex;
  flex:1;
  gap:10px;
  padding:20px;
  position:relative;
}

</style>