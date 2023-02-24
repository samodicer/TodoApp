<template>
  <v-card class="pa-6" flat>
    <v-switch v-model="toggled" label="CZ" inset></v-switch>
    <p>{{ $t("message") }}</p>
  </v-card>
</template>

<script>
export default {
  name: "TranslateView",
  data() {
    return {
      toggled: false,
    };
  },
  watch: {
    toggled(newVal) {
      if (newVal) {
        this.$i18n.locale = "cz";
      } else {
        this.$i18n.locale = "en";
      }
    },
  },
  mounted() {
    if (this.$i18n.locale == "en") {
      this.toggled = false;
    } else {
      this.toggled = true;
    }
  },
};
</script>
