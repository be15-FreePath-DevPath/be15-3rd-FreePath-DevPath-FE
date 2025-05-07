<script setup>
import {onMounted, ref} from "vue";
import UserBlockCard from "@/features/chatting/components/userBlockView/UserBlockCard.vue";
import {deleteBlockUser, getChattingPendingList, getUserBlocked} from "@/features/chatting/api.js";
import UserModal from "@/features/user/components/UserModal.vue";

const newBreadCrumbItems = ref(['마이페이지','마이페이지','채팅 차단 목록 조회'])
const emit = defineEmits(['updateBreadCrumb'])
const userBlockList = ref([]);
const showModal = ref(false)
const modalTitle = ref('차단 해제 완료')
const modalSubtitle = ref('차단 해제를 완료했습니다.')
const componentKey = ref(0);

const refreshComponent =() => {
  componentKey.value += 1
}

const fetchUserBlockList = async () => {
  try{
    const { data : wrapper } = await getUserBlocked();
    const respData = wrapper.data;
    userBlockList.value = respData.userBlockDTOList;
  }catch(e){
    console.log('차단 목록 조회 실패 ',e);
  }
}

const handleModalOpen = async (userId) => {
  try{
    await deleteBlockUser(userId);
  }catch(e){

  }
  showModal.value = true;

}

const handleModalClose = async () => {
  showModal.value = false;
  await fetchUserBlockList();
}


onMounted(async () => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
  try{
    await fetchUserBlockList();
  }catch(e){

  }

});

</script>

<template>
  <div class = "content-frame">
    <div class = "userBlockList" :key="componentKey">
      <UserBlockCard v-for = "userBlock in userBlockList" :userBlock = "userBlock"
                     @handleModalOpen="handleModalOpen" />
    </div>
  </div>
  <UserModal
      v-if="showModal"
      :title="modalTitle"
      :subtitle="modalSubtitle"
      @close="handleModalClose"
  />
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