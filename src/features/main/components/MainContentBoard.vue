<script setup>
defineProps({
  title: String,
  boardItems: Array
})
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
      <div
          v-for="(item, index) in boardItems"
          :key="index"
          class="board-row"
      >
        <div class="board-col date">
          <img src="@/assets/images/board/CalendarIcon.png" alt="calendar" class="calendar-icon" />
          {{ item.date }}
        </div>
        <div class="board-col user">
          <img :src="item.userImage" alt="user" class="user-img" />
          {{ item.user }}
        </div>
        <div class="board-col title">
          <span class="title-text">{{ item.title }}</span>
        </div>
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
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px;
  width: 450px;
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
  width: 150px;
  flex: 0 0 150px;
}

.board-col.title {
  width: 160px;
  flex: 0 0 160px;
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
</style>
