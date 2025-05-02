  <template>
    <div class="layout-default">
      <!-- 좌측 사이드바 섹션 -->
      <transition name="slide">
        <Sidebar v-if="showSidebar" class="sidebar" />
      </transition>

      <!-- 우측 헤더+콘텐츠 섹션 -->
      <div class="content-wrapper">
        <Header
            :breadcrumbItems="breadcrumbItems"
            @navToggle="handleSidebar"/>
        <main class="main-content" >
          <slot/>
        </main>
      </div>

    </div>
  </template>

  <script setup>
  import Sidebar from './Sidebar.vue'
  import Header from './Header.vue';
  import {ref} from "vue";

  const showSidebar = ref(true)
  const breadcrumbItems = ref([]);

  const handleSidebar = () => {
    showSidebar.value = !showSidebar.value
  }
  </script>

  <style scoped>
  .layout-default {
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #f9f9f9;
    overflow: hidden;
  }

  /* 오른쪽 전체 (헤더 + 메인) */
  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .main-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    background-color: white;
  }

  /* 트랜지션 클래스 정의 */
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  </style>
