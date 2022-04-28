<template>
  <section>
    <!-- <transition name="fade">
      <Loader v-if="loading" />
    </transition> -->
    <div v-for="question in questions" :key="question._id">
      {{ question.question }}
    </div>
    <Timer />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, useContext, Ref } from "@nuxtjs/composition-api";
import { questions } from "../../assets/data/questions";

const { route } = useContext();

const category: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);

onMounted(() => {
  // console.log(route.value.params);
  // console.log(process.env.API_URL);
  setTimeout(() => {
    loading.value = false;
  }, 3000);
});
</script>

<style lang="scss" scoped>
section {
  padding: 20px;
}
</style>