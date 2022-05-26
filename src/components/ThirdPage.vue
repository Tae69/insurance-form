<script setup lang="ts">
import type { InsuranceFormData } from "../types/insurance-form";

defineEmits<{
  (e: "nextPage"): void;
  (e: "back"): void;
}>();

defineProps<{
  form: InsuranceFormData;
}>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import thousandSeparator from "../utils/thousandSeparator";
export default defineComponent({});
</script>

<template>
  <div
    class="container max-w-xl mx-auto bg-gray-50 py-12 md:px-16 px-4 text-center rounded"
  >
    <h3 class="font-bold text-3xl my-4 tracking-wide">Summary</h3>
    <h5 class="font-bold text-2xl my-4 tracking-wide">{{ form.name }}</h5>
    <p class="font-light my-4">Name: {{ form.name }}</p>
    <p class="font-light my-4">Age: {{ form.age }}</p>
    <p class="font-light my-4">Where do you live: {{ form.country }}</p>
    <p class="font-light my-4">Package: {{ form.selectedPackage }}</p>
    <p class="font-light my-4">
      Premium:
      <span class="font-bold"
        >{{ thousandSeparator(form.premium) }}{{ form.currency }}</span
      >
    </p>
    <div class="flex justify-center">
      <button
        data-testid="back"
        type="button"
        class="border-2 border-gray-400 bg-white py-2 px-12 rounded my-6 mx-4"
        @click="$emit('back')"
      >
        Back
      </button>
      <button
        data-testid="next"
        type="button"
        class="bg-black border-2 border-black text-white py-2 px-12 rounded my-6 mx-4"
        @click="$emit('nextPage')"
      >
        Buy
      </button>
    </div>
  </div>
</template>

<style></style>
