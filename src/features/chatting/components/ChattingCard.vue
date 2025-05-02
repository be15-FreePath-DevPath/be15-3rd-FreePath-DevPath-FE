<script setup>

import OtherChatting from "@/features/chatting/components/OtherChatting.vue";
import UserFrame from "@/features/chatting/components/UserFrame.vue";
</script>

<template>
<div class="other-chatting-wrapper">
  <UserFrame/>
  <div class = "element">
    <OtherChatting class="other-chatting-instnace"/>
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