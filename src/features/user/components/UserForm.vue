<script setup>
import UserWhiteButton from './UserWhiteButton.vue'

defineProps({
  title: {
    type: String,
    default: 'Welcome to DevPath'
  },
  subtitle: {
    type: String,
    default: '처음 방문하시나요?'
  },
  generalText: {
    type: String,
    default: '일반 회원가입'
  },
  googleText: {
    type: String,
    default: '구글 회원가입'
  },
  generalUrl: {
    type: String,
    default: '/user/signup/general'
  },
  googleUrl: {
    type: String,
    default: '/user/signup/google'
  }
})
</script>

<template>
  <div class="array">
    <div class="form">
      <div class="text-area">
        <div class="text1">{{ title }}</div>
        <div class="text2">{{ subtitle }}</div>
      </div>
      <div class="content">
        <UserWhiteButton :general="generalText" :google="googleText" :generalUrl="generalUrl" :googleUrl="googleUrl"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.array {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.form {
  background-color: #1c1c1c;
  width: 259.44px;
  filter: drop-shadow(0px 13px 27px rgba(0.196, 0.196, 0.364, 0.25));
  border-radius: 11.42px;
  padding: 22.4px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-style: hidden;
  outline: none;
}

.text-area{
  width: 215px;
  gap: 11.2px;

  display: flex;
  flex-direction: column;
}

.text-area .text1 {
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
  background: linear-gradient(
      95deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(190, 107, 255, 1) 54%,
      rgba(98, 95, 255, 1) 66%,
      rgba(198, 199, 248, 1) 79%
  );
  background-clip: text;
  color: transparent;
  font-family: "Inter-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  text-fill-color: transparent;
  top: 0;
  width: 215px;
}

.text-area .text2{
  color: #ffffff;
  text-align: left;
  vertical-align: text-top;
  font-size: 14px;
  font-family: Inter;
  line-height: auto;
  border-style: hidden;
  outline: none;
  width: 214.63961791992188px;
}

.content{
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

</style>