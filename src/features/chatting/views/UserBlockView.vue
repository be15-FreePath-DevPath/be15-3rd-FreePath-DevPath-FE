<script setup>
import {onMounted, ref} from "vue";
import UserBlockCard from "@/features/chatting/components/userBlockView/UserBlockCard.vue";
import {getChattingPendingList, getUserBlocked} from "@/features/chatting/api.js";

const newBreadCrumbItems = ref(['마이페이지','마이페이지','채팅 차단 목록 조회'])
const emit = defineEmits(['updateBreadCrumb'])
const userBlockList = ref([]);

const fetchUserBlockList = async () => {
  try{
    const { data : wrapper } = await getUserBlocked();
    const respData = wrapper.data;
    userBlockList.value = respData.userBlockDTOList;
  }catch(e){
    console.log('차단 목록 조회 실패 ',e);
  }
}

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
  fetchUserBlockList();
  userBlockList.value = [
    {userId : 1,
    nickname : 'nickname1'},
    {userId : 2,
      nickname : 'nickname2'},
    {userId : 3,
      nickname : 'nickname3'},
    {userId : 4,
      nickname : 'nickname4'},
  ]
});

</script>

<template>
  <div class = "content-frame">
    <div class = "userBlockList">
      <UserBlockCard v-for = "userBlock in userBlockList" :userBlock = "userBlock"/>
    </div>
  </div>
</template>

<style scoped>
.content-frame{
  display: flex;
  height: 100%;         /* 💡 부모(main-content)에 꽉 차게 */

  flex-direction: column;
}
.userBlockList{
  position : relative;
  flex: 1;
  width : 100%;

  min-width: 0;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  gap:10px;
  padding: 10px 10px;
}
</style>