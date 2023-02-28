<template>
  <v-card class="pa-6" flat>
    <v-card-title class="d-flex justify-center">TODO LIST</v-card-title>
    <v-icon color="primary" size="52" @click="showAddDialog"
      >mdi-plus-circle</v-icon
    >
    <v-select
      class="mt-6"
      v-model="selectedFilter"
      label="Filter Todos"
      :items="filters"
    ></v-select>
    <TodoDialog
      :show="addDialog"
      :cancel="cancelAddDialog"
      :action="saveAddDialog"
      title="Create Todo"
      firstinput="Text"
      secondinput="Due Date"
      checkbox="Completed"
      btntext="Create"
    />
    <TodoDialog
      :show="editDialog"
      :cancel="cancelEditDialog"
      :action="saveEditDialog"
      :current="currentTodo"
      title="Update Todo"
      firstinput="Text"
      secondinput="Due Date"
      checkbox="Completed"
      btntext="Update"
    />
    <div class="my-4" v-for="todo in filteredTodoList" :key="todo.id">
      <TodoItem
        :id="todo.id"
        :text="todo.text"
        :dueDate="todo.dueDate"
        :color="todo.completed ? '#C8E6C9' : '#FFCDD2'"
        :show="showEditDialog"
        :currentTodo="setCurrentTodo"
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
import Vue from "vue";

export default {
  name: "TodosView",
  components: { TodoDialog, TodoItem },
  data() {
    return {
      todoList: [],
      currentTodo: {
        id: -1,
        text: "",
        completed: false,
        dueDate: "",
      },
      addDialog: false,
      editDialog: false,
      filters: ["All", "Done", "Undone"],
      selectedFilter: "All",
    };
  },
  computed: {
    filteredTodoList() {
      //if selected value is All do not apply filter
      if (this.selectedFilter == "All") {
        return this.todoList;
      } else {
        //if selected value is Done filter completed todos
        //if its Undone filter uncompleted todos
        return this.todoList.filter((todo) => {
          if (this.selectedFilter == "Done") {
            return todo.completed == true;
          } else if (this.selectedFilter == "Undone") {
            return todo.completed == false;
          }
        });
      }
    },
  },
  methods: {
    //method to show add todo dialog
    showAddDialog() {
      this.addDialog = true;
    },
    //method to cancel add todo dialog
    cancelAddDialog() {
      this.addDialog = false;
    },
    //trigger call to create todo endpoint
    saveAddDialog(todo) {
      this.createTodo(todo).then(() => {
        //if its done fetch todos again and cancel dialog
        this.fetchTodoList();
        this.cancelAddDialog();
      });
    },
    //method to show edit todo dialog
    showEditDialog() {
      this.editDialog = true;
    },
    //method to cancel edit todo dialog
    cancelEditDialog() {
      this.editDialog = false;
    },
    //method to set current todo for update dialog
    setCurrentTodo(id) {
      this.currentTodo = Vue.util.extend(
        {},
        this.todoList.find((todo) => todo.id == id)
      );
    },
    //trigger call to update todo endpoint
    saveEditDialog(todo) {
      //set id of todo
      todo.id = this.currentTodo.id;
      this.updateTodo(todo).then(() => {
        //if its done fetch todos again and cancel dialog
        this.fetchTodoList();
        this.cancelEditDialog();
      });
    },
    //trigger call to delete todo endpoint
    deleteClickedTodo(id) {
      this.deleteTodo(id).then(() => {
        //if its done fetch todos again and cancel dialog
        this.fetchTodoList();
      });
    },
    //async calls to API
    async fetchTodoList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: API + `/todolist`,
          headers: {
            //get token from local storage
            Authorization: localStorage.getItem("authToken"),
            "X-TenantID": "dicerproject",
          },
        })
          .then((response) => {
            console.log(response);
            //if request is successful set todo list from repsonse data
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
            //get token from local storage
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
            //get token from local storage
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
            //get token from local storage
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
    //fetch todo list on mount
    this.fetchTodoList();
  },
};
</script>
