<script setup>
import {ref} from "vue";

const text = ref('채팅내역입니다가나다라마바사아자차카타파하기니디리미비시이지티치 rrrrr rrrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrㅍㅍㅍㅍrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrdddddddd');
</script>

<template>
<div class="other-chatting">
  <p class="text-wrapper">
    {{text}}
  </p>
</div>
</template>

<style scoped>
.other-chatting{
  align-items : flex-start;
  background-color: #C6C7F8;
  border-radius:8px;
  display:inline-flex;
  max-width : 400px;
  padding: 10px 20px;
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
  margin-top : -1.00px;
  position:relative;
  word-wrap: anywhere; /* 단어가 길면 줄바꿈 */
  white-space: normal;   /* 일반 줄바꿈 허용 */
}
</style>