<template>
  <section class="loader">
    <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="load one" cx="60" cy="60" r="40" />
      <circle class="load two" cx="60" cy="60" r="40" />
      <circle class="load three" cx="60" cy="60" r="40" />
      <g>
        <circle class="point one" cx="45" cy="70" r="5" />
        <circle class="point two" cx="60" cy="70" r="5" />
        <circle class="point three" cx="75" cy="70" r="5" />
      </g>
    </svg>
  </section>
</template>

<style lang="scss" scoped>
.loader {
  @include center();
  width: 100%;

  svg {
    width: 200px;
    fill: none;
  }
}

.load {
  transform-origin: 50% 50%;
  stroke-dasharray: 570;
  stroke-width: 20px;
  &.one {
    stroke: $accent;
    animation: load 1.5s infinite;
  }
  &.two {
    stroke: $accent2;
    animation: load 1.5s infinite;
    animation-delay: 0.1s;
  }
  &.three {
    stroke: $secondary;
    animation: load 1.5s infinite;
    animation-delay: 0.2s;
  }
}

.point {
  animation: bounce 1s infinite ease-in-out;
  &.one {
    fill: $secondary;
    animation-delay: 0s;
  }
  &.two {
    fill: $accent2;
    animation-delay: 0.1s;
  }
  &.three {
    fill: $accent;
    animation-delay: 0.2s;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
@keyframes load {
  0% {
    stroke-dashoffset: 570;
  }
  50% {
    stroke-dashoffset: 530;
  }
  100% {
    stroke-dashoffset: 570;
    transform: rotate(360deg);
  }
}
</style>