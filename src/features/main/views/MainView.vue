<script setup>
import { onMounted, ref } from 'vue';
import MainInfoPaging from "@/features/main/components/MainInfoPaging.vue";
import MainContentBoard from "@/features/main/components/MainContentBoard.vue";

const newBreadCrumbItems = ref(['메인페이지']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
});
</script>

<template>
  <div class="content-frame">
    <div class="content">
      <div class="main-info">
        <div class="main-info-board">
          <MainInfoPaging />
        </div>
      </div>

      <!-- 자유게시판 (카테고리 ID: 1) -->
      <MainContentBoard title="자유게시판" :categoryId="1" />

      <!-- 직무게시판 (카테고리 ID: 2) -->
      <MainContentBoard title="직무게시판" :categoryId="2" />
    </div>
  </div>
</template>

<style scoped>
.content-frame {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 27px 46px 0 27px;
  overflow: hidden;
}

.content {
  width: 1116px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 29px;
}

.main-info {
  width: 1110px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-info-board {
  width: 100%;
  height: 384px;
  border-radius: 16.5px;
  background-color: #F7F9FB;
}
</style>
