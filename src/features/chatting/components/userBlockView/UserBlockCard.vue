<script setup>
import {ref, onMounted, onBeforeUnmount, defineProps} from 'vue'

const showOption = ref(false)
const optionWrapperRef = ref(null)
const props = defineProps({
  userBlock: {
    type: Object,
  }
})

const toggleOption = () => {
  showOption.value = !showOption.value
}

const handleClickOutside = (event) => {
  if (optionWrapperRef.value && !optionWrapperRef.value.contains(event.target)) {
    showOption.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="user-block-card">
    <div class="user-icon">
      <img src="@/assets/images/chatting/profile.png" alt="프로필사진" />
    </div>
    <div class="div-wrapper">
      <div class="text-wrapper">{{userBlock.nickname}}</div>
    </div>

    <!-- 옵션버튼 + 팝업을 감싸는 래퍼 -->
    <div class="option-wrapper" ref="optionWrapperRef">
      <button class="option-button" @click.stop="toggleOption">
        <img src="@/assets/images/chatting/optionButton.png" alt="옵션 버튼" />
      </button>

      <!-- 옵션 팝업 -->
      <div v-if="showOption" class="option-popup">
        <div class="popup-item">차단 해제</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-block-card {
  align-items: center;
  border: 1px solid #0000001a;
  display: flex;
  gap: 20px;
  height: 60px;
  padding: 10px 20px;
  position: relative;
}

.user-icon {
  position: relative !important;
}

.div-wrapper {
  width: 100%;
  align-self: stretch;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.text-wrapper {
  font-size: 14px;
  padding-left: 10px;
}

.option-wrapper {
  position: relative;
}

.option-button {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

/* ✅ 팝업이 버튼 위에 겹쳐서 나옴 */
.option-popup {
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 8px;
  z-index: 2;
  width: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.popup-item {
  padding: 10px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}
</style>
