<script setup>
import { ref, watch } from 'vue'
import UserNoti from './UserNoti.vue'

// props로 v-model 받아오기
const props = defineProps({
  modelValue: {
    type: String,
    default: 'N'
  }
})

// emit으로 값 전달
const emit = defineEmits(['update:modelValue'])

// 이미지 경로 import
import subY from '@/assets/images/user/sub_y.png'
import subN from '@/assets/images/user/sub_n.png'
import notiWhite from '@/assets/images/user/noti_white.png'

// 구독 상태 (로컬용 ref)
const isSubscribed = ref(props.modelValue === 'Y')
watch(() => props.modelValue, (newVal) => {
  isSubscribed.value = newVal === 'Y'
}, { immediate: true })

// 상태 변경
function toggleSubscribe() {
  isSubscribed.value = !isSubscribed.value
  emit('update:modelValue', isSubscribed.value ? 'Y' : 'N')
}

// 안내사항 표시 상태
const showNoti = ref(false)

// props 변경 시 ref도 업데이트
watch(() => props.modelValue, (newVal) => {
  isSubscribed.value = newVal === 'Y'
})
</script>

<template>
  <div class="content">
    <!-- 타이틀 -->
    <div class="title">
      <div class="title-text-area">
        <div class="text">It 기사 구독</div>
      </div>

      <!-- info 아이콘 + 팝업 묶음 -->
      <div class="info-area" @mouseenter="showNoti = true" @mouseleave="showNoti = false">
        <img
            :src="notiWhite"
            class="info-icon"
            alt="info icon"
        />
        <!-- 안내 사항 -->
        <UserNoti
            v-if="showNoti"
            class="noti-popup"
            title="It News Subscription"
            subtitle="일주일에 한 번씩 주요 it 기사들을
                메일로 전송해 주는 서비스입니다"/>
      </div>
    </div>

    <!-- 구독 버튼 -->
    <div class="it-news-button">
      <img
          :src="isSubscribed ? subY : subN"
          class="subscribe-icon"
          @click="toggleSubscribe"
          alt="sub"
      />
      <div class="text">구독하기</div>
    </div>
  </div>
</template>

<style scoped>
.content {
  height: 52px;
  width: 100%;
  display: flex;
  flex-direction: column;
  outline: none;
}

.title {
  height:20px;
  width:100%;
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
  align-items:center;
  position:relative;
}

.title-text-area {
  height: 20px;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-style: hidden;
  outline: none;
  width: auto;
}

.text {
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  outline: none;
  width: auto;
}

.it-news-button {
  height: 28px;
  width: 213.64px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  position: relative;
}

.info-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.subscribe-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* 안내사항 팝업 위치 조정 */
.noti-popup {
  position: absolute;
  top: 0;
  left: 250px;
  z-index: 10;
}
</style>
