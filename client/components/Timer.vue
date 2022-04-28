<template>
  <section>
    <div class="progress-bar">
      <div class="text">{{ remainingTime }}</div>
      <div class="fill" :style="{ width: barPercentage + '%' }"></div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  onMounted,
  onUnmounted,
  ref,
  Ref,
} from "@nuxtjs/composition-api";

export default {
  setup() {
    const time: Ref<number> = ref(90);

    const remainingTime: ComputedRef<string> = computed((): string => {
      const m = Math.floor((time.value % 3600) / 60).toString();
      const s = Math.floor(time.value % 60)
        .toString()
        .padStart(2, "0");
      return `${m}:${s}`;
    });

    // Compute progress bar percentage
    const barPercentage: ComputedRef<number> = computed((): number => {
      return (time.value / 90) * 100;
    });

    // Countdown handler for timer
    let timerInterval: ReturnType<typeof setInterval>;
    onMounted(() => {
      timerInterval = setInterval(() => {
        if (time.value === 0) return clearInterval(timerInterval);
        time.value--;
      }, 1000);
    });

    onUnmounted(() => clearInterval(timerInterval));

    return { remainingTime, barPercentage };
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  @include center();

  position: relative;
  margin: auto;
  padding: 5px;
  max-width: 600px;
  width: 100%;
  border: 2px solid $secondary;
  border-radius: 25px;

  .fill {
    position: absolute;
    border-radius: 25px;
    left: 0;
    z-index: 0;

    height: 100%;
    background: linear-gradient(to left, $accent, $accent2);
  }

  .text {
    z-index: 1;
  }
}
</style>