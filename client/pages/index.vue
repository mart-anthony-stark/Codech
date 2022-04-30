<template>
  <main>
    <nav>
      <h1>Codech</h1>
    </nav>
    <div class="hero">
      <div class="banner">
        <div class="left">
          <h1 class="heading">It’s time to “Rethink” technology</h1>
          <h3>Let's examine your fundamentals in technical concepts</h3>
        </div>
        <img class="graphics" src="~/assets/svg/code_thinking.svg" alt="" />
      </div>

      <button @click="start" class="start">Start</button>
    </div>
    <section>
      <div class="left">
        <div class="two-cols">
          <div class="content">
            <h1>Enhances your skills</h1>
            <p>
              Assessment used to provide an unbiased, validated evaluation of an
              individual's ability and knowledge in technical concepts in
              question based format
            </p>
          </div>
          <img src="~/assets/svg/skills.svg" class="graphics" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, useRouter } from "@nuxtjs/composition-api";

const router = useRouter();
const start = () => {
  router.push("/category/asd");
};
</script>

<style lang="scss" scoped>
main {
  .graphics {
    height: 500px;
    width: 500px;
  }
  nav {
    @include center();
    color: #fff;
    justify-content: space-between;
    padding: 0 50px;
    height: 80px;
    background: $primary;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
    
    h1 {
      font-size: 2rem;
    }
  }

  .hero {
    min-height: 100vh;
    @include center();
    flex-direction: column;
    .banner {
      @include center();
      padding: 0 30px;
      gap: 100px;
    }

    .left {
      color: $primary;
      h1 {
        font-size: 2.5rem;
      }
    }
    .start {
      position: relative;
      height: 50px;
      width: 300px;
      border: none;
      background: $accent;
      color: #fff;
      font-size: 1.2rem;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 5px;

      &:after {
        border-radius: 5px;
        content: "";
        height: 50px;
        width: 300px;
        border: none;
        background: rgb(109, 15, 54);
        color: #fff;
        z-index: -1;
        position: absolute;
        left: 0;
        top: 10px;
      }
      &:active {
        transform: translateY(10px);
      }
      &:active::after {
        background: $accent;
      }
    }
  }

  section {
    @include center();
    gap: 100px;

    .two-cols {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-items: center;

      .content {
        @include center();
        flex-direction: column;
        padding: 20px;
        gap: 20px;

        h1 {
          font-size: 2rem;
          color: $secondary;
        }

        p {
          font-size: 1.2rem;
          text-align: center;
        }
      }
    }
  }
}
</style>