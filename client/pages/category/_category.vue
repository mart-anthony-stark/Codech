<template>
  <section>
    <!-- <transition name="fade">
      <Loader v-if="loading" />
    </transition> -->
    <h1 class="category">Object-Oriented Programming (OOP)</h1>
    {{ score }}
    <Timer :time="time" :max="max" />
    <!-- <TransitionGroup name="list"> -->
    <div
      class="question-container"
      v-for="(question, i) in questions"
      v-show="questionIndex === i"
      :key="question._id"
    >
      <transition name="list">
        <div v-show="questionIndex === i" class="question-box">
          <h1 class="question">
            {{ question.question }}
          </h1>
          <div class="choices">
            <div
              v-for="choice in question.choices"
              :key="choice.id"
              class="choice"
              :class="{ selected: choice.id === selectedAnswer }"
              @click="choose(choice.id)"
            >
              <div class="text">{{ choice.text }}</div>
            </div>
          </div>
          <div v-if="selectedAnswer.length !== 0" class="btn">
            <button @click="nextQuestion()" class="next">NEXT</button>
          </div>
        </div>
      </transition>
    </div>
    <!-- </TransitionGroup> -->
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
const { route } = useContext();
const max = 90;
const time: Ref<number> = ref(90);

const selectedAnswer = ref("");
const score = ref(0);
const questionIndex: Ref<number> = ref(0);
const category: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);

const choose = (id: string) => {
  selectedAnswer.value = id;
};

const isCorrectAnswer = () => {
  return (
    selectedAnswer.value.toLowerCase() ===
    questions[questionIndex.value].answer.toLowerCase()
  );
};

// Handle next question
const nextQuestion = () => {
  if (isCorrectAnswer()) score.value++;
  if (questions.length - 1 !== questionIndex.value) {
    time.value = max;
    questionIndex.value++;
  }

  selectedAnswer.value = "";
};

// Countdown handler for timer
let timerInterval: ReturnType<typeof setInterval>;
const startQuiz = () => {
  timerInterval = setInterval(() => {
    if (time.value === 0) {
      nextQuestion();
      return;
    }
    time.value--;
  }, 1000);
};

onMounted(() => {
  // console.log(route.value.params);
  // console.log(process.env.API_URL);
  setTimeout(() => {
    loading.value = false;
  }, 3000);
  startQuiz();
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

        &.selected {
          background: $secondary;
          color: #fff;
        }
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