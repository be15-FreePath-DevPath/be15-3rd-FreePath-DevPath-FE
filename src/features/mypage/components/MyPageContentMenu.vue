<script setup>
const props = defineProps(['selectedMain', 'selectedSub'])
const emit = defineEmits(['selectMain', 'selectSub'])

const handleSelectMain = (menu) => {
  emit('selectMain', menu)
}

const handleSelectSub = (menu) => {
  emit('selectSub', menu)
}
</script>

<template>
  <div class="menu">
    <div class="main">
      <div
          class="menu-item"
          :class="{ active: selectedMain === '게시글' }"
          @click="handleSelectMain('게시글')"
      >게시글</div>
      <div
          class="menu-item"
          :class="{ active: selectedMain === '댓글' }"
          @click="handleSelectMain('댓글')"
      >댓글</div>
    </div>

    <div class="sub">
      <template v-if="selectedMain === '게시글'">
        <div
            class="sub-item"
            :class="{ active: selectedSub === '작성한 게시물' }"
            @click="handleSelectSub('작성한 게시물')"
        >작성한 게시물</div>
        <div
            class="sub-item"
            :class="{ active: selectedSub === '북마크한 게시물' }"
            @click="handleSelectSub('북마크한 게시물')"
        >북마크한 게시물</div>
        <div
            class="sub-item"
            :class="{ active: selectedSub === '좋아요한 게시물' }"
            @click="handleSelectSub('좋아요한 게시물')"
        >좋아요한 게시물</div>
        <div
            class="sub-item"
            :class="{ active: selectedSub === '신고된 게시물' }"
            @click="handleSelectSub('신고된 게시물')"
        >신고된 게시물</div>
      </template>
      <template v-else>
        <div
            class="sub-item"
            :class="{ active: selectedSub === '작성한 댓글' }"
            @click="handleSelectSub('작성한 댓글')"
        >작성한 댓글</div>
        <div
            class="sub-item"
            :class="{ active: selectedSub === '신고된 댓글' }"
            @click="handleSelectSub('신고된 댓글')"
        >신고된 댓글</div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: auto;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 201px;
  width: auto;
}

.menu-item {
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
}

.menu-item.active {
  color: #1c1c1c;
  font-weight: 600;
}

.menu-item:not(.active) {
  color: rgba(0, 0, 0, 0.4);
}

.sub {
  display: flex;
  gap: 100px;
}

.sub-item {
  cursor: pointer;
  font-size: 14px;
}

.sub-item.active {
  color: #1c1c1c;
  font-weight: 600;
}

.sub-item:not(.active) {
  color: rgba(0, 0, 0, 0.4);
}
</style>
