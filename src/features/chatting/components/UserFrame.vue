<script setup>

</script>

<template>
<div class="user-frame">
  <div class="frame">
    <div class="text-wrapper">사용자</div>
  </div>
  <div class="user-icon">
    <img src="@/assets/images/chatting/profile.png" alt="프로필사진"/>
  </div>
</div>
</template>

<style scoped>
.user-frame{
  align-items : flex-start;
  display: flex;
  flex-direction:column;
  height:80px;
  position:relative;
  width:60px;
}

.frame{
  align-self:stretch;
  height : 20px;
  position : relative;
  width : 100%;
}

.text-wrapper{
  font-family: "Inter-Regular",Helvetica;
  font-size:14px;
  font-weight: 400;
  height:1px;
  left:7px;
  letter-spacing: 0;
  line-height : 0.1px;
  position:absolute;
  top:9px
}

.icon-instnace{
  height: 60px !important;
  position:relative !important;
  width: 60px !important;
}


</style>