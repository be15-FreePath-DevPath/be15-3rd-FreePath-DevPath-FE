<script setup>
import { useRoute, useRouter } from "vue-router";
import { useReportStore } from "@/features/admin/report/reportStore.js";
import { ref } from "vue";
import { processReportCheck } from "@/features/admin/report/api.js";

const router = useRouter();
const store = useReportStore();
const report = store.currentReport;

const checkReason = ref('');
const processing = ref(false);

const handleReportAction = async (result) => {
  if (!checkReason.value) {
    alert("처리 사유를 입력해주세요.");
    return;
  }

  if (!report?.reportCheckDto?.reportCheckId) {
    alert("잘못된 신고 정보입니다. reportCheckId가 존재하지 않습니다.");
    return;
  }

  try {
    processing.value = true;

    const formData = new FormData();
    formData.append("checkReason", checkReason.value);
    formData.append("checkResult", result === 'DELETE' ? 'Y' : 'N');

    const reportCheckId = report.reportCheckDto.reportCheckId;
    const postId = report.reportCheckDto.postId;
    const commentId = report.reportCheckDto.commentId;

    formData.append("postId", postId ?? '');
    formData.append("commentId", commentId ?? '');

    await processReportCheck(reportCheckId, formData);

    alert("신고 처리가 완료되었습니다.");
    router.push("/admin?tab=report");
  } catch (error) {
    console.error("신고 처리 실패:", error);
    alert("신고 처리 중 오류가 발생했습니다. 오류 메시지: " + error.message);
  } finally {
    processing.value = false;
  }
};
</script>

<template>
  <div v-if="report" class="form">
    <h2>신고 처리</h2>

    <label>
      구분
      <div class="readonly-field">
        {{ report?.reportCheckDto?.commentId ? '댓글' : '게시글' }}
      </div>
    </label>

    <label>
      내용
      <div class="readonly-field">
        {{ report?.commentDetailDto?.commentContents || report?.postDetailDto?.postTitle || '내용 없음' }}
      </div>
    </label>

    <label>
      처리 사유
      <textarea v-model="checkReason" placeholder="처리 사유를 입력하세요" />
    </label>

    <label>
      날짜
      <div class="readonly-field">
        {{
          report?.commentDetailDto?.commentCreatedAt
              ? new Date(report.commentDetailDto.commentCreatedAt).toLocaleDateString()
              : report?.postDetailDto?.postCreatedAt
                  ? new Date(report.postDetailDto.postCreatedAt).toLocaleDateString()
                  : '시간 정보 없음'
        }}
      </div>
    </label>

    <div class="button-group">
      <button @click="() => handleReportAction('REJECT')" :disabled="processing">반려 처리</button>
      <button @click="() => handleReportAction('DELETE')" :disabled="processing">삭제 처리</button>
      <button @click="() => router.push('/admin?tab=report')">신고 목록</button>
    </div>
  </div>
</template>

<style scoped>
.form {
  width: 1116px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

label {
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input,
textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

textarea {
  resize: vertical;
  min-height: 150px;
}

.readonly-field {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
}

.button-group button {
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

.button-group button:disabled {
  background-color: #cccccc;
  color: #666;
  cursor: not-allowed;
}

.button-group button:hover:enabled {
  background-color: #1c1c1c;
  color: white;
}
</style>
