<template>
  <v-card>
    <p>Todos</p>
    <v-btn @click="showDialog"> Add </v-btn>
    <TodoDialog
      :show="dialog"
      :cancel="cancelDialog"
      :action="saveDialog"
      btnText="Create"
    />
    <div v-for="todo in getTodoList" :key="todo.id">
      {{ todo.text }}
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TodoDialog from "../components/TodoDialog.vue";

export default {
  name: "TodosView",
  components: { TodoDialog },
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
