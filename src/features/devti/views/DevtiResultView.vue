<template>
  <DevtiResultSection :result-type="resultType" />
</template>

<script setup>
import { useRoute } from "vue-router";
import DevtiResultSection from "@/features/devti/components/DevtiResultSection.vue";

const route = useRoute();
const resultType = route.query.type || "";
</script>

