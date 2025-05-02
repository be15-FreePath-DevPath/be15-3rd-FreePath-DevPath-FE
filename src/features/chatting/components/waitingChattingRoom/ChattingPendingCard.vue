<template>
  <div class="chatting-pending-card">
    <div class="user-icon">
      <img src="@/assets/images/chatting/profile.png" alt="프로필사진"/>
    </div>
    <div class="div-wrapper">
      <div class="text-wrapper">채팅방 제목1 (대기)</div>
    </div>
  </div>
</template>

<script>

</script>

<style>
.chatting-pending-card {
  align-items: center;
  border: 1px solid #0000001a;
  display: flex;
  gap: 20px;
  height: 60px;
  padding: 10px 20px;
  position: relative;
  width: 1150px;
}

.user-icon {
  height: 40px !important;
  position: relative !important;
  width: 40px !important;
}

.div-wrapper {
  align-self: stretch;
  flex: 1;
  position: relative;
}

.text-wrapper {
  color: #000000;
  font-family: "Inter-Regular",Helvetica;
  font-size: 14px;
  left: 10px;
  line-height: 20px;
  position: absolute;
  top: 9px;
  white-space: nowrap;
}
</style>
