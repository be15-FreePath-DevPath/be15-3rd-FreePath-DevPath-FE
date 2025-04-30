<script>
import { defineProps } from 'vue';

</script>


<template>
  <div class="dev-path-header">
    <div class="icon-breadcrumb">
      <div class="div">
        <button
        />
      </div>

      <div class="div">
        <div
            class="design-component-instance-node"
            size="small"
        >
          DevPath
        </div>
        <div class="slash">/</div>
        <div
            class="design-component-instance-node"
            size="small"
            type="text"
        >메인 페이지</div>
      </div>
    </div>

    <div
          class="button-instance"
          size="small"
      >로그아웃</div>
      <div
          class="button-instance"
          size="small"
      />로그인</div>
      <div
          class="button-instance"
          size="small"
      >회원 가입
    </div>
  </div>
</template>



<style>
.dev-path-header {
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 10);
  display: flex;
  height: 68px;
  justify-content: space-between;
  padding: 20px 28px;
  position: relative;
  width: 1170px;
}

.dev-path-header .icon-breadcrumb {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 8px;
  position: relative;
}

.dev-path-header .div {
  align-items: center;
  border-radius: 8%;
  display: inline-flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;
}

.dev-path-header .button-instance {
  flex: 0 0 auto !important;
}

.dev-path-header .design-component-instance-node {
  flex: 0 0 auto !important;
  justify-content: unset !important;
}

.dev-path-header .button-2 {
  color: rgba(0, 0, 0, 40) !important;
  text-align: center !important;
}

.dev-path-header .slash {
  display: inline-flex !important;
  flex: 0 0 auto !important;
}

.dev-path-header .slash-2 {
  color: rgba(0,0,0,20) !important;
}

.dev-path-header .button-3 {
  text-align: center !important;
}

.dev-path-header .user-log {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 20px;
  justify-content: center;
  position: relative;
}

.dev-path-header .weight-duotone {
  height: 20px !important;
  position: relative !important;
  width: 20px !important;
}
</style>