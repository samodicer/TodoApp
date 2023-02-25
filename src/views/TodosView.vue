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
      :current="currentTodo"
      title="Update"
    />
    <div class="my-4" v-for="todo in todoList" :key="todo.id">
      <TodoItem
        :id="todo.id"
        :text="todo.text"
        :dueDate="todo.dueDate"
        :color="todo.completed ? '#C8E6C9' : '#FFCDD2'"
        :show="showEditDialog"
        :deleteTodo="deleteClickedTodo"
      />
    </div>
  </v-card>
</template>

<script>
import TodoDialog from "../components/TodoDialog.vue";
import TodoItem from "../components/TodoItem.vue";
import { API } from "../api";
import axios from "axios";

export default {
  name: "TodosView",
  components: { TodoDialog, TodoItem },
  data() {
    return {
      todoList: {},
      currentTodo: {
        id: -1,
        text: "",
        completed: false,
        dueDate: "",
      },
      addDialog: false,
      editDialog: false,
    };
  },
  methods: {
    showAddDialog() {
      this.addDialog = true;
    },
    cancelAddDialog() {
      this.addDialog = false;
    },
    saveAddDialog(todo) {
      this.createTodo(todo).then(() => {
        this.fetchTodoList();
        this.cancelAddDialog();
      });
    },
    showEditDialog(id) {
      this.editDialog = true;
      this.currentTodo = this.todoList.find((todo) => todo.id === id);
    },
    cancelEditDialog() {
      this.editDialog = false;
    },
    saveEditDialog(todo) {
      todo.id = this.currentTodo.id;
      this.updateTodo(todo).then(() => {
        this.fetchTodoList();
        this.cancelEditDialog();
      });
    },
    deleteClickedTodo(id) {
      this.deleteTodo(id).then(() => {
        this.fetchTodoList();
        this.cancelEditDialog();
      });
    },
    async fetchTodoList() {
      return new Promise((resolve, reject) => {
        console.log("fetching todo list");
        axios({
          method: "get",
          url: API + `/todolist`,
          headers: {
            Authorization: localStorage.getItem("authToken"),
            "X-TenantID": "dicerproject",
          },
        })
          .then((response) => {
            console.log(response);
            this.todoList = response.data;
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async createTodo(todo) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: API + `/todolist`,
          headers: {
            Authorization: localStorage.getItem("authToken"),
            "X-TenantID": "dicerproject",
          },
          data: {
            text: todo.text,
            completed: todo.completed,
            dueDate: todo.dueDate,
          },
        })
          .then((response) => {
            console.log(response);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async updateTodo(todo) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: API + `/todolist/` + todo.id,
          headers: {
            Authorization: localStorage.getItem("authToken"),
            "X-TenantID": "dicerproject",
          },
          data: {
            text: todo.text,
            completed: todo.completed,
            dueDate: todo.dueDate,
          },
        })
          .then((response) => {
            console.log(response);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async deleteTodo(id) {
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: API + `/todolist/` + id,
          headers: {
            Authorization: localStorage.getItem("authToken"),
            "X-TenantID": "dicerproject",
          },
        })
          .then((response) => {
            console.log(response);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
  },
  mounted() {
    this.fetchTodoList();
  },
};
</script>
