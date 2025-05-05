<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PagingBar from '@/components/common/PagingBar.vue'
import { getBookmarkList } from '@/features/mypage/bookmark/api.js'

const router = useRouter()
const posts = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const pageSize = 10

const fetchBookmarkList = async (page = 1) => {
  const params = { page, size: pageSize }
  const response = await getBookmarkList(params)
  const data = response.data.data

  posts.value = data.posts
  totalItems.value = data.pagination.totalItems
  totalPages.value = data.pagination.totalPage
  currentPage.value = data.pagination.currentPage
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchBookmarkList(page)
}

const formatDate = (date) => date?.slice(0, 10)

const goToPost = (id) => {
  router.push(`/board/${id}`)
}

onMounted(() => {
  fetchBookmarkList(1)
})
</script>

<template>
  <div class="list-wrapper">
    <!-- 게시글 없을 때 안내 -->
    <div v-if="posts.length === 0" class="empty-wrapper">
      <div class="empty-icon">📌</div>
      <div class="empty-text">북마크한 게시글이 없습니다.</div>
    </div>

    <!-- 게시글 리스트 -->
    <table class="list-table" v-else>
      <thead>
      <tr>
        <th>게시글 제목</th>
        <th>작성일자</th>
        <th>작성자</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="post in posts"
          :key="post.boardId"
          class="clickable-row"
          @click="goToPost(post.boardId)"
      >
        <td>{{ post.boardTitle }}</td>
        <td>{{ formatDate(post.boardCreatedAt) }}</td>
        <td>{{ post.nickname }}</td>
      </tr>
      </tbody>
    </table>

    <PagingBar
        :key="currentPage"
        v-if="posts.length > 0"
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

/* 리스트 테이블 */
.list-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'Pretendard', sans-serif;
  margin-bottom: 40px;
}

.list-table th,
.list-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ccc;
}

.list-table thead th {
  background-color: #f1f1f1;
  font-weight: 600;
}

.clickable-row {
  cursor: pointer;
}

.clickable-row:hover {
  background-color: #f9f9f9;
}

/* 게시글 없음 안내 */
.empty-wrapper {
  text-align: center;
  padding: 80px 0;
  color: #777;
  font-family: 'Pretendard', sans-serif;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.empty-text {
  font-size: 1.2rem;
}
</style>
