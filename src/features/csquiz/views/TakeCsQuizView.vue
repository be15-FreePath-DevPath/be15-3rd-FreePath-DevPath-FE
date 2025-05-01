<script setup>

</script>

<template>
  <div class="card" v-if="quiz">
    <h3>{{ quiz.csquizContents }}</h3>
    <ul>
      <li
          v-for="(option, index) in quiz.options"
          :key="option.optionId"
          @click="selectAnswer(index + 1)"
          :class="{ selected: selectedAnswer === index + 1 }"
      >
        {{ index + 1 }}. {{ option.optionContent }}
      </li>
    </ul>
    <div v-if="selectedAnswer" class="answer">
      선택한 답: {{ selectedAnswer }}
    </div>
  </div>
</template>


<script>
export default {
  name: "QuizCard",
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedAnswer: null,
    };
  },
  methods: {
    selectAnswer(answerNum) {
      this.selectedAnswer = answerNum;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}
li:hover {
  background-color: #f0f0f0;
}
.selected {
  background-color: #cce5ff;
}
.answer {
  margin-top: 0.5rem;
  font-weight: bold;
}
</style>
