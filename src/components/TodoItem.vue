<template>
  <v-card class="d-flex justify-center" width="100%" :color="color">
    <v-col>
      <v-card-title>{{ text }}</v-card-title>
      <v-card-subtitle>{{ dueDate }}</v-card-subtitle>
    </v-col>
    <v-icon @click="executeUpdate()" class="my-12">mdi-pencil</v-icon>
    <v-icon @click="executeDelete()" class="my-12 ma-6">mdi-close-thick</v-icon>
  </v-card>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {};
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: true,
    },
    show: {
      type: Function,
      required: true,
    },
    currentTodo: {
      type: Function,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
  },
  methods: {
    //if update icon is clicked execute methods in parent component
    executeUpdate() {
      this.show();
      this.currentTodo(this.id);
    },
    //if delete icon is clicked execute method in parent component
    executeDelete() {
      this.deleteTodo(this.id);
    },
  },
};
</script>
