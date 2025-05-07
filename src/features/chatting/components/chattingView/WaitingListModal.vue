<template>
  <div class="waiting-list-modal" @click.stop ref="modalRef">
    <div class="modal-header">참여 신청 목록</div>
    <div v-for="user in waitingUsers" :key="user.userId" class="user-row">
      <span>👤 {{ user.nickname }}</span>
      <div class="actions">
        <span class="accept" @click="groupChattingAccept(user.userId,'ACCEPT')">🟢</span>
        <span class="reject" @click="groupChattingAccept(user.userId,'REJECT')">❌</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

defineProps(['waitingUsers','groupChattingAccept']);

const modalRef = ref(null);

// 외부 클릭 시 모달 닫기
const emit = defineEmits(['close']);
const handleClickOutside = (event) => {
  if (modalRef.value && !modalRef.value.contains(event.target)) {
    emit('close');
  }
};

const groupChattingAccept = (userId,action) =>{
  emit('groupChattingAccept',userId,action);
}
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

</script>

<style scoped>
.waiting-list-modal {
  position: absolute;
  top: 50px;
  right: 240px; /* 기존 모달 오른쪽 */
  width: 200px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  z-index: 1001;
}
.modal-header {
  font-weight: bold;
  margin-bottom: 8px;
}
.user-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
}
.actions span {
  margin-left: 6px;
  font-size: 16px;
  cursor: pointer;
}
.accept { color: green; }
.reject { color: red; }
</style>
