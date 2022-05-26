<script setup lang="ts">
import type { InsuranceFormData } from "./types/insurance-form";
import { Page } from "./enums/pages";
</script>

<script lang="ts">
import { defineComponent } from "vue";
import FirstPage from "./components/FirstPage.vue";
import SecondPage from "./components/SecondPage.vue";
import ThirdPage from "./components/ThirdPage.vue";
import ErrorPage from "./components/ErrorPage.vue";

type Data = {
  page: Page;
  form: InsuranceFormData | null;
};

export default defineComponent({
  components: {
    FirstPage,
    SecondPage,
    ThirdPage,
    ErrorPage,
  },
  data(): Data {
    return {
      page: Page.First,
      form: null,
    };
  },
  methods: {
    goToFirst() {
      this.page = Page.First;
    },
    goToSecond() {
      this.page = Page.Second;
    },
    goToThird(data: InsuranceFormData) {
      if (data.age > 100) {
        this.page = Page.Error;
        return;
      }

      this.page = Page.Third;
      this.form = data;
    },
  },
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <FirstPage v-if="page === Page.First" @next-page="goToSecond" />
    <SecondPage
      v-if="page >= Page.Second"
      v-show="page === Page.Second"
      @next-page="goToThird"
      @back="goToFirst"
    />
    <ThirdPage
      v-if="page >= Page.Third && form"
      v-show="page === Page.Third"
      @next-page="goToFirst"
      @back="goToSecond"
      :form="form"
    />
    <ErrorPage v-if="page === Page.Error" @back="goToFirst" />
  </div>
</template>

<style></style>
