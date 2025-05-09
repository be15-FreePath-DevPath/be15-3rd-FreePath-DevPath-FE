<script setup>
defineProps({
  title: {
    type: String,
    default: "Wait! It's a wrong input"
  },
  subtitle: {
    type: String,
    default: '잘못된 입력입니다'
  }
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>

<template>
  <teleport to="body">
    <div class="overlay" @click="closeModal">
      <div class="frame" @click.stop>
        <div class="main-area">
          <div class="text1">{{ title }}</div>
          <img src="@/assets/images/user/x.png" @click="closeModal" style="cursor: pointer;" alt="x-icon"/>
        </div>
        <div class="text2">{{ subtitle }}</div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
/* 오버레이 배경 설정 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 70% 투명한 회색 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소보다 위에 표시되도록 */
}

/* 모달 프레임 스타일링 */
.frame {
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
  z-index: 1010; /* 오버레이보다 위에 표시되도록 */
}

/* 헤더 부분 */
.main-area {
  height: 19px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

/* 텍스트 스타일 */
.text1 {
  background: linear-gradient(
      95deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(52, 55, 201, 1) 15%,
      rgba(98, 95, 255, 1) 40%,
      rgba(190, 107, 255, 1) 65%
  );
  background-clip: text;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  width: 215px;
}

.text2{
  font-size: 14px;
  width: auto;
  white-space: normal;
  word-break: break-word;
}
</style>
