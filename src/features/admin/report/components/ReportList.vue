<script setup>
import {onMounted, ref, reactive, nextTick} from "vue";
import { useRouter } from "vue-router";
import PagingBar from "@/components/common/PagingBar.vue";
import { getReportList } from "@/features/admin/report/api.js";
import { useReportStore } from "@/features/admin/report/reportStore.js";

const store = useReportStore();
const router = useRouter();
const reports = ref([]);
const isLoading = ref(true);

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
});

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}년${String(date.getMonth() + 1).padStart(2, '0')}월${String(date.getDate()).padStart(2, '0')}일 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const fetchReports = async (page = 1) => {
  isLoading.value = true;
  try {
    const response = await getReportList();
    reports.value = response.data.reportCheckList || [];
    pagination.totalItems = reports.value.length;
    console.log(response.data);
  } catch (error) {
    console.error("신고 목록 불러오기 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = (page) => {
  fetchReports(page);
};

const goToReportDetail = (report) => {
  console.log("선택된 보고서:", report);  // 실제 데이터 확인

  store.setReport(report);  // Pinia store에 데이터 저장 후
  nextTick(() => {
    const currentReport = store.currentReport;

    // reportCheckDto와 reportCheckId가 존재하는지 확인
    const reportCheckId = currentReport?.reportCheckDto?.reportCheckId;
    if (reportCheckId) {
      router.push(`/report/check/${reportCheckId}`);  // reportCheckId로 라우팅
    } else {
      console.error("신고 데이터가 없습니다. (reportCheckDto 또는 reportCheckId가 없음)");
      router.push("/admin?tab=report");  // 신고 데이터가 없으면 리디렉션
    }
  });
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
            :key="report.reportCheckDto.reportCheckId"
            @click="goToReportDetail(report)"
            class="clickable-row"
        >
          <td>{{ report.reportCheckDto.reportCheckId }}</td>
          <td>
            <span v-if="report.commentDetailDto?.commentContents">
              {{ report.commentDetailDto.commentContents }}
            </span>
            <span v-else-if="report.postDetailDto?.postTitle">
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
            <span v-if="report.commentDetailDto?.commentCreatedAt">
              {{ formatDateTime(report.commentDetailDto.commentCreatedAt) }}
            </span>
            <span v-else-if="report.postDetailDto?.postCreatedAt">
              {{ formatDateTime(report.postDetailDto.postCreatedAt) }}
            </span>
            <span v-else>시간 정보 없음</span>
          </td>
        </tr>
        </tbody>
      </table>

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
