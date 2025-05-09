<script setup>
import {computed, ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { devtiQuestions } from '@/features/devti/data/devtiQuestions.js'
import {saveDevtiResult} from "@/features/devti/api.js";
import {useAuthStore} from "@/stores/auth.js";

const newBreadCrumbItems = ref(['개발자 성향 테스트', '개발자 성향 테스트 응시']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})

const auth = useAuthStore()
const router = useRouter()
const currentIndex = ref(0)
const answers = ref({ G: 0, S: 0, A: 0, B: 0, T: 0, M: 0, F: 0, D: 0 })

const currentQuestion = computed(() => devtiQuestions[currentIndex.value])

const handleAnswer = async (value) => {
  answers.value[value]++;

  if (currentIndex.value < devtiQuestions.length - 1) {
    currentIndex.value++;
  } else {
    const result = [
      answers.value.G >= 2 ? 'G' : 'S',
      answers.value.A >= 2 ? 'A' : 'B',
      answers.value.T >= 2 ? 'T' : 'M',
      answers.value.F >= 2 ? 'F' : 'D'
    ].join('');

    try {
      await saveDevtiResult(result);  // ✅ API 호출
    } catch (err) {
      console.error('DevTI 저장 실패:', err);
    }

    await router.push({path: '/mypage/devti/result', query: {type: result}});
  }
}

onMounted(() => {
  if (!auth.isAuthenticated) {
    alert('로그인이 필요한 서비스입니다.')
    router.push('/user/login')
  }
})

</script>

<template>
  <div class="testing-page">
    <div class="test-section">
      <div class="question-part">
        <div class="type-question-number">
          <div class="numbering">[ {{ currentIndex + 1 }} ]</div>
        </div>
        <div class="type-question">
          <p class="type-question-text">{{ currentQuestion.text }}</p>
        </div>
      </div>
      <div class="type-answer-part">
        <div
            v-for="(option, idx) in currentQuestion.options"
            :key="idx"
            class="type-card-component"
            :style="{ top: idx === 0 ? '0px' : '139px' }"
            @click="handleAnswer(option.value)"
        >
          <div class="type-content">
            <div class="type-text">
              <p class="text-wrapper">{{ option.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.testing-page {
  display: flex;
  width: 600px;
  height: 600px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin: 60px auto;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.test-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
}

.question-part {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.type-question-number {
  display: flex;
  justify-content: center;
}

.numbering {
  font-weight: 600;
  font-size: 24px;
  color: #000000;
  line-height: 40px;
}

.type-question {
  display: flex;
  max-width: 800px;
  width: 468px;
  height: 120px;
  justify-content: center;
}

.type-question-text {
  white-space: pre-line;
  font-weight: 700;
  font-size: 32px;
  color: #000000;
  line-height: 60px;
  text-align: center;
  margin:0;
}

.type-answer-part {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  position: relative;
  width: 100%;
}

.type-card-component {
  box-sizing: border-box;
  width: 400px;
  height: 100px;
  padding: 24px;
  border-radius: 16px;
  background-color: #e5ecf6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.type-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
}

.type-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.text-wrapper {
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  text-align: center;
  white-space: pre-line;
  cursor: pointer;
  margin: 0;
}
</style>

