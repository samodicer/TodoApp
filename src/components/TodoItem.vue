<template>
  <v-card class="d-inline-flex" width="100%">
    <v-col>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    </v-col>
    <v-icon class>mdi-pencil</v-icon>
    <v-icon class="ma-6">mdi-close-thick</v-icon>
  </v-card>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {};
  },
  props: ["id", "title", "subtitle"],
};
</script>
