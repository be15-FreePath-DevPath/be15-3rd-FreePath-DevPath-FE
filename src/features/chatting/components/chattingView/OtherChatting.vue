<script setup>
import {ref} from "vue";

const text = ref('채팅내역');
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
  letter-spacing: 0;
  line-height : 24px;
  margin-top : -1.00px;
  position:relative;

}
</style>