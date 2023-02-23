import { API } from "../../api";
import axios from "axios";

const state = {
  authToken: "",
};

const getters = {
  getAuthToken: (state) => state.authToken,
};

const actions = {
  async userLogin({ commit }, user) {
    return new Promise((resolve, reject) => {
      console.log("user:" + user.email + " " + user.password);
      axios({
        method: "post",
        url: API + `/login`,
        headers: {
          "X-TenantID": "dicerproject",
        },
        data: {
          email: user.email,
          password: user.password,
        },
      })
        .then((response) => {
          console.log(response);
          commit("setAuthToken", response.headers.authorization);
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
  setAuthToken: (state, token) => {
    state.authToken = token;
    localStorage.setItem("authToken", token);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
