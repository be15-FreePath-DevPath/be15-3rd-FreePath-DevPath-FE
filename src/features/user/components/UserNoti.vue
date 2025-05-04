<script setup>
defineProps({
  title: {
    type: String,
    default: 'Welcome to DevPath'
  },
  subtitle: {
    type: String,
    default: '처음 방문하시나요?'
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
    </div>
  </div>
</template>

<style scoped>
/* 스타일은 그대로 유지 */
.array {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.form {
  background-color: #ffffff;
  width: 259.44px;
  filter: drop-shadow(0px 13px 27px rgba(0.196, 0.196, 0.364, 0.25));
  border-radius: 11.42px;
  padding: 22.4px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-style: hidden;
  outline: none;
}

.text-area {
  width: auto;
  gap: 11.2px;
  display: flex;
  flex-direction: column;
}

.text-area .text1 {
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
  background: linear-gradient(
      95deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(52, 55, 201, 1) 54%,
      rgba(98, 95, 255, 1) 66%,
      rgba(190, 107, 255, 1) 79%
  );
  background-clip: text;
  color: transparent;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  width: 215px;
}

.text-area .text2 {
  color: #1c1c1c;
  text-align: left;
  font-size: 14px;
  line-height: normal;
  border-style: hidden;
  outline: none;
  width: 214.64px;
}

</style>
