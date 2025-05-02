<script setup>
import {onMounted, ref} from "vue";

const newBreadCrumbItems = ref(['채팅','채팅','참여 대기 중인 채팅방'])
const emit = defineEmits(['updateBreadCrumb'])

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
});

</script>

<template>
  <div class = "content-frame">
    <div class = "chattingRoomList">

    </div>
  </div>
</template>

<style scoped>
.content-frame{
  display: flex;
  height: 100%;         /* 💡 부모(main-content)에 꽉 차게 */
  width: 100%;
  flex-direction: column;
}
.chattingRoomList{
  flex: 1;
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
}
</style>