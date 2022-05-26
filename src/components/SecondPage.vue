<script setup lang="ts">
import { Country } from "../enums/country";
import { Package } from "../enums/package";
import type { InsuranceFormData } from "../types/insurance-form";
import type { FormError } from "../types/form-error";
import countries from "../consts/countries";
import packages from "../consts/packages";

defineEmits<{
  (e: "nextPage", data: InsuranceFormData): void;
  (e: "back"): void;
}>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getAdditionalCostByPackage,
  getBasePremium,
  getFinalPremium,
} from "../utils/premiumCalculator";
import thousandSeparator from "../utils/thousandSeparator";
import validateForm from "../utils/validateForm";

type Data = {
  name: string;
  age: string;
  country: Country;
  selectedPackage: Package;
  errors: FormError;
};

export default defineComponent({
  data(): Data {
    return {
      name: "",
      age: "",
      country: countries[0].value,
      selectedPackage: Package.Standard,
      errors: {},
    };
  },
  methods: {
    clearError(key: "name" | "age") {
      if (!this.errors[key]) {
        return;
      }

      delete this.errors[key];
      this.errors = { ...this.errors };
    },
    validate(e?: KeyboardEvent) {
      const errors: FormError = validateForm(
        { name: this.name, age: this.age },
        !!e
      );

      this.errors = errors;

      return Object.keys(errors).length === 0;
    },
    onNextPage() {
      if (this.validate() === false) {
        return;
      }

      const country = countries.find((c) => c.value === this.country);
      const packageName = packages.find(
        (p) => p.value === this.selectedPackage
      )!.name;

      this.$emit("nextPage", {
        name: this.name,
        age: Number(this.age),
        country: country!.name,
        selectedPackage: packageName,
        premium: this.finalPrice,
        currency: country!.currency,
      });

      if (Number(this.age) > 100) {
        this.name = "";
        this.age = "";
        this.country = Country.HongKong;
        this.selectedPackage = Package.Standard;
      }
    },
    getPackageLabel(p: { name: string; value: Package }): string {
      let string = p.name;

      if (!this.age || this.errors.age) {
        return string;
      }

      switch (p.value) {
        case Package.Safe:
          return string + ` (+${this.safePrice}${this.currency}, 50%)`;
        case Package.SuperSafe:
          return string + ` (+${this.superSafePrice}${this.currency}, 75%)`;
        default:
          return string;
      }
    },
  },
  computed: {
    currency() {
      return countries.find((c) => c.value === this.country)!.currency;
    },
    basePrice() {
      return getBasePremium(Number(this.age), this.country);
    },
    safePrice() {
      return getAdditionalCostByPackage(this.basePrice, Package.Safe);
    },
    superSafePrice() {
      return getAdditionalCostByPackage(this.basePrice, Package.SuperSafe);
    },
    finalPrice(): number {
      return getFinalPremium(
        Number(this.age),
        this.country,
        this.selectedPackage
      );
    },
  },
});
</script>

<template>
  <div
    class="container max-w-xl mx-auto bg-gray-50 py-12 md:px-16 px-4 text-center rounded"
  >
    <h3 class="font-bold text-3xl my-4 tracking-wide">
      Tell us about yourself
    </h3>
    <div class="form">
      <div
        class="input-group"
        :class="{ error: !!errors.name }"
        data-testid="name"
      >
        <label for="name">
          <span class="label"> Name </span><br />
          <input
            type="text"
            name="name"
            placeholder="Name"
            class="input"
            v-model="name"
            @keyup="validate"
          />
        </label>
        <p v-if="errors.name" class="error-msg">
          {{ errors.name }}
        </p>
      </div>

      <div
        class="input-group"
        :class="{ error: !!errors.age }"
        data-testid="age"
      >
        <label for="age">
          <span class="label"> Age </span><br />
          <input
            type="number"
            min="1"
            max="200"
            name="age"
            placeholder="Age"
            class="input"
            v-model.number="age"
            @keyup="validate"
          />
        </label>
        <p v-if="errors.age" class="error-msg">
          {{ errors.age }}
        </p>
      </div>

      <div class="input-group" data-testid="country">
        <label for="country">
          <span class="label"> Where do you live </span><br />
        </label>
        <div class="select-wrapper">
          <select class="input" v-model="country">
            <option
              v-for="c in countries"
              :key="c.value"
              :selected="country === c.value"
              :value="c.value"
            >
              {{ c.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="input-group" v-for="p in packages" :key="p.value">
        <label :for="p.value">
          <input
            :id="p.value"
            :checked="selectedPackage === p.value"
            type="radio"
            name="package"
            :value="p.value"
            v-model="selectedPackage"
          />
          <span class="label label-radio">{{ getPackageLabel(p) }}</span>
        </label>
      </div>
    </div>

    <div class="bg-gray-600 text-white p-4 rounded" data-testid="final-price">
      <h1 class="font-bold text-xl">
        Your premium is:
        <span v-if="age && !errors.age"
          >{{ finalPrice ? thousandSeparator(finalPrice) : "" }}
          {{ currency }}</span
        >
      </h1>
    </div>

    <div>
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
        @click="onNextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.form {
  @apply text-left w-4/5 md:w-3/5 mx-auto;
}
.label {
  @apply font-light text-gray-800;
}
.input {
  @apply p-2 border-2 border-gray-400 rounded mt-2 w-full;
}
.input-group {
  @apply my-4;
}
.label-radio {
  @apply pl-2 font-normal;
}
select {
  @apply appearance-none;
}
.select-wrapper {
  @apply relative appearance-none mt-2;
}
.select-wrapper::after {
  content: "▼";
  @apply top-1/2 right-4 absolute -translate-y-1/2 pointer-events-none;
}
.select-wrapper .input {
  @apply mt-0;
}
.input-group.error span {
  @apply text-red-500;
}
.input-group.error input {
  @apply border-red-500;
}
p.error-msg {
  @apply text-sm text-red-500 font-light;
}
</style>
