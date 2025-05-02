<script setup>
import {defineProps, inject} from 'vue';

const emit = defineEmits(['navToggle'])

const navToggle =  () => {
  emit('navToggle', {navToggled:true})
}
defineProps({
  breadcrumbItems: {
    type: Array,
    default: () => []
  }
})

</script>


<template>
  <div class="header">
    <div class="breadcrumb">
      <button class = "nav-toggle" @click="navToggle">
        <img src="../../assets/navToggle.png" alt="아이콘" class="icon" />
      </button>
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <span v-if="index !== 0" class="slash">/</span>
        <span :class="['breadcrumb-item', { 'gray': index === 0 }]">
          {{ item }}
        </span>
      </template>
    </div>
<div class ="user-actions">
  <template v-if="true"><!--v-if="authStore.isAuthenticated"-->
    <button
        class="user-button"
    >로그아웃
    </button>
  </template >
  <template v-if="true"> <!-- v-else-->
    <RouterLink
        to="/"
        class="user-button"
        size="small"
    >로그인
    </RouterLink>
    <RouterLink
        to="/"
        class="user-button"
        size="small"
    >회원 가입
    </RouterLink>
  </template>

</div>
</div>
</template>



<style>
  .header {
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  display: flex;

  height: 68px;
  justify-content: space-between;
  padding: 20px 28px;
  position: relative;
    width: auto;
}
  .nav-toggle{
    background: none;
    border: none;
    cursor: pointer;
    width : 28px;
    height : 28px;
  }

  .breadcrumb {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 8px;
  position: relative;
}
.user-actions {
  align-items: center;
  display: inline-flex;
  flex : 0 0 auto;
  gap: 20px;
  position: relative;
  padding-right : 20px;
}

.user-button {
  background: none;
  border: none;
  cursor: pointer;
  gap : 4px;
  padding: 8px 4px;
  text-decoration: none;
  font-size: 14px;
}

  .gray {
    color: rgba(0,0,0,0.4) !important;
  }

.slash {
  display: inline-flex !important;
  flex: 0 0 auto !important;
  color: rgba(0,0,0,0.2) !important;
}


</style>