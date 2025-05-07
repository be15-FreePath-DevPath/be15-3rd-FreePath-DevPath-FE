<template>
  <div class="result-container" v-if="result">
    <div class="result-top">
      <h2 class="summary-title">당신은 바로...</h2>
      <h1 class="result-name">{{ result.name }}</h1>
      <p class="description">{{ result.description }}</p>
    </div>

    <section class="traits">
      <h3 class="description-title">✨ 특징</h3>
      <ul class="trait-list">
        <li v-for="(trait, index) in result.traits" :key="index">✔️ {{ trait }}</li>
      </ul>
    </section>

    <section class="matches">
      <h3 class="description-title">👯 나의 동료는?</h3>
      <div class="match-group-set">
        <div class="match-group">
          <h5 class="description-title">🩷 잘 맞는 동료</h5>
          <p class="partner">{{ result.good_matches.join(" , ") }}</p>
        </div>
        <div class="match-group">
          <h5 class="description-title">❌ 안 맞는 동료</h5>
          <p class="partner">{{ result.bad_matches.join(" , ") }}</p>
        </div>
      </div>
    </section>

    <div class="button-group">
      <button @click="goToTest">다시 테스트하기</button>
      <button @click="shareResult">공유하기</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { devtiResults } from '@/features/devti/data/devtiResults.js'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  resultType: {
    type: String,
    required: true
  }
})

const result = computed(() => devtiResults[props.resultType])

const goToTest = () => {
  router.push("/mypage/devti/test");
};

const shareResult = () => {
  const shareText = `내 개발자 성향은 ${result.name}!\n\n${result.description}`;
  if (navigator.share) {
    navigator.share({
      title: "DevTI 결과",
      text: shareText,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(`${shareText}\n${window.location.href}`)
        .then(() => alert('공유 내용이 클립보드에 복사되었습니다!'))
        .catch(() => alert('클립보드 복사에 실패했습니다.'));
  }
};
</script>

<style scoped>
.result-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
.result-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:25px
}

.summary-title {
  font-size: 20px;
  margin:0;
}

.result-name {
  font-size: 36px;
  margin:0;

}

.description-title {
  margin:0;
}
.description {
  font-size: 18px;
  margin:0;
  white-space: pre-line;
}

.traits {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:25px
}

.traits ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  text-align: center;
  max-width: 600px;
}

.traits li {
  margin:0;
  font-size: 16px;
}

.matches {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:15px
}
.match-group-set{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  gap:10px
}
.match-group {
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: fit-content;
  margin:0;
}
.partner{
  margin:0;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin:0;
}

button {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f0f2f5;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
</style>
