<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {deleteInterviewRoom, fetchInterviewDetail, updateInterviewMemo} from '@/features/interview/api.js'
import InterviewQuestionCard from '@/features/interview/components/InterviewQuestionCard.vue'
import InterviewReexecuteModal from '@/features/interview/components/InterviewReexecuteModal.vue'
import ReexecutedListModal from '@/features/interview/components/ReexecutedListModal.vue'

const route = useRoute()
const router = useRouter()

const interview = reactive({})
const questions = ref([])
const totalComment = ref('')
const reexecutedRooms = ref([])
const titleText = ref('')
const memoText = ref('');
const roomId = ref(route.params.interviewRoomId)

const showReexecuteModal = ref(false)
const showReexecutedListModal = ref(false)

const closeReexecuteModal = () => showReexecuteModal.value = false
const closeReexecutedListModal = () => showReexecutedListModal.value = false

const handleReexecute = ({ difficulty, strictness }) => {
  console.log('재실행 요청됨:', difficulty, strictness)
  showReexecuteModal.value = false
}

const goBack = () => {
  router.push('/interview/list')
}

const handleDelete = async () => {
  if (!confirm('정말 이 면접방을 삭제하시겠습니까?')) return;
  try {
    await deleteInterviewRoom(roomId.value)
    alert('면접방이 삭제되었습니다.')
    await router.push('/interview/list') // 목록 페이지로 이동
  } catch (err) {
    console.error('면접방 삭제 실패:', err)
    alert('삭제 중 문제가 발생했습니다.')
  }
}

// 초기 주입 (watch 말고 onMounted 이후 수동 할당으로 처리)
watch(interview, (newVal) => {
  memoText.value = newVal?.interviewRoomMemo || ''
  titleText.value = newVal?.interviewRoomTitle || ''
}, { immediate: true })

const handleSaveMemo = async () => {
  try {
    await updateInterviewMemo(interview.interviewRoomId, titleText.value, memoText.value)
    alert('메모가 저장되었습니다.')
  } catch (err) {
    console.error('메모 저장 실패:', err)
    alert('메모 저장에 실패했습니다.')
  }
}

const loadInterviewDetail = async (roomId) => {
  try {
    const response = await fetchInterviewDetail(roomId)
    const data = response.data.data
    console.log('받은 데이터:', data)

    Object.assign(interview, data)

    // 질문/답변/평가 파싱
    const tempQuestions = []
    let buffer = []

    if (data.interviewList) {
      data.interviewList.forEach((item) => {
        const message = item.interviewMessage
        if (message.startsWith('[총평]')) {
          totalComment.value = message.replace('[총평]', '').trim()
          return
        }

        if (message.startsWith('[면접 질문]')) {
          if (buffer.length) tempQuestions.push([...buffer])
          buffer = [message]
        } else {
          buffer.push(message)
        }
      })
      if (buffer.length) tempQuestions.push([...buffer])
    }

    questions.value = tempQuestions

    reexecutedRooms.value = data.reexecutedRooms?.map((room) => {
      const dateObj = new Date(room.interviewRoomCreatedAt)
      const formattedDate = dateObj.toLocaleDateString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'
      }).replace(/\. /g, '.').replace('.', '')

      return {
        id: room.interviewRoomId,
        title: room.interviewRoomTitle,
        date: formattedDate,
        score: room.averageScore ?? null
      }
    }) || []

  } catch (err) {
    console.error('상세 조회 실패:', err)
  }
}

onMounted(() => {
  loadInterviewDetail(route.params.interviewRoomId)
})

watch(() => route.params.interviewRoomId, (newId) => {
  loadInterviewDetail(newId)
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="interview-detail">
    <div class="detail-view-top">
      <div class="list-and-title">
        <div class="list-button" @click="goBack">
          <div class="list-mg" />
        </div>
        <div class="room-summary">
          <h2 class="info-text">{{ interview.interviewRoomTitle ?? '-' }}</h2>
          <div class="view">
            <span class="info-text-2">카테고리 : </span>
            <span class="info-text-2">{{ interview.difficultyLevel?.toUpperCase() ?? '-' }}</span>
            <span class="info-text-div"> | </span>
            <span class="info-text-2">난이도 : </span>
            <span class="info-text-2">{{ interview?.difficultyLevel?.toUpperCase() ?? '-' }}</span>
            <span class="info-text-div"> | </span>
            <span class="info-text-2">평가 : </span>
            <span class="info-text-2">{{ interview.evaluationStrictness?.toUpperCase() ?? '-' }}</span>
          </div>
        </div>
      </div>
      <div class="interview-top-button">
        <button class="button" @click="handleDelete">삭제하기</button>
      </div>
    </div>

    <div class="full-score-wrapper">
      <span class="full-score">면접 총점: {{ interview?.averageScore ?? '-' }}점</span>
    </div>

    <section class="total-comment" v-if="totalComment">
      <h3 class="info-text">전체 총평</h3>
      <div class="print-out-text">
        <p class="answer-text" v-html="totalComment.replace(/\n/g, '<br>')"></p>
      </div>
    </section>

    <section class="memo-section">
      <h3 class="info-text">메모</h3>
      <textarea
          rows="5"
          class="user-input-box"
          placeholder="여기에 메모를 입력하세요..."
          v-model="memoText"
      />
      <div class="memo-footbar">
        <div class="interview-run-button">
          <button class="button" @click="handleSaveMemo">메모 저장하기</button>
        </div>
      </div>
    </section>

    <InterviewReexecuteModal
        v-if="showReexecuteModal"
        @close="closeReexecuteModal"
        @reexecute="handleReexecute"
    />

    <ReexecutedListModal
        v-if="showReexecutedListModal"
        :rooms="reexecutedRooms"
        @close="closeReexecutedListModal"
    />

    <section class="questions">
      <InterviewQuestionCard
          v-for="(qset, index) in questions"
          :key="index"
          :question-set="qset"
          :index="index"
      />
    </section>

    <div class="interview-foot-bar">
      <div class="interview-run-button">
        <button class="button" @click="showReexecutedListModal = true">재실행한 면접방 보기</button>
      </div>
      <div class="interview-run-button">
        <button class="button" @click="showReexecuteModal = true">면접 재실행하기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interview-detail {
  display: flex;
  flex-direction: column;
  width: 800px;
  align-items: flex-start;
  gap: 24px;
  padding: 40px 50px;
  margin: 0 auto;
}

.detail-view-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 800px;
}

.list-and-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap:20px
}

.list-button {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.list-mg {
  width: 24px;
  height: 24px;
  background-image: url('@/assets/images/interview/ListIcon.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.room-summary {
  flex-direction: column;
  gap: 10px;
}

.view,
.full-score-wrapper{
  display: flex;
  gap: 12px;
  align-items: center;
}
.interview-top-button {
  display: flex;
  width: auto;
  height: 40px;
}
.interview-run-button {
  display: flex;
  width: 200px;
  height: 40px;
}

.info-text {
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin: 0;
}

.info-text-2 {
  color: #888;
  font-size: 12px;
  font-weight: 400;
}
.info-text-div {
  color: #888;
  font-size: 12px;
  font-weight: 600;
}

.full-score {
  color: #7094f4;
  font-weight: 600;
  font-size: 16px;
}

.button {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 12px 24px;
  background-color: #f7f9fb;
  border-radius: 8px;
  font-size: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.memo-section,
.total-comment {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 22px;
}

.memo-footbar {
  display: flex;
  justify-content: right;
}


.print-out-text {
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 0 5px #c6c7f8;
}


.answer-text {
  white-space: pre-line;
  font-size: 14px;
  line-height: 1.6;
}

.user-input-box {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
}

.questions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap:22px;
}

.interview-foot-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
}
</style>
