<template>
  <section class="light">
    <transition name="fade">
      <Loader v-if="loading" />
    </transition>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "@nuxtjs/composition-api";
import type { Ref } from "vue";

const category: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 3000);
});
</script>

<style lang="scss" scoped>
div {
  background: $primary;
}
</style>