import { API } from "../../api";
import axios from "axios";

const state = {
  todoList: [],
};

const getters = {
  getTodoList: (state) => state.todoList,
};

const actions = {
  async fetchTodoList({ commit }, token) {
    return new Promise((resolve, reject) => {
      console.log("fetching todo");
      axios({
        method: "get",
        url: API + `/todolist`,
        headers: {
          Authorization: token,
          "X-TenantID": "dicerproject",
        },
      })
        .then((response) => {
          console.log(response);
          commit("setTodoList", response.data);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  async createTodo({ commit }, todo) {
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
          commit("");
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  async updateTodo({ commit }, todo) {
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
          commit("");
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  async deleteTodo({ commit }, id) {
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
          commit("");
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};

const mutations = {
  setTodoList: (state, todos) => {
    state.todoList = todos;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
