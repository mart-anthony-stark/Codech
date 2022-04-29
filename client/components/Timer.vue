<template>
  <div class="progress-bar">
    <div class="text">{{ remainingTime }}</div>
    <div class="fill" :style="{ width: barPercentage + '%' }"></div>
    <img src="~/assets/svg/timer.svg" alt="" />
  </div>
</template>


<script>
export default {
  props: {
    time: Number,
    max: Number,
  },
  computed: {
    remainingTime() {
      const m = Math.floor(((this.time) % 3600) / 60).toString();
      const s = Math.floor((this.time) % 60)
        .toString()
        .padStart(2, "0");
      return `${m}:${s}`;
    },
    barPercentage() {
      return ((this.time) / 90) * 100;
    },
  },
  mounted() {},
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

  img {
    height: 25px;
    width: 25px;
    position: absolute;
    right: 10px;
  }
}
</style>