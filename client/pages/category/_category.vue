<template>
  <section>
    <!-- <transition name="fade">
      <Loader v-if="loading" />
    </transition> -->
    <h1 class="category">Object-Oriented Programming (OOP)</h1>
    <Timer :time="time" :max="max" />
    <div
      class="question-container"
      v-for="(question, i) in questions"
      :key="question._id"
    >
      <div v-show="questionIndex == i" class="question-box">
        <h1 class="question">
          {{ question.question }}
        </h1>
        <div class="choices">
          <div
            v-for="choice in question.choices"
            :key="choice.id"
            class="choice"
          >
            <div class="text">{{ choice.text }}</div>
          </div>
        </div>
        <div class="btn">
          <button class="next">NEXT</button>
        </div>
      </div>
    </div>
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

const questionIndex: Ref<number> = ref(0);
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
    margin-bottom: 30px;
  }
  .question-container {
    padding: 20px;

    .choices {
      display: flex;
      gap: 10px;
      flex-direction: column;
      margin-top: 50px;

      .choice {
        padding: 10px 20px;
        border: 1px solid $secondary;
        border-radius: 25px;
        cursor: pointer;
      }
    }
    .btn {
      @include center();
      padding: 20px;

      button.next {
        padding: 10px;
        border-radius: 25px;
        border: none;
        cursor: pointer;
        color: #fff;
        background: $secondary;
        width: 150px;
      }
    }
  }
}
</style>