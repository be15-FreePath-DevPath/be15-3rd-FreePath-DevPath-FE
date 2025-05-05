<script setup>

</script>

<template>
  <div class="content">
    <img src="@/assets/images/mypage/profile.png" alt="profile img"/>
    <div class="user-info">
      <div class="profile-text">닉네임</div>
      <div class="profile-text">test@mail.com</div>
      <div class="profile-text">login ID</div>
      <div class="profile-text">IT 기사 구독</div>
      <div class="profile-text">개발자 MBTI</div>
    </div>
  </div>
</template>

<style scoped>


.content
{
  padding-left:24px;
  padding-right:24px;
  padding-top:12px;
  padding-bottom:12px;
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:flex-start;
  align-items:center;
  gap:41px;
  position:relative;
}

.user-info
{
  width:198px;
  display:flex;
  flex-direction:column;
  gap:2px;
  position:relative;
}

.profile-text{
  font-size:14px;
}
</style>