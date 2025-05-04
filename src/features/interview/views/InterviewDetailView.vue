<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchInterviewDetail } from '@/features/interview/api.js'
import InterviewQuestionCard from '@/features/interview/components/InterviewQuestionCard.vue'

const router = useRouter()
const interview = ref(null)
const questions = ref([])
const totalComment = ref('')

onMounted(async () => {
  const { data } = await fetchInterviewDetail(45)
  interview.value = data

  const tempQuestions = []
  let buffer = []

  data.interviewList.forEach((item) => {
    const message = item.interviewMessage

    if (message.startsWith('[총평]')) {
      totalComment.value = message.replace('[총평]', '').trim()
      return
    }

    // 면접 질문 묶음 처리
    if (message.startsWith('[면접 질문]')) {
      if (buffer.length) tempQuestions.push([...buffer])
      buffer = [message]
    } else {
      buffer.push(message)
    }
  })

  if (buffer.length) tempQuestions.push([...buffer])

  questions.value = tempQuestions
})


function goBack() {
  router.push('/interview/list')
}
</script>

<template>
  <div class="interview-detail">
    <div class="detail-view-top">
      <div class="list-and-title">
        <div class="list-button" @click="goBack">
          <div class="list-mg"/>
        </div>
        <div class="room-summary">
          <h2 class="info-text">{{ interview?.interviewRoomTitle }}</h2>
          <div class="view">
            <div class="info-text-component">
              <span class="info-text-2">카테고리 : </span>
              <span class="info-text-2">{{ interview?.interviewCategory }}</span>
              <span class="info-text-div">   |   </span>
              <span class="info-text-2">난이도 : </span>
              <span class="info-text-2">{{ interview?.difficultyLevel.toUpperCase() }}</span>
              <span class="info-text-div">   |   </span>
              <span class="info-text-2">평가 : </span>
              <span class="info-text-2">{{ interview?.evaluationStrictness.toUpperCase() }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="interview-run-button">
        <button class="button">메모 저장하기</button>
      </div>
    </div>

    <div class="div-wrapper">
      <span class="div">면접 총점: {{ interview?.interviewRoomScore }}점</span>
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
        >{{ interview?.interviewRoomMemo }}</textarea>
    </section>

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
        <button class="button">재실행한 면접방 보기</button>
      </div>
      <div class="interview-run-button">
        <button class="button">면접 재실행하기</button>
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
.div-wrapper{
  display: flex;
  gap: 12px;
  align-items: center;
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

.div {
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
