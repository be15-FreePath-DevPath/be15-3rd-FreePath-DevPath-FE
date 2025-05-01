<script setup>

</script>

<template>
  <div>
    <QuizCard v-for="quiz in quizzes" :key="quiz.csquizId" :quiz="quiz" />
  </div>
</template>

<script>
import QuizCard from "./QuizCard.vue";

export default {
  components: { QuizCard },
  data() {
    return {
      quizzes: [],
    };
  },
  mounted() {
    fetch("/csquiz/weekly")
        .then((res) => res.json())
        .then((data) => {
          this.quizzes = data.data;
        });
  },
};
</script>
