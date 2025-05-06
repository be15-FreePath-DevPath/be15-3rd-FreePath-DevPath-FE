<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SectionTitle from '@/features/interview/components/SectionTitle.vue'
import OptionSelectGrid from '@/features/interview/components/OptionSelectGrid.vue'
import {fetchInterviewProgressStart} from '@/features/interview/api.js'

const router = useRouter()

// 선택 상태
const selectedCategory = ref('')
const selectedDifficulty = ref('')
const selectedStrictness = ref('')

// 항목들
const categories = [
  '운영체제', '자료구조 & 알고리즘', '데이터베이스', '네트워크', '디자인 패턴',
  '객체 지향 프로그래밍', '보안', 'CI/CD', '시스템 설계', '클라우드 & 인프라'
]
const difficulties = ['EASY', 'MEDIUM', 'HARD']
const strictnessLevels = ['GENEROUS', 'NORMAL', 'STRICT']

const handleStartInterview = async () => {
  if (!selectedCategory.value || !selectedDifficulty.value || !selectedStrictness.value) {
    alert('모든 항목을 선택해주세요.')
    return
  }

  // 면접 시작 API 호출 → 첫 질문 포함 데이터
  const { data } = await fetchInterviewProgressStart(
      selectedCategory.value,
      selectedDifficulty.value,
      selectedStrictness.value
  )

  // 면접 진행 화면으로 이동 (면접방 ID 전달)
  await router.push({
    path: `/interview/progress/${data.interviewRoomId}`,
    query: {
      title: data.interviewRoomTitle,
      category: data.interviewCategory,
      difficulty: data.difficultyLevel,
      strictness: data.evaluationStrictness,
      firstQuestion: data.firstQuestion
    }
  })
}
</script>

<template>
  <div class="interview-run">
    <SectionTitle title="면접방 주제" />
    <OptionSelectGrid :options="categories" v-model:selected="selectedCategory" />

    <SectionTitle title="면접 난이도" />
    <OptionSelectGrid :options="difficulties" v-model:selected="selectedDifficulty" />

    <SectionTitle title="평가 엄격도" />
    <OptionSelectGrid :options="strictnessLevels" v-model:selected="selectedStrictness" />

    <div class="button-wrapper">
      <button class="run-button" @click="handleStartInterview">면접 실행하기</button>
    </div>
  </div>
</template>

<style scoped>
.interview-run {
  width: 700px;
  margin: 40px auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.run-button {
  background-color: #f7f9fb;
  border-radius: 8px;
  border: 0;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
