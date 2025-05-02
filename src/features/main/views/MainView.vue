<script setup>

import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import MainInfoPaging from "@/features/main/components/MainInfoPaging.vue";
</script>

<template>
  <LayoutDefault>
    <div class="content-frame">
      <div class="content">
        <div class="main-info">
          <div class="main-info-board">
              <MainInfoPaging/>
          </div>
        </div>
        <div class="main-general-board">
          테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트
        </div>
        <div class="main-general-board">
          테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트
        </div>

      </div>
    </div>
  </LayoutDefault>

</template>


<style scoped>
.content-frame {
  width: auto;
  height: auto;

  display: flex;
  flex-direction: column; /* 방향: 세로 (⬇️) */
  gap: 10px;

  align-items: flex-start; /* 정렬: 왼쪽 정렬 */
  justify-content: flex-start; /* 정렬: 위쪽 정렬 */

  padding: 27px 46px 0px 27px; /* 위 오른쪽 아래 왼쪽 순서 (시계방향) */

  overflow: hidden; /* Clip content 과 같음 */
}

.content {
  width: 100%; /* w: fill → 부모 영역 가득 채움 */
  height: auto; /* h: hug → 내용물 크기만큼 높이 자동 */

  display: flex;
  flex-wrap: wrap; /* direction: wrap */
  justify-content: space-between;
  align-items: flex-start; /* 세로는 위쪽 정렬 */

  row-gap: 29px; /* 세로 간격 */
}

.text
{
  height:20px;
  width:232px;
  border-radius:8px;
  padding:0px;
  display:flex;
  flex-direction:column;
  border-style:hidden;
  outline:none;
}

.main-info
{
  height:auto;
  width:1110px;
  padding:0px;
  display:flex;
  flex-direction:column;
  position:relative;
}

.main-info-board {
  background-color: #F7F9FB;
  height: 384px;
  width: 1110px;
  border-radius: 16.5px;
  padding: 0px;
}

.main-general-board {
  background-color: #F7F9FB;
  height: 399px;
  width: 480px;
  border-radius: 16.5px;
  padding: 0px;
}

</style>