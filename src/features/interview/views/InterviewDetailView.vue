<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  deleteInterviewRoom,
  fetchInterviewDetail,
  reexecuteInterviewRoom,
  updateInterviewInfo
} from '@/features/interview/api.js'
import InterviewQuestionCard from '@/features/interview/components/InterviewQuestionCard.vue'
import InterviewReexecuteModal from '@/features/interview/components/InterviewReexecuteModal.vue'
import ReexecutedListModal from '@/features/interview/components/ReexecutedListModal.vue'

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['updateBreadCrumb'])
const newBreadCrumbItems = ref(['모의 면접', '모의 면접 목록'])

const interview = reactive({})
const questions = ref([])
const totalComment = ref('')
const reexecutedRooms = ref([])
const titleText = ref('')
const memoText = ref('')
const roomId = ref(route.params.interviewRoomId)
const isReexecuting = ref(false)

const showReexecuteModal = ref(false)
const showReexecutedListModal = ref(false)
const isHoveringTitle = ref(false)
const isEditingTitle = ref(false)

const startEditingTitle = () => {
  isEditingTitle.value = true
}

let isSaving = false
const saveTitle = async () => {
  if (isSaving) return
  isSaving = true
  isEditingTitle.value = false
  try {
    await updateInterviewInfo(interview.interviewRoomId, titleText.value, memoText.value)
    alert('제목이 저장되었습니다.')
  } catch {
    alert('제목 저장에 실패했습니다.')
  } finally {
    isSaving = false
  }
}

const handleSaveMemo = async () => {
  try {
    await updateInterviewInfo(interview.interviewRoomId, titleText.value, memoText.value)
    alert('메모가 저장되었습니다.')
  } catch {
    alert('메모 저장에 실패했습니다.')
  }
}

const closeReexecuteModal = () => (showReexecuteModal.value = false)
const handleReexecute = async ({ strictness }) => {
  isReexecuting.value = true
  try {
    const resp = await reexecuteInterviewRoom(roomId.value, strictness)
    const { interviewRoomId, interviewRoomTitle, questions: newQs } = resp.data.data
    await router.push({
      path: `/interview/progress/${interviewRoomId}`,
      query: {
        title:      interviewRoomTitle,
        category:   interview.interviewCategory,
        difficulty: interview.difficultyLevel,
        strictness: interview.evaluationStrictness,
        questions:  JSON.stringify(newQs)

      }
    })
  } catch {
    alert('면접 재실행 중 오류')
  } finally {
    isReexecuting.value = false
    closeReexecuteModal()
  }
}

const handleDelete = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await deleteInterviewRoom(roomId.value)
    alert('삭제되었습니다')
    router.push('/interview/list')
  } catch {
    alert('삭제가 실패되었습니다')
  }
}

const loadInterviewDetail = async (id) => {
  try {
    const { data } = await fetchInterviewDetail(id)
    Object.assign(interview, data.data)
    titleText.value = data.data.interviewRoomTitle
    memoText.value = data.data.interviewRoomMemo || ''

    // --- 질문/답변/평가 파싱 ---
    const parsed = []
    const list   = data.data.interviewList

    list.forEach((item, idx) => {
      // 1) 총평 분리
      if (item.interviewMessage.startsWith('[총평]')) {
        totalComment.value = item.interviewMessage.replace('[총평]', '').trim()
        return
      }

      // 2) AI 질문만 골라서
      if (item.interviewRole === 'AI' &&
          item.interviewMessage.startsWith('[면접 질문]')) {

        // 3) 이 질문 이후에 나오는 첫 USER 답변 찾기
        const userItem = list.slice(idx + 1)
            .find(x => x.interviewRole === 'USER')
        const answerMsg = userItem?.interviewMessage || ''

        // 4) 그 다음 나오는 AI 평가 찾기
        const evalItem = list.slice(idx + 1)
            .find(x =>
                x.interviewRole === 'AI' &&
                x.interviewMessage.startsWith('[답변 평가]')
            )
        const evalMsg = evalItem?.interviewMessage || ''

        // 5) 하나의 세트로 push
        parsed.push([
          item.interviewMessage,  // 질문
          answerMsg,              // 답변
          evalMsg                 // 평가
        ])
      }
    })

    questions.value = parsed

    reexecutedRooms.value = data.data.reexecutedRooms.map(room => ({
      id: room.interviewRoomId,
      title: room.interviewRoomTitle,
      date: new Date(room.interviewRoomCreatedAt).toLocaleDateString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'
      }).replace(/\. /g, '.').replace('.', ''),
      score: room.averageScore || null
    }))
  } catch {
    console.error('상세조회 실패')
  }
}

const goBack = () => router.push('/interview/list')

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
  loadInterviewDetail(roomId.value)
})

watch(() => route.params.interviewRoomId, id => {
  roomId.value = id
  loadInterviewDetail(id)
  window.scrollTo(0,0)
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
          <h2
              class="info-text editable-title"
              :class="{ editing: isEditingTitle, hover: isHoveringTitle }"
              @dblclick="startEditingTitle"
              @mouseover="isHoveringTitle = true"
              @mouseleave="isHoveringTitle = false"
          >
            <template v-if="isEditingTitle">
              <input
                  v-model="titleText"
                  @blur="saveTitle"
                  @keydown.enter.prevent="saveTitle"
                  @keydown.tab.prevent="saveTitle"
                  class="edit-title-input"
                  autofocus
              />
            </template>
            <template v-else>
              {{ titleText || '-' }}
            </template>
          </h2>
          <div class="view">
            <span class="info-text-2">카테고리 : </span>
            <span class="info-text-2">{{ interview.interviewCategory?.toUpperCase() || '-' }}</span>
            <span class="info-text-div"> | </span>
            <span class="info-text-2">난이도 : </span>
            <span class="info-text-2">{{ interview.difficultyLevel?.toUpperCase() || '-' }}</span>
            <span class="info-text-div"> | </span>
            <span class="info-text-2">평가 : </span>
            <span class="info-text-2">{{ interview.evaluationStrictness?.toUpperCase() || '-' }}</span>
          </div>
        </div>
      </div>
      <div class="interview-top-button">
        <button class="button" @click="handleDelete">삭제하기</button>
      </div>
    </div>

    <div class="full-score-wrapper">
      <span class="full-score">면접 총점: {{ interview.averageScore ?? '-' }}점</span>
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
        :evaluationStrictness="interview.evaluationStrictness"
        :loading="isReexecuting"
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

.editable-title.hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
.editable-title.editing {
  border-radius: 6px;
}
.edit-title-input {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  border: 2px solid #7094f4;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
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
