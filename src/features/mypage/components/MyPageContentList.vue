<script setup>
import BookmarkList from "@/features/mypage/bookmark/components/BookmarkList.vue";
import LikeList from "@/features/mypage/like/components/LikeList.vue";

const props = defineProps(['selectedMain', 'selectedSub'])
</script>

<template>
  <div class="content-frame">
    <div class="content">
      <div v-if="selectedSub === '북마크한 게시물'">
        <BookmarkList />
      </div>
      <div v-if="selectedSub === '좋아요한 게시물'">
        <LikeList />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-frame {
  width: 836px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}

.title {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  gap: 20px;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text1, .text2 {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text1 {
  width: 528px;
}

.text2 {
  width: 158px;
}

.list-frame
{
  height:60px;
  width:794px;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items:center;
  gap:20px;
  position:relative;
  border-style:hidden;
  outline:none;
}

.list-title
{
  height:42px;
  width:460px;
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  position:relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-title-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
}

.list-date {
  height: 60px;
  width: 161px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.calendar-icon {
  width: 16px;
  height: 16px;
}

.list-writer{
  height:35px;
  width:118px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:10px;
  position:relative;
}

</style>