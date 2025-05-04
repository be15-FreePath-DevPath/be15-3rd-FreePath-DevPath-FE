<script setup>
import MainInfoPaging from "@/features/main/components/MainInfoPaging.vue";
import MainContentBoard from "@/features/main/components/MainContentBoard.vue";
import { onMounted, ref } from 'vue';

const newBreadCrumbItems = ref(['메인페이지']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
});

// 테스트 값
const boardItems = [
  {
    date: "2025.04.24 17:10",
    user: "Natali Craig",
    userImage: "src/assets/images/main/user.png",
    title: "제목 길이 생략 테스트 테스트 테스트"
  },
  {
    date: "2025.04.24 17:00",
    user: "Kate Morrison",
    userImage: "src/assets/images/main/user.png",
    title: "Title 2"
  },
  {
    date: "2025.04.24 16:50",
    user: "Drew Cano",
    userImage: "src/assets/images/main/user.png",
    title: "Title 3"
  },
  {
    date: "2025.04.24 16:40",
    user: "Orlando Diggs",
    userImage: "src/assets/images/main/user.png",
    title: "Title 4"
  },
  {
    date: "2025.04.24 16:30",
    user: "Natali Craig",
    userImage: "src/assets/images/main/user.png",
    title: "Title 5"
  },
  {
    date: "2025.04.24 16:20",
    user: "Kate Morrison",
    userImage: "src/assets/images/main/user.png",
    title: "Title 6"
  },
  {
    date: "2025.04.24 16:10",
    user: "Drew Cano",
    userImage: "src/assets/images/main/user.png",
    title: "Title 7"
  },
  {
    date: "2025.04.24 16:00",
    user: "Orlando Diggs",
    userImage: "src/assets/images/main/user.png",
    title: "Title 8"
  },
  {
    date: "2025.04.24 15:50",
    user: "Andi Lane",
    userImage: "src/assets/images/main/user.png",
    title: "Title 9"
  },
  {
    date: "2025.04.24 15:40",
    user: "Andi Lane",
    userImage: "src/assets/images/main/user.png",
    title: "Title 10"
  }
]
</script>

<template>
  <div class="content-frame">
    <div class="content">
      <div class="main-info">
        <div class="main-info-board">
          <MainInfoPaging />
        </div>
      </div>

      <!-- 자유게시판 -->
      <MainContentBoard title="자유게시판" :boardItems="boardItems" />

      <!-- 직무게시판 -->
      <MainContentBoard title="직무게시판" :boardItems="boardItems" />
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
