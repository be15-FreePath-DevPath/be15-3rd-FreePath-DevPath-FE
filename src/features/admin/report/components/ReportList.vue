<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import PagingBar from "@/components/common/PagingBar.vue";
import { getReportList } from "@/features/admin/report/api.js";

const router = useRouter();

const reports = ref([]);
const isLoading = ref(true);

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
});

// 날짜 포맷 함수
const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}년${month}월${day}일 ${hours}:${minutes}`;
};

// 신고 목록 불러오기
const fetchReports = async (page = 1) => {
  isLoading.value = true;
  try {
    const response = await getReportList();
    reports.value = response.data.reportCheckList || [];
    pagination.totalItems = reports.value.length;
  } catch (error) {
    console.error("신고 목록 불러오기 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

// 페이지 변경 처리 (페이지네이션이 실제 구현되면 사용)
const handlePageChange = (page) => {
  console.log("페이지 변경 요청됨:", page);
  fetchReports(page);
};

// 신고 상세 페이지로 이동
const goToReportDetail = (id) => {
  router.push(`/report/check/${id}`);
};

onMounted(() => {
  fetchReports();
});
</script>

<template>
  <div class="report-list-wrapper">
    <div v-if="isLoading">로딩 중입니다...</div>
    <div v-else-if="reports.length === 0">신고 목록이 없습니다.</div>
    <div v-else>
      <table class="report-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>내용</th>
          <th>구분</th>
          <th>날짜</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="report in reports"
            :key="report.reportCheckDto.reportcheckId"
            @click="goToReportDetail(report.reportCheckDto.reportcheckId)"
            class="clickable-row"
        >
          <td>{{ report.reportCheckDto.reportcheckId }}</td>
          <td>
              <span v-if="report.commentDetailDto">
                {{ report.commentDetailDto.commentCotents }}
              </span>
            <span v-else-if="report.postDetailDto">
                {{ report.postDetailDto.postTitle }}
              </span>
            <span v-else>내용 없음</span>
          </td>
          <td>
            <span v-if="report.reportCheckDto.commentId">댓글</span>
            <span v-else-if="report.reportCheckDto.postId">게시글</span>
            <span v-else>알 수 없음</span>
          </td>
          <td>
              <span v-if="report.commentDetailDto">
                {{ formatDateTime(report.commentDetailDto.commentCreatedAt) }}
              </span>
            <span v-else-if="report.postDetailDto">
                {{ formatDateTime(report.postDetailDto.postCreatedAt) }}
              </span>
            <span v-else>시간 정보 없음</span>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 바 -->
      <div class="paging-bar">
        <PagingBar
            :currentPage="pagination.currentPage"
            :totalPages="pagination.totalPages"
            :totalItems="pagination.totalItems"
            @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-list-wrapper {
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'Pretendard', sans-serif;
  margin-top: 20px;
}

.report-table th,
.report-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}

.report-table thead th {
  font-weight: 600;
  color: #aaaaaa;
}

.clickable-row {
  cursor: pointer;
}

.clickable-row:hover {
  background-color: #f9f9f9;
}

.report-table td:nth-child(2) {
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.paging-bar {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
