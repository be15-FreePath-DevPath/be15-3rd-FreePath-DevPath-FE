<script setup>
import { useRouter } from "vue-router";
import { useReportStore } from "@/features/admin/report/reportStore.js";
import { ref } from "vue";
import { processReportCheck } from "@/features/admin/report/api.js";

const router = useRouter();
const store = useReportStore();
const report = store.currentReport; // 스토어에서 현재 신고 상세 정보 가져오기

const checkReason = ref(''); // 처리 사유 입력 값
const processing = ref(false); // 처리 중 상태 (버튼 비활성화를 위해 사용)

const handleReportAction = async (result) => {
  // 처리 사유가 비어있는지 검증
  if (!checkReason.value.trim()) {
    alert("처리 사유를 입력해주세요.");
    return;
  }

  // report 객체와 reportCheckId가 유효한지 확인
  if (!report?.reportCheckDto?.reportCheckId) {
    alert("잘못된 신고 정보입니다. reportCheckId가 존재하지 않습니다.");
    console.error("신고 정보 객체 오류:", report);
    return;
  }

  try {
    processing.value = true; // 처리 시작, 버튼 비활성화

    const reportCheckId = report.reportCheckDto.reportCheckId;
    const rawPostId = report.reportCheckDto.postId; // 스토어에서 가져온 원본 postId
    const rawCommentId = report.reportCheckDto.commentId; // 스토어에서 가져온 원본 commentId

    // FormData 객체 생성
    const formData = new FormData();

    // checkReason과 checkResult는 항상 필요하므로 추가
    formData.append('checkReason', checkReason.value);
    formData.append('checkResult', result === 'DELETE' ? 'Y' : 'N'); // 백엔드 DTO가 Character 타입이므로 'Y' 또는 'N' 문자열로 보냄

    // postId와 commentId는 둘 중 하나만 보내거나, 유효한 값만 보내야 함
    // DTO의 Integer 필드에 대해 null 값을 보내려면, FormData에 해당 필드를 아예 append하지 않아야 함
    // 스토어에서 가져온 값이 문자열 "null"일 경우 실제 null로 처리하여 FormData에 추가하지 않도록 변환 로직 유지

    let postIdToSend = null;
    if (rawPostId !== null && rawPostId !== undefined) {
      if (typeof rawPostId === 'string' && rawPostId.toLowerCase() === 'null') {
        postIdToSend = null; // 문자열 "null" -> 실제 null
      } else {
        const parsedPostId = parseInt(rawPostId, 10);
        if (!isNaN(parsedPostId)) {
          postIdToSend = parsedPostId; // 유효한 숫자이면 사용
        } else {
          console.warn("postId 값이 숫자로 파싱되지 않아 무시됩니다:", rawPostId);
          postIdToSend = null; // 숫자가 아니면 null로 처리
        }
      }
    }
    // else { rawPostId가 null 또는 undefined이면 postIdToSend는 초기값인 null 유지 -> OK }


    let commentIdToSend = null;
    if (rawCommentId !== null && rawCommentId !== undefined) {
      if (typeof rawCommentId === 'string' && rawCommentId.toLowerCase() === 'null') {
        commentIdToSend = null; // 문자열 "null" -> 실제 null
      } else {
        const parsedCommentId = parseInt(rawCommentId, 10);
        if (!isNaN(parsedCommentId)) {
          commentIdToSend = parsedCommentId; // 유효한 숫자이면 사용
        } else {
          console.warn("commentId 값이 숫자로 파싱되지 않아 무시됩니다:", rawCommentId);
          commentIdToSend = null; // 숫자가 아니면 null로 처리
        }
      }
    }
    // else { rawCommentId가 null 또는 undefined이면 commentIdToSend는 초기값인 null 유지 -> OK }


    // DTO의 isValidTarget() 규칙: 둘 다 null이면 안됨. 프론트에서 미리 검증.
    if (postIdToSend === null && commentIdToSend === null) {
      alert("게시글 또는 댓글 ID 정보가 유효하지 않습니다. 둘 다 비어있을 수 없습니다.");
      console.error("postIdToSend 및 commentIdToSend가 모두 null입니다.");
      processing.value = false;
      return; // 처리 중단
    }

    // 유효한 값이 있는 경우에만 FormData에 추가
    if (postIdToSend !== null) {
      formData.append('postId', postIdToSend); // 숫자를 append하면 문자열로 변환되어 넘어감. 백엔드 Integer 필드는 문자열 숫자도 파싱 가능
    }
    if (commentIdToSend !== null) {
      formData.append('commentId', commentIdToSend); // 숫자를 append하면 문자열로 변환되어 넘어감. 백엔드 Integer 필드는 문자열 숫자도 파싱 가능
    }


    console.log("신고 처리 요청 URL:", `/report/check/${reportCheckId}`); // 요청 URL 확인
    // --- ▼▼▼ 여기서 formData 내용 확인 콘솔 추가 ▼▼▼ ---
    console.log("ReportDetailView - Before calling processReportCheck: formData contents:");
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]);
    }
    console.log("ReportDetailView - Before calling processReportCheck: formData object:", formData);
    // --- ▲▲▲ 콘솔 추가 끝 ▲▲▲ ---


    // API 호출 - formData 객체를 data로 전달
    const response = await processReportCheck(reportCheckId, formData); // api.js 함수가 FormData를 받도록 수정됨

    console.log("신고 처리 API 응답:", response); // 응답 확인

    alert("신고 처리가 완료되었습니다.");
    router.push("/admin?tab=report");

  } catch (error) {
    console.error("신고 처리 실패:", error);
    const errorMessage = error.response?.data?.message || error.message || "알 수 없는 오류";
    alert(`신고 처리 중 오류가 발생했습니다. 오류 메시지: ${errorMessage}`);
  } finally {
    processing.value = false;
  }
};

// TODO: 스토어(store.currentReport)에 report 상세 정보가 어떻게 로드되는지에 따라 이 컴포넌트의 로딩 로직이 필요할 수 있습니다.
// 현재는 스토어에 이미 currentReport가 있다고 가정하고 있습니다.
// ... onMounted 등 필요 시 추가 ...

// TODO: 내용 표시 부분의 commentContents 필드명 다시 확인 (이전 응답에선 commentCotents였음)
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
