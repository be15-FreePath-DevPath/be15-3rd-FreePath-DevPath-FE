<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getReportDetail, processReportCheck } from '@/api/report'; // <-- 변경된 부분

const route = useRoute();
const router = useRouter();
const reportId = route.params.id;

const report = ref(null);
const reason = ref('');
const isLoading = ref(true);

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const fetchReportDetail = async () => {
  try {
    const res = await getReportDetail(reportId); // <-- 변경된 부분
    report.value = res.data;
  } catch (e) {
    console.error('신고 상세 조회 실패:', e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchReportDetail();
});

const handleProcess = async (approval) => {
  try {
    const formData = new FormData();
    formData.append('isApproved', approval);
    formData.append('reason', reason.value);
    formData.append('reviewedAt', new Date().toISOString());

    await processReportCheck(reportId, formData); // <-- 변경된 부분

    alert('처리 완료되었습니다.');
    router.push('/admin/report');
  } catch (e) {
    console.error('처리 실패:', e);
    alert('처리에 실패했습니다.');
  }
};
</script>

<template>
  <div class="detail-wrapper">
    <div v-if="isLoading">로딩 중...</div>
    <div v-else-if="!report">데이터 없음</div>
    <div v-else>
      <div class="field">
        <label>구분</label>
        <div class="readonly">{{ report.commentId ? '댓글' : '게시글' }}</div>
      </div>

      <div class="field">
        <label>내용</label>
        <div class="readonly">{{ report.content }}</div>
      </div>

      <div class="field">
        <label>처리 이유</label>
        <textarea v-model="reason" placeholder="처리 사유를 입력하세요"></textarea>
      </div>

      <div class="field">
        <label>날짜</label>
        <div class="readonly">{{ formatDate(report.createdAt) }}</div>
      </div>

      <div class="button-area">
        <button @click="router.push('/admin/report')">신고 목록</button>
        <button @click="handleProcess('Y')">삭제 처리</button>
        <button @click="handleProcess('N')">반려 처리</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-wrapper {
  width: 1116px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.field .readonly {
  background-color: #f4f4f4;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  color: #444;
}

.field textarea {
  width: 100%;
  height: 140px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  resize: none;
}

.button-area {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.button-area button {
  width: 130px;
  height: 56px;
  background-color: #e9e9e9;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button-area button:disabled {
  background-color: #cccccc;
  color: #666;
  cursor: not-allowed;
}

.button-area button:hover:enabled {
  background-color: #1c1c1c;
  color: white;
}
</style>
