<template>
  <div class="d-flex justify-center pa-6">
    <v-card max-width="800" flat>
      <v-card-title class="justify-center text-h4">{{
        $t("vue_title")
      }}</v-card-title>
      <v-card-text class="text-center text-h5">{{
        $t("vue_text")
      }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TranslateView",
  data() {
    return {};
  },
};
</script>
