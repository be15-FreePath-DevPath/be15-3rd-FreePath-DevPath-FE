<template>
  <div class="chatting-menu-modal" ref="modalRef">
    <div class="section">
      <div class="title">대화 상대</div>
      <div class="user" v-for="(user, index) in users" :key="index">
        <span class="icon">👤</span>
        <span>{{ user.nickname }}</span>
        <span v-if="user.isLeader">👑</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="section actions">
      <div class="action" @click="$emit('clickWaitingList')">대기인원 조회</div>
      <div class="action" @click="$emit('changeChattingRoomTitle')">채팅방 이름 변경</div>
      <div class="action exit" @click="$emit('exitChattingRoom')">채팅방 나가기</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  users: Array
});

const modalRef = ref(null);

// 외부 클릭 시 모달 닫기
const emit = defineEmits(['close']);
const handleClickOutside = (event) => {
  if (modalRef.value && !modalRef.value.contains(event.target)) {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style scoped>
.chatting-menu-modal {
  position: absolute;
  top: 50px;
  right: 20px;
  width: 220px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  z-index: 1000;
  font-size: 14px;
}
.section {
  padding: 10px;
}
.title {
  font-weight: bold;
  margin-bottom: 8px;
}
.user {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.user .icon {
  margin-right: 6px;
}
.divider {
  height: 1px;
  background-color: #e0e0e0;
}
.actions .action {
  padding: 6px 0;
  cursor: pointer;
}
.actions .exit {
  color: red;
  font-weight: bold;
}

</style>
