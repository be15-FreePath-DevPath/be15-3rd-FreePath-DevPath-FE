<script setup>
import {ref, onMounted, defineProps} from 'vue';
import {fetchPostList} from '@/features/board/api.js';

const props = defineProps({
  title: String,
  categoryId: Number
});
const categoryMap = {
  1: '자유게시판',
  2: '직무 정보 게시판',
  3: '프로젝트 매칭 게시판'
};
console.log("categoryId:", props.categoryId);

const params = ref({
  page: 1,
  size: 10,
  categoryId: props.categoryId,
  keyWord: undefined,
  nickname: undefined,
  startDate: undefined,
  endDate: undefined,
});

const boardItems = ref([]);

// 게시글 목록 조회
const loadPostList = async () => {
  try {
    const response = await fetchPostList(params.value);
    console.log('게시글 목록:', response.data);
    boardItems.value = response.data.data.posts; // posts 배열만 추출
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    boardItems.value = [];
  }
};

// 날짜 포맷 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

onMounted(() => {
  loadPostList();
});

// template에서 formatDate를 사용하려면 expose 필요
defineExpose({
  formatDate
});
</script>

<template>
  <div class="main-general-board">
    <div class="board-header">
      <span class="text16">
        <strong>{{ title }}</strong>
      </span>
      <span class="new">new</span>
    </div>

    <!-- 게시판 테이블 -->
    <div class="board-table">
      <!-- 헤더 -->
      <div class="board-row board-header-row">
        <div class="board-col date">Date</div>
        <div class="board-col user">User</div>
        <div class="board-col title">Title</div>
      </div>

      <!-- 게시글 목록 -->
      <div v-if="boardItems.length > 0">
        <router-link
            v-for="(item, index) in boardItems"
            :key="index"
            class="board-row"
            :to="{
              path: `/board/${item.boardId}`,
              query: { category: categoryMap[props.categoryId] || '알 수 없음' }
            }"
        >
          <div class="board-col date">
            <img src="@/assets/images/board/CalendarIcon.png" alt="calendar" class="calendar-icon"/>
            {{ formatDate(item.boardCreatedAt) }}
          </div>
          <div class="board-col user">
            <img src="@/assets/images/main/user.png" alt="user" class="user-img"/>
            <span class="user-text">{{ item.nickname }}</span>
          </div>
          <div class="board-col title">
            <span class="title-text">{{ item.boardTitle }}</span>
          </div>
        </router-link>
      </div>

      <!-- 게시물이 없을 때 -->
      <div v-else class="board-row no-posts">
        작성된 게시물이 없습니다
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-general-board {
  background: #F7F9FB;
  padding: 20px;
  border-radius: 16px;
  width: 494px;
  height: 500px;
}

.board-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.text16 strong {
  font-size: 18px;
}

.new {
  background: #c5b3f9;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  margin-left: 8px;
  font-size: 12px;
}

.board-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board-row {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px;
  width: 450px;
  gap: 10px;
}

.board-header-row {
  font-weight: bold;
  color: #9FA0A2;
  border-bottom: 2px solid #ddd;
}

.board-col {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.board-col.date {
  width: 130px;
  flex: 0 0 130px;
}

.board-col.user {
  width: 110px;
  flex: 0 0 100px;
}

.board-col.title {
  flex: 1;
  min-width: 180px;
}

.user-img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
}

.calendar-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  object-fit: cover;
}

.title-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}

.user-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}
</style>
