<script setup>
import {ref} from "vue";

const message = ref('')
const emit = defineEmits(['sendMessage'])

const send = () => {
  if (message.value.trim() !== '') {
    emit('sendMessage', message.value)
    message.value = ''
  }
}

</script>

<template>
<div class = "chatting-insert">
  <div class="div-wrapper">
    <div class="text-wrapper">
      <textarea type="text" v-model="message" class="chat-input" placeholder="메시지를 입력하세요..." @keydown.enter.prevent="send"/>
    </div>
  </div>
  <button class = "send-button">
    <img src="../../../../assets/images/chatting/chattingSend.png" alt = "전송" @click="send"/>
  </button>
</div>
</template>

<style scoped>
.chatting-insert{
  align-items:center;
  display : flex;
  gap : 20px;
  height : 83px;
  justify-content: flex-end;
  padding:16px;
  position:relative;
  min-width: 0;

}
.div-wrapper{
  flex: 1;
  margin-right: 10px;
}
.chat-input {
  width: 100%;
  height: 40px;
  padding: 8px;
  resize: none;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}
.send-button{
  background: none;
  border: none;
  cursor: pointer;
}
.text-wrapper{
  width : 100%;
}


</style>