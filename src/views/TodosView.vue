<template>
  <v-card class="pa-6" flat>
    <v-card-title class="d-flex justify-center">TODO LIST</v-card-title>
    <v-icon color="primary" size="52" @click="showAddDialog"
      >mdi-plus-circle</v-icon
    >
    <TodoDialog
      :show="addDialog"
      :cancel="cancelAddDialog"
      :action="saveAddDialog"
      title="Create"
    />
    <TodoDialog
      :show="editDialog"
      :cancel="cancelEditDialog"
      :action="saveEditDialog"
      title="Update"
    />
    <div class="my-4" v-for="todo in getTodoList" :key="todo.id">
      <TodoItem
        :id="todo.id"
        :title="todo.text"
        :subtitle="todo.dueDate"
        :show="showEditDialog"
        :deleteTodo="deleteClickedTodo"
      />
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TodoDialog from "../components/TodoDialog.vue";
import TodoItem from "../components/TodoItem.vue";

export default {
  name: "TodosView",
  components: { TodoDialog, TodoItem },
  data() {
    return {
      addDialog: false,
      editDialog: false,
      clickedTodo: -1,
    };
  },
  computed: {
    ...mapGetters({
      getTodoList: "todos/getTodoList",
    }),
  },
  methods: {
    ...mapActions({
      fetchTodoList: "todos/fetchTodoList",
      createTodo: "todos/createTodo",
      updateTodo: "todos/updateTodo",
      deleteTodo: "todos/deleteTodo",
    }),
    showAddDialog() {
      this.addDialog = true;
    },
    cancelAddDialog() {
      this.addDialog = false;
    },
    saveAddDialog(todo) {
      this.createTodo(todo).then(() => {
        this.fetchTodoList(localStorage.getItem("authToken"));
        this.cancelAddDialog();
      });
    },
    showEditDialog(id) {
      this.editDialog = true;
      this.clickedTodo = id;
    },
    cancelEditDialog() {
      this.editDialog = false;
    },
    saveEditDialog(todo) {
      todo.id = this.clickedTodo;
      this.updateTodo(todo).then(() => {
        this.fetchTodoList(localStorage.getItem("authToken"));
        this.cancelEditDialog();
      });
    },
    deleteClickedTodo(id) {
      this.deleteTodo(id).then(() => {
        this.fetchTodoList(localStorage.getItem("authToken"));
        this.cancelEditDialog();
      });
    },
  },
  mounted() {
    this.fetchTodoList(localStorage.getItem("authToken"));
  },
};
</script>
