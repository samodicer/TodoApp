<template>
  <v-card class="d-flex-direction-column justify-center pa-6" flat>
    <div class="text-center">
      <v-icon size="72">mdi-alert-octagram</v-icon>
    </div>
    <v-card-title class="justify-center text-h4">ERROR</v-card-title>
    <v-card-text class="text-center text-h5">Access denied</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ErrorView",
  data() {
    return {};
  },
};
</script>
