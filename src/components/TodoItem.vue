<template>
  <v-card class="d-flex justify-center" width="100%" :color="color">
    <v-col>
      <v-card-title>{{ text }}</v-card-title>
      <v-card-subtitle>{{ dueDate }}</v-card-subtitle>
    </v-col>
    <v-icon @click="executeUpdate()">mdi-pencil</v-icon>
    <v-icon @click="executeDelete()" class="mr-6">mdi-close-thick</v-icon>
  </v-card>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {};
  },
  props: ["id", "text", "dueDate", "color", "show", "deleteTodo"],
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
