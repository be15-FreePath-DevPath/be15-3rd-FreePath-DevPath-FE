<script setup>
const props = defineProps(['selectedMain', 'selectedSub'])
</script>

<template>
  <div class="content-frame">
    <div class="title">
      <template v-if="selectedMain === '게시글'">
        <div class="text1">제목</div>
        <div class="text2">작성일자</div>
        <div class="text2">작성자</div>
      </template>
      <template v-else>
        <div class="text1">댓글 내용</div>
        <div class="text2">작성일자</div>
        <div class="text2">작성자</div>
      </template>
    </div>

    <div class="content">
      <!-- selectedSub 값에 따라 데이터 분기 렌더링 -->
      <div class="list-frame">
        <div class="list-title">
          <span class="list-title-text">
            제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트
          </span>
        </div>
        <div class="list-date">
          <img src="@/assets/images/board/CalendarIcon.png" alt="calendar" class="calendar-icon" />
          날짜 테스트
        </div>
        <div class="list-writer">
          작성자 테스트
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-frame {
  width: 836px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}

.title {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  gap: 20px;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text1, .text2 {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text1 {
  width: 528px;
}

.text2 {
  width: 158px;
}

.list-frame
{
  height:60px;
  width:794px;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items:center;
  gap:20px;
  position:relative;
  border-style:hidden;
  outline:none;
}

.list-title
{
  height:42px;
  width:460px;
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  position:relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-title-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
}

.list-date {
  height: 60px;
  width: 161px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.calendar-icon {
  width: 16px;
  height: 16px;
}

.list-writer{
  height:35px;
  width:118px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:10px;
  position:relative;
}

</style>