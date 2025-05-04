<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  topText: {
    type: String,
    required: true
  },
  links: {
    type: Array,
    required: true
  },
  urls: {
    type: Array,
    required: true
  }
})

const router = useRouter()

function goTo(index) {
  const url = props.urls[index]
  if (url) {
    router.push(url)
  }
}
</script>

<template>
  <div class="bottom-container">
    <div class="top-text">{{ topText }}</div>
    <div class="line"></div>
    <div :class="['links', links.length === 1 ? 'single' : 'multiple']">
      <span
          v-for="(link, index) in links"
          :key="index"
          class="link"
          @click="goTo(index)"
      >
        {{ link }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.bottom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.top-text {
  color: #8d8d8d;
  font-size: 12px;
  text-align: center;
}

.links {
  width: 100%;
  max-width: 220px;
  display: flex;
  flex-wrap: wrap;
}

.links.single {
  justify-content: center;
}

.links.multiple {
  justify-content: space-between;
  gap: 15px;
}

.link {
  color: #8d8d8d;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
}

.line {
  width: 152px;
  border: 1.75px solid rgba(28, 28, 28, 0.4);
}
</style>
