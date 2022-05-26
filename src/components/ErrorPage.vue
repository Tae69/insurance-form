<script setup lang="ts">
defineEmits<{
  (e: "back"): void;
}>();
</script>

<template>
  <div
    class="container max-w-xl mx-auto bg-gray-50 py-12 px-16 text-center rounded"
  >
    <h3 class="font-bold text-3xl my-4 tracking-wide">Ooops</h3>
    <div class="font-light my-4">
      <p>Your age is over our accepted limit.</p>
      <p>We are sorry but we can't insure you now</p>
    </div>
    <button
      type="button"
      class="bg-black text-white py-2 px-12 rounded my-6"
      @click="$emit('back')"
    >
      Ok :(
    </button>
  </div>
</template>

<style></style>
