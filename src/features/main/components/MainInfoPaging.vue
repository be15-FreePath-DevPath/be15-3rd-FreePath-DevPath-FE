<template>
  <div class="slider-container">
    <!-- 이미지 슬라이더 -->
    <div
        class="slider-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <img v-for="(img, index) in images" :key="index" :src="img" class="slide" alt="Main Info Image"/>
    </div>

    <!-- 네비게이션 dots -->
    <div class="dot-container">
      <div
          v-for="(dot, index) in images.length"
          :key="index"
          :class="['dot', { active: index === currentIndex }]"
          @click="goToSlide(index)">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const images = [
  new URL('@/assets/images/main/main-info.jpg', import.meta.url).href,
  new URL('@/assets/images/main/main-info2.jpg', import.meta.url).href,
  new URL('@/assets/images/main/main-info3.jpg', import.meta.url).href,
]

const currentIndex = ref(0)
let intervalId

// 자동 슬라이드
const startAutoSlide = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 5000)
}

// dot 클릭 시 이동
const goToSlide = (index) => {
  currentIndex.value = index
  resetInterval()  // 클릭하면 자동 슬라이드 타이머도 초기화
}

// 타이머 초기화 함수
const resetInterval = () => {
  clearInterval(intervalId)
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.slider-container {
  width: 1110px;
  height: 384px;
  overflow: hidden;
  position: relative;
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  width: 1110px;
  height: 384px;
  flex-shrink: 0;
  object-fit: cover;
}

.dot-container {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: lightgray;
  transition: background-color 0.3s;
  cursor: pointer; /* ✅ 클릭 가능하게 */
}

.dot.active {
  background-color: #aab6ff;
}
</style>
