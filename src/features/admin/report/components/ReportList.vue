<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
// PagingBar 컴포넌트가 필요하다면 import 해주세요.
import PagingBar from '@/components/common/PagingBar.vue'

// TODO: 실제 API 호출 함수로 교체해야 합니다. 예시 함수명 사용
// import { getReportList } from '@/features/admin/report/api.js';

const router = useRouter();
const route = useRoute();

const reports = ref([]); // 신고 목록 데이터를 저장할 변수
const isLoading = ref(true); // 데이터 로딩 상태

// NewsList를 참고하여 페이지네이션 변수 구조를 맞춥니다.
// 제공된 백엔드 API 응답에는 페이지네이션 정보가 없습니다.
// 페이지네이션을 사용하려면 백엔드 API 수정이 필요하며,
// 아래 변수들은 백엔드 지원 후에 활용 가능합니다.
const pagination = reactive({
  currentPage: 1,
  totalPages: 1, // 예시 응답 기반 (1 페이지)
  totalItems: 0 // 예시 응답 기반
});


// 날짜와 시간을 보기 좋게 포맷팅하는 함수 (NewsList의 formatDate 함수를 참고)
const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0을 채워서 두 자리로 만듦
  const day = String(date.getDate()).padStart(2, '0'); // 0을 채워서 두 자리로 만듦
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  // 초 정보는 API 응답에 T12:14: 까지 오므로 분까지만 표시
  return `${year}년${month}월${day}일 ${hours}:${minutes}`;
};


// 신고 목록 데이터를 불러오는 비동기 함수
const fetchReports = async (page = 1) => {
  isLoading.value = true;
  try {
    // TODO: 실제 백엔드 API 호출 함수로 교체
    // 예시: const response = await getReportList({ page: page });
    // 현재는 제공된 예시 응답 데이터를 사용합니다.
    const exampleApiResponse = {
      "success": true,
      "data": {
        "reportCheckList": [
          {
            "reportCheckDto" : {
              "reportcheckId" : 4,
              "reportId" : 13,
              "adminId":null,
              "checkedAt":null,
              "checkResult":null,
              "checkReason":null,
              "postId":null, // 댓글 신고 예시
              "commentId":1
            },
            "postDetailDto":null,
            "commentDetailDto":{
              "nickname":"자고싶엉",
              "commentCotents":"신고된 댓글 내용입니다. 000 욕설 포함", // 예시 내용 추가
              "commentCreatedAt" : "2025-04-12T12:14:30", // 예시를 위해 초 정보도 포함
              "commentModifiedAt":null,
              "isCommentDeleted":"R"
            }
          },
          { // 게시글 신고 예시 데이터 추가
            "reportCheckDto" : {
              "reportcheckId" : 5,
              "reportId" : 14,
              "adminId":null,
              "checkedAt":null,
              "checkResult":null,
              "checkReason":null,
              "postId":10, // 게시글 신고 예시
              "commentId":null
            },
            "postDetailDto": {
              "postTitle": "신고된 게시글 제목입니다.",
              "postContent": "신고된 게시글 내용의 일부입니다. 부적절한 내용이 포함되어 있어요...",
              "postCreatedAt" : "2025-05-01T10:00:00"
            },
            "commentDetailDto": null
          },
          { // 또 다른 댓글 신고 예시
            "reportCheckDto" : {
              "reportcheckId" : 6,
              "reportId" : 15,
              "adminId":null,
              "checkedAt":null,
              "checkResult":null,
              "checkReason":null,
              "postId":null,
              "commentId":2
            },
            "postDetailDto":null,
            "commentDetailDto":{
              "nickname":"테스터",
              "commentCotents":"스팸성 댓글입니다.",
              "commentCreatedAt" : "2025-05-02T09:30:00",
              "commentModifiedAt":null,
              "isCommentDeleted":"N"
            }
          }
        ]
      },
      "errorCode": null,
      "message": null,
      "timestamp": "2025-05-02T16:44:21.99054"
    };

    // API 응답에서 reportCheckList 배열을 reports 변수에 저장
    // 예시 데이터에서는 정렬이 필요 없어 보이지만, 필요하다면 NewsList처럼 sort 적용
    reports.value = exampleApiResponse.data.reportCheckList;

    // TODO: 페이지네이션 정보가 API 응답에 있다면 이곳에서 pagination 객체 업데이트
    // 예: pagination.currentPage = response.data.data.pagination.currentPage;
    // 예: pagination.totalPages = response.data.data.pagination.totalPages;
    // 예: pagination.totalItems = response.data.data.pagination.totalItems;
    // 현재는 예시 데이터 기반으로 pagination 정보 임의 설정 (1페이지에 전체 아이템 수)
    pagination.totalItems = reports.value.length; // 예시 데이터의 항목 수로 설정

  } catch (error) {
    console.error("신고 목록 불러오기 실패:", error);
    // 에러 처리 로직 추가 (예: 사용자에게 메시지 표시)
  } finally {
    isLoading.value = false;
  }
};

// PagingBar에서 페이지 변경 이벤트 발생 시 호출될 함수 (NewsList 참고)
// TODO: 백엔드 페이지네이션 지원 시 fetchReports 호출 로직 구현
function handlePageChange(page) {
  console.log("페이지 변경 요청됨:", page);
  // 현재 예시에서는 페이지네이션 API 호출을 구현하지 않음
  // fetchReports(page); // 실제 API 호출 시 이 주석을 해제하세요.
  // 예시 데이터는 페이지가 하나이므로 이 함수는 현재 기능하지 않습니다.
}


// 컴포넌트가 마운트되면 데이터 로딩 시작
onMounted(() => {
  fetchReports();
});

// AdminMainView에서 watch를 사용한 부분이 있지만, ReportList 자체는
// 직접 라우트 쿼리를 watch할 필요는 없을 것 같아 추가하지 않았어.
// 만약 ReportList 자체에서 라우트 쿼리 변경에 따라 데이터 로드가 필요하면 추가하면 돼.

// 신고 상세 페이지 등으로 이동하는 함수 (필요하다면 추가)
const goToReportDetail = (id) => {
  console.log("신고 상세 보기 이동 (ID:", id, ")");
  // TODO: 실제 상세 페이지 라우트로 변경
  // router.push(`/admin/reports/${id}`);
}

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
          <!-- TODO: 필요에 따라 신고 내용, 처리 상태, 처리 버튼 등을 추가 -->
        </tr>
        </thead>
        <tbody>
        <!-- NewsList처럼 클릭 가능한 행으로 만들고 싶다면 @click 이벤트 추가 -->
        <tr v-for="report in reports" :key="report.reportCheckDto.reportcheckId"
            @click="goToReportDetail(report.reportCheckDto.reportcheckId)"
            class="clickable-row">
          <td>{{ report.reportCheckDto.reportcheckId }}</td>
          <td>
            <!-- 댓글 내용 또는 게시글 제목 표시 -->
            <span v-if="report.commentDetailDto">
                {{ report.commentDetailDto.commentCotents }}
              </span>
            <span v-else-if="report.postDetailDto">
                 {{ report.postDetailDto.postTitle }}
              <!-- 필요하다면 게시글 내용 일부 표시 -->
              <!-- {{ report.postDetailDto.postContent ? report.postDetailDto.postContent.substring(0, 50) + '...' : '' }} -->
              </span>
            <span v-else>
                내용 없음
              </span>
          </td>
          <td>
            <!-- commentId가 있으면 댓글, postId가 있으면 게시글로 구분 -->
            <span v-if="report.reportCheckDto.commentId">댓글</span>
            <span v-else-if="report.reportCheckDto.postId">게시글</span>
            <span v-else>알 수 없음</span>
          </td>
          <td>
            <!-- 댓글 또는 게시글 생성 시간 표시 -->
            <span v-if="report.commentDetailDto">
                {{ formatDateTime(report.commentDetailDto.commentCreatedAt) }}
              </span>
            <span v-else-if="report.postDetailDto">
                 {{ formatDateTime(report.postDetailDto.postCreatedAt) }}
              </span>
            <span v-else>
                시간 정보 없음
               </span>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- PagingBar 컴포넌트 (백엔드 페이지네이션 지원 시 활용) -->
      <!-- NewsList처럼 PagingBar를 하단에 추가 -->
      <PagingBar
          :currentPage="pagination.currentPage"
          :totalPages="pagination.totalPages"
          :totalItems="pagination.totalItems"
          @page-changed="handlePageChange"
      />
      <!-- 백엔드 API가 페이지네이션을 지원하지 않으면 PagingBar는 1/1 페이지로 표시됩니다. -->
    </div>
  </div>
</template>

<style scoped>
.report-list-wrapper {
  width: 100%;
  /* AdminMainView의 content-area에 맞춰 너비 조정 */
  /* max-width: 1200px; */
  margin-top: 20px; /* 상단 여백 추가 */
  padding: 0 20px; /* 좌우 패딩 추가 */
  box-sizing: border-box; /* 패딩 포함 너비 계산 */
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'Pretendard', sans-serif;
  margin-top: 20px; /* 테이블 위 여백 */
}

.report-table th,
.report-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee; /* 더 연한 구분선 */
  vertical-align: top; /* 내용이 길어도 상단 정렬 */
}

.report-table thead th {
  font-weight: 600;
  color: #aaaaaa; /* NewsList th 색상 참고 */
}

.clickable-row {
  cursor: pointer; /* 클릭 가능한 행임을 표시 */
}

.clickable-row:hover {
  background-color: #f9f9f9; /* 호버 시 배경색 변경 */
}

/* 내용 td에 overflow 숨김 및 텍스트 줄 바꿈 방지 (필요시) */
.report-table td:nth-child(3) {
  max-width: 400px; /* 내용 컬럼 최대 너비 지정 */
  white-space: nowrap; /* 줄 바꿈 방지 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 넘치는 내용 ...으로 표시 */
}

/* PagingBar 컨테이너 스타일 (NewsList 참고) */
.report-list-wrapper > .paging-bar {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
}

</style>
