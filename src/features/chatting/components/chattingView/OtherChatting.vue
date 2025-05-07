<script setup>
import {defineProps, ref} from "vue";
const props = defineProps({
  chatting: {
    type: Object,
  }
})
</script>

<template>
<div class="other-chatting">
  <p class="text-wrapper">
    {{props.chatting.message}}
  </p>
</div>
</template>

<style scoped>
.other-chatting{
  align-items: center;
  background-color: #C6C7F8;
  border-radius:8px;
  display: flex;
  max-width : 400px;
  padding: 10px 14px;
  padding-right : 30px;
  position:relative;
}
.text-wrapper{
  flex:1;
  font-family: "Inter Semi Bold",Helvetica;
  font-size:16px;
  font-weight:600;
  max-width : 400px;
  letter-spacing: 0;
  line-height : 24px;
  margin : 1px;
  position:relative;
  word-wrap: anywhere; /* 단어가 길면 줄바꿈 */
  white-space: normal;   /* 일반 줄바꿈 허용 */
}
</style>