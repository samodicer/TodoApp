<template>
  <v-card class="pa-6" flat>
    <p>Todos</p>
    <v-btn @click="showDialog"> Add </v-btn>
    <TodoDialog
      :show="dialog"
      :cancel="cancelDialog"
      :action="saveDialog"
      btnText="Create"
    />
    <div class="my-4" v-for="todo in getTodoList" :key="todo.id">
      <TodoItem :id="todo.id" :title="todo.text" :subtitle="todo.dueDate" />
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
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      getAuthToken: "user/getAuthToken",
      getTodoList: "todos/getTodoList",
    }),
  },
  methods: {
    ...mapActions({
      fetchTodoList: "todos/fetchTodoList",
      createTodo: "todos/createTodo",
    }),
    showDialog() {
      this.dialog = true;
    },
    cancelDialog() {
      this.dialog = false;
    },
    saveDialog(todo) {
      this.createTodo(todo).then(() => {
        this.fetchTodoList(this.getAuthToken);
        this.cancelDialog();
      });
    },
  },
  mounted() {
    this.fetchTodoList(this.getAuthToken);
  },
};
</script>
