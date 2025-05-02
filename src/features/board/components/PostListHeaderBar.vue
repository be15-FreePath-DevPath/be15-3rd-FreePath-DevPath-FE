<template>
  <div class="post-header">
    <div class="header-item title">게시글 제목</div>
    <div class="header-item date">작성일자</div>
    <div class="header-item author">작성자</div>
  </div>
</template>

<style scoped>
.post-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  border-bottom: 1px solid #dcdcdc;
  color: #aaa;
  font-size: 14px;
  text-align: center;
  padding: 8px 0;
  width: auto;
}

.header-item {
  padding: 4px 8px;
}
</style>