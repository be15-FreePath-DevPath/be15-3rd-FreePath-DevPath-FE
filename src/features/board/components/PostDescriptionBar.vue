<template>
  <div class="post-description-bar">
    <div class="top-row">
      <span class="category">{{ category }}</span>
      <span class="divider">|</span>
      <span class="title">{{ title }}</span>
    </div>
    <div class="separator-line"></div> <!-- 얇은 줄 -->
    <div class="bottom-row">
      <span class="author">{{ author }}</span>
      <div class="right-section">
        <span class="date">{{ formattedDate }}</span>
        <div class="more-options">
          <img
              src="@/assets/images/board/Button.png"
              class="more-button"
              @click="toggleOptions"
              alt="더보기"
          />
          <div v-if="showOptions" class="dropdown" @click.stop>
            <button @click="emit('delete')">게시글 삭제</button>
            <button @click="emit('modify')">게시글 수정</button>
            <button @click="emit('report')">게시글 신고</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="post-content" v-html="content">
  </div>
</template>


<script setup>
import {ref, onMounted, onBeforeUnmount, computed, toRefs} from 'vue';

const props = defineProps({
  postDescription: {
    type: Object,
    required: true
  }
});

// toRefs로 구조분해 (반응성 유지)
const { category, title, author, createdAt, content } = toRefs(props.postDescription);

const emit = defineEmits(['delete', 'modify', 'report']);

const showOptions = ref(false);

function toggleOptions(e) {
  showOptions.value = !showOptions.value;
  e.stopPropagation();
}

function handleClickOutside() {
  showOptions.value = false;
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const formattedDate = computed(() => {
  return new Date(createdAt.value).toLocaleString();
});
</script>

<style scoped>
.post-description-bar {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.top-row {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 0.95em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category {
  color: #666;
  flex-shrink: 0;
}

.divider {
  margin: 0 8px;
  font-weight: bold;
  color: #aaa;
}

.title {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.separator-line {
  width: 100%;
  height: 2px;
  background-color: #ddd;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85em;
  color: #555;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.more-button {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 20px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 20;
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.dropdown button {
  background: none;
  border: none;
  text-align: left;
  padding: 8px 12px;
  font-size: 0.9em;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown button:hover {
  background-color: #f0f0f0;
}

.post-content {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  font-size: 1em;
  line-height: 1.6;
  white-space: pre-line;
  background-color: #fff;
  color: #222;
  min-height:200px;
}
</style>
