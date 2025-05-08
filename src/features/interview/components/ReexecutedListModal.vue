<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-frame">
      <!-- 헤더 -->
      <div class="layer">
        <div class="info-text-component">
          <div class="div-wrapper">
            <div class="info-text">재실행한 면접방 목록</div>
          </div>
        </div>
        <div class="title-default">
          <div class="div-wrapper">
            <p class="text-wrapper">이 면접방과 같은 질문으로 재실행된 면접방 목록입니다.</p>
          </div>
        </div>
      </div>

      <!-- 목록 -->
      <div class="reexecuted">
        <div
            class="small-interview"
            v-for="room in rooms"
            :key="room.id"
            @click="goToRoom(room.id)"
        >
          <div class="interview-title">
            <div class="div">{{ room.title }}</div>
          </div>
          <div class="frame">
            <div class="calendar-icon-text">
              <div class="calendar-icon">
                <img class="calendar-blank" src="@/assets/images/interview/calendar-blank.png" />
              </div>
              <div class="div-wrapper-2">
                <div class="date">{{ room.date }}</div>
              </div>
            </div>
            <div class="score-badge">
              <div class="score">{{ room.score !== null ? room.score + '점' : '-' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 닫기 버튼 -->
      <div class="interview-run-button">
        <button class="button" @click="emit('close')">
          <div class="text">닫기</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const emit = defineEmits(['close']) // 닫기 이벤트

const props = defineProps({
  rooms: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

const goToRoom = (roomId) => {
  emit('close')
  router.push(`/interview/${roomId}`)
      .then(() => {
        window.scrollTo(0, 0)
      })
}
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-frame {
  background-color: #f7f9fb;
  border-radius: 16px;
  padding: 40px;
  width: 420px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.layer,
.title-default {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-text {
  font-weight: 600;
  font-size: 16px;
  color: #000;
}

.text-wrapper {
  font-size: 12px;
  color: #666;
}

.reexecuted {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.small-interview {
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.small-interview:hover {
  background-color: #e6ebf0;
}

.interview-title .div {
  font-weight: 600;
  font-size: 14px;
}

.frame {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}

.calendar-icon-text {
  display: flex;
  align-items: center;
  gap: 6px;
}

.calendar-blank {
  width: 16px;
  height: 16px;
}

.date {
  font-size: 13px;
  color: #333;
}

.score-badge .score {
  font-size: 13px;
  color: #666;
}

.interview-run-button {
  display: flex;
  justify-content: center;
}

.button {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: 600;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
</style>
