<script setup lang="ts">
defineEmits<{
  (e: "nextPage"): void;
}>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<template>
  <div
    class="container max-w-xl mx-auto bg-gray-50 py-12 px-16 text-center rounded"
  >
    <h3 class="font-bold text-3xl my-4 tracking-wide">Hello There!</h3>
    <p class="font-light my-4">
      Let's buy some insurance. It is going to take only few steps
    </p>
    <button
      data-testid="next"
      type="button"
      class="bg-black text-white py-2 px-12 rounded my-6"
      @click="$emit('nextPage')"
    >
      Start
    </button>
  </div>
</template>

<style></style>
