<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startTest = () => {
  router.push('/devti/test')
}
</script>

<template>
  <div class="devti-intro-page">
    <div class="test-intro-page">
      <div class="test-title">
        <div class="view"><div class="title-text">개발자 성향 테스트</div></div>
        <div class="view"><div class="subtitle-text">나는 어떤 개발자일까?</div></div>
      </div>

      <div class="devti-image"></div>

      <button class="start-button" @click="startTest">
        <div class="start-button-text">테스트 시작하기</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.devti-intro-page {
  display: flex;
  width: 600px;
  height: 600px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin: 60px auto;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.test-intro-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
  background-color: #ffffff;
  border-radius: 16px;
}

.test-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.view {
  display: flex;
  justify-content: center;
}

.title-text {
  font-size: 40px;
  font-weight: 600;
  color: #000000;
  line-height: 1.2;
}

.subtitle-text {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  line-height: 1.4;
}

.devti-image {
  width: 200px;
  height: 200px;
  background-image: url('@/assets/images/devti/devti-intro-image.png');
  background-size: cover;
  background-position: center;
}

.start-button {
  width: 200px;
  height: 54px;
  background-color: #f7f9fb;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.start-button-text {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}
</style>
