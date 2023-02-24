<template>
  <v-card class="d-inline-flex" width="100%">
    <v-col>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    </v-col>
    <v-icon @click="executeUpdate()">mdi-pencil</v-icon>
    <v-icon @click="executeDelete()" class="ma-6">mdi-close-thick</v-icon>
  </v-card>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {};
  },
  props: ["id", "title", "subtitle", "show", "deleteTodo"],
  methods: {
    executeUpdate() {
      this.show(this.id);
    },
    executeDelete() {
      this.deleteTodo(this.id);
    },
  },
};
</script>
