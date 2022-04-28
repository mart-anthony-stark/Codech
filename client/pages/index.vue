<template>
  <div>{{ count }} <button @click="handleAdd">add</button></div>
</template>

<script setup>
import { ref } from "@nuxtjs/composition-api";

const count = ref(1);

const handleAdd = () => {
  count.value += 5;
};
</script>