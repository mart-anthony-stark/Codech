<template>
  <section>
    <!-- <transition name="fade">
      <Loader v-if="loading" />
    </transition> -->
    <!-- <div v-for="question in questions" :key="question._id">
      {{ question.question }}
    </div> -->
    <h1 class="category">Object-Oriented Programming (OOP)</h1>
    <Timer :time="time" :max="max" />
  </section>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useContext,
  Ref,
  onUnmounted,
} from "@nuxtjs/composition-api";
import { questions } from "../../assets/data/questions";
// const time = 20;
const max = 90;
const time: Ref<number> = ref(90);
const { route } = useContext();

const category: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);

// Countdown handler for timer
let timerInterval: ReturnType<typeof setInterval>;
onMounted(() => {
  // console.log(route.value.params);
  // console.log(process.env.API_URL);
  setTimeout(() => {
    loading.value = false;
  }, 3000);

  timerInterval = setInterval(() => {
    if (time.value === 0) return clearInterval(timerInterval);
    time.value--;
  }, 1000);
});

onUnmounted(() => clearInterval(timerInterval));
</script>

<style lang="scss" scoped>
section {
  padding: 20px;

  .category {
    color: #c9c9c9;
  }
}
</style>