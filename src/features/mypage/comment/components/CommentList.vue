<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PagingBar from '@/components/common/PagingBar.vue'
import { getMyCommentList } from '@/features/mypage/comment/api.js'
import calendarIcon from '@/assets/images/interview/calendar-blank.png'

const router = useRouter()
const comments = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const pageSize = 10

const fetchComments = async (page = 1) => {
  const params = { page, size: pageSize }
  const response = await getMyCommentList(params)
  const data = response.data.data

  comments.value = data.comments
  totalItems.value = data.pagination.totalItems
  totalPages.value = data.pagination.totalPage
  currentPage.value = data.pagination.currentPage
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchComments(page)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr.replace(' ', 'T'))
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const weekdayNames = ['일', '월', '화', '수', '목', '금', '토']
  const weekday = weekdayNames[date.getDay()]
  return `${month}.${day} ${weekday} ${hours}:${minutes}`
}

const goToPost = (boardId) => {
  router.push(`/board/${boardId}`)
}

onMounted(() => {
  fetchComments(1)
})
</script>

<template>
  <div class="list-wrapper">
    <div class="list-header" v-if="comments.length > 0">
      <div class="col-title">댓글 내용</div>
      <div class="col-date">작성일자</div>
      <div class="col-writer">작성자</div>
    </div>

    <div v-if="comments.length === 0" class="empty-wrapper">
      <div class="empty-icon">💬</div>
      <div class="empty-text">작성한 댓글이 없습니다.</div>
    </div>

    <div class="post-list">
      <div
          class="post-item"
          v-for="comment in comments"
          :key="comment.commentId"
          @click="goToPost(comment.boardId)"
      >
        <div class="col-title">
          {{ comment.isCommentDeleted === 'Y' ? '삭제된 댓글입니다.' : comment.contents }}
        </div>
        <div class="col-date">
          <img class="date-icon" :src="calendarIcon" alt="calendar" />
          {{ formatDate(comment.createdAt) }}
        </div>
        <div class="col-writer">{{ comment.nickName }}</div>
      </div>
    </div>

    <PagingBar
        :key="currentPage"
        v-if="comments.length > 0"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalItems="totalItems"
        @page-changed="handlePageChange"
    />
  </div>
</template>

<style scoped>
.list-wrapper {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.list-header {
  display: flex;
  align-items: center;
  height: 40px;
  color: #9FA0A2;
  font-size: 12px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 0 20px;
}
.list-header .col-title {
  text-align: center;
}

.post-item {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s;
}

.post-item:hover {
  background-color: #f9f9f9;
}

.col-title {
  width: 450px;
  padding-right: 20px;
  word-break: break-word;
  line-height: 1.5;
  font-size: 14px;
}

.col-date {
  width: 150px;
  text-align: center;
  white-space: nowrap;
  padding-right: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 4px;
}

.col-writer {
  width: 150px;
  text-align: center;
  white-space: nowrap;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-wrapper {
  text-align: center;
  color: #777;
  padding: 120px 0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.empty-text {
  font-size: 1.2rem;
}
</style>
