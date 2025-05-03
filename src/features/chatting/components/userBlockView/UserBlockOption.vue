<template>
  <div class="screen">
    <div class="view">
      <button class="text-wrapper">차단 해제</button>
    </div>
  </div>
</template>

<script setup>

</script>
<style>
/* 옵션 박스 */
.screen {
position: absolute;
bottom: 100%;      /* 버튼 위에 표시 */
right: 0;
margin-bottom: 8px;
background-color: #ffffff;
border-radius: 8px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
width: 200px;
z-index: 10;       /* 버튼보다 위에 떠야 하므로 더 높게 */
}

.screen .view {
align-items: center;
align-self: stretch;
border: 1px solid #ccc;
display: flex;
gap: 10px;
height: 40px;
justify-content: center;
padding: 0px 59px;
width: 100%;
}

.screen .text-wrapper {
color: #000000;
font-family: "Inter-SemiBold", Helvetica;
font-size: 16px;
font-weight: 600;
text-align: center;
white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
