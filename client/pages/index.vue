<template>
  <main>
    <nav>
      <h1>Codech</h1>
    </nav>
    <div class="hero">
      <div class="left">
        <h1 class="heading">It’s time to “Rethink” technology</h1>
        <h3>Let's examine your fundamentals in technical concepts</h3>
      </div>
      <img class="graphics" src="~/assets/svg/code_thinking.svg" alt="" />
    </div>
    <section>
      <div class="left">
        <div class="two-cols">
          <div class="content">
            <h1>Enhances your skills</h1>
            <p>
              Assessment used to provide an unbiased, validated evaluation of an
              individual's ability to perform the duties listed in the job
              description in question based format
            </p>
          </div>
          <img src="~/assets/svg/skills.svg" class="graphics" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "@nuxtjs/composition-api";
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

    h1 {
      font-size: 2rem;
    }
  }

  .hero {
    @include center();
    padding: 0 30px;
    gap: 100px;
    min-height: 100vh;

    .left {
      color: $primary;
      h1 {
        font-size: 2.5rem;
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