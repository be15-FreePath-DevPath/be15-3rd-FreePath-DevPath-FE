<script setup>

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="board-frame">
    <div class="title-area">
      <div class="title-text">{{ title }}</div>
    </div>
    <div class="content-area">
      <slot />
    </div>
  </div>

</template>

<style scoped>
.board-frame{
  background-color: #f7f9fb;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  gap: 10px;
}

.title-area{
  border-radius:8px;
  display:flex;
  flex-direction:column;
  border-style:hidden;
  outline:none;
}

.title-text
{
  color:#1c1c1c;
  text-align:left;
  vertical-align:text-top;
  font-size:16px;
  line-height:20px;
  border-style:hidden;
  outline:none;
  width:100%;
  font-weight: 600;
}

.content-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 100%;
}
</style>