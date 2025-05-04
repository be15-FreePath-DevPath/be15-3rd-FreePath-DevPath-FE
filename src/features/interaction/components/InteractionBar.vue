<script setup>

</script>

<template>
  <div class="post-action-bar">
    <div class="left-actions">
      <img src="@/assets/images/board/BigHeartStraight.png" alt="좋아요" class="icon" />
      <span class="like-count">30</span>
    </div>
    <div class="right-actions">
      <img src="@/assets/images/board/BookmarkSimple.png" alt="북마크" class="icon" />
    </div>
  </div>
</template>

<style scoped>
.post-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px; /* 살짝 여유 있게 */
  padding: 0 12px;
  border-bottom: 2px solid #eee;
}

.left-actions,
.right-actions {
  display: flex;
  align-items: center;
}

.icon {
  width: 24px;  /* 기존보다 작게 */
  height: 24px;
  cursor: pointer;
}

.like-count {
  margin-left: 6px;
  font-size: 1em;   /* 일반 텍스트와 비슷한 수준 */
  font-weight: 500; /* 약간 강조 */
  color: #333;
}

</style>