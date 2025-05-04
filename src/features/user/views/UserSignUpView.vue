<script setup>
import UserForm from "@/features/user/components/UserForm.vue";
import UserExtraServiceText from "@/features/user/components/UserExtraServiceText.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserWhiteButton from "@/features/user/components/UserButtonWhite.vue";
</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Welcome to DevPath"
        subtitle="처음 방문하시나요?"
    >
      <UserWhiteButton
          general="일반 회원가입"
          google="구글 회원가입"
          generalUrl="/user/signup/general"
          googleUrl="/user/signup/google"
      />
    </UserForm>
    <UserExtraServiceText
        topText="이미 가입한 회원이신가요?"
        :links="['로그인 하러 가기']"
        :urls="['/user/login']"
    />
  </div>
</template>

<style scoped>
.content-frame {
  width: 1170px;
  height: 956px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 27px 46px 0 27px;
  overflow: hidden;
  gap: 30px;
}
</style>
