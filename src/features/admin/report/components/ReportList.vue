<script setup>
import { onMounted, ref, reactive, nextTick } from "vue";
import { useRouter } from "vue-router";
import PagingBar from "@/components/common/PagingBar.vue";
import { getReportList } from "@/features/admin/report/api.js";
import { useReportStore } from "@/features/admin/report/reportStore.js";

const store = useReportStore();
const router = useRouter();
const allReports = ref([]);     // 전체 리스트 저장
const reports = ref([]);        // 현재 페이지에 보여줄 리스트
const isLoading = ref(true);

const pageSize = 10; // 한 페이지당 10개
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
});

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}년
  ${String(date.getMonth() + 1).padStart(2, '0')}월${String(date.getDate()).padStart(2, '0')}일
  ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const fetchReports = async () => {
  isLoading.value = true;
  try {
    const response = await getReportList();
    allReports.value = (response.data.reportCheckList || []).sort((a, b) => {
      const idA = a?.reportCheckDto?.reportCheckId || 0;
      const idB = b?.reportCheckDto?.reportCheckId || 0;
      return idA - idB;
    });
    pagination.totalItems = allReports.value.length;
    pagination.totalPages = Math.ceil(pagination.totalItems / pageSize);

    setPage(1); // 첫 페이지 로드
  } catch (error) {
    console.error("신고 목록 불러오기 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

const setPage = (page) => {
  pagination.currentPage = page;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  reports.value = allReports.value.slice(start, end);
};

const handlePageChange = (page) => {
  setPage(page);
};

const goToReportDetail = (report) => {
  store.setReport(report);
  nextTick(() => {
    const currentReport = store.currentReport;
    const reportCheckId = currentReport?.reportCheckDto?.reportCheckId;
    if (reportCheckId) {
      router.push(`/report/check/${reportCheckId}`);
    } else {
      console.error("신고 데이터가 없습니다.");
      router.push("/admin?tab=report");
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
          <td class="text-align">{{ report.reportCheckDto.reportCheckId }}</td>
          <td>
            <span v-if="report.commentDetailDto?.commentContents">
              {{ report.commentDetailDto.commentContents }}
            </span>
            <span v-else-if="report.postDetailDto?.boardContents" v-html="report.postDetailDto.boardContents" />
            <span v-else>내용 없음</span>
          </td>
          <td class="text-align">
            <span v-if="report.reportCheckDto.commentId">댓글</span>
            <span v-else-if="report.reportCheckDto.postId">게시글</span>
            <span v-else>알 수 없음</span>
          </td>
          <td class="text-align">
            <span v-if="report.commentDetailDto?.commentCreatedAt">
              {{ formatDateTime(report.commentDetailDto.commentCreatedAt) }}
            </span>
            <span v-else-if="report.postDetailDto?.boardCreatedAt">
              {{ formatDateTime(report.postDetailDto.boardCreatedAt) }}
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

.report-table th {
  text-align: center;
}

.text-align {
  text-align: center;
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
