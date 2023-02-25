<template>
  <v-form class="d-flex justify-center pa-6" v-model="isFormValid">
    <v-card flat width="600">
      <div v-if="isAuth" class="text-center">
        <v-card-title class="justify-center">You are logged in.</v-card-title>
        <v-icon color="primary" size="52" @click="logout()">mdi-logout</v-icon>
      </div>
      <div v-else>
        <v-card-title class="justify-center">LOGIN</v-card-title>
        <v-text-field
          v-model="user.email"
          tabindex="1"
          label="Email"
          placeholder="Email"
          :rules="[rules.required, rules.max]"
          outlined
          color="primary"
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          tabindex="1"
          label="Password"
          placeholder="Password"
          :rules="[rules.required, rules.max]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          outlined
          color="primary"
        ></v-text-field>
        <div class="text-center">
          <v-btn
            class="justify-center"
            tabindex="2"
            color="primary"
            :disabled="!isFormValid"
            @click="login()"
          >
            Login
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import { API } from "../api";
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      isAuth: false,
      user: {
        email: "",
        password: "",
      },
      showPassword: false,
      isFormValid: false,
      rules: {
        required: (value) => !!value || "This field is required",
        max: (value) => value.length <= 255 || "Max 255 characters",
      },
    };
  },
  methods: {
    async login() {
      await new Promise((resolve, reject) => {
        console.log("user:" + this.user.email + " " + this.user.password);
        axios({
          method: "post",
          url: API + `/login`,
          headers: {
            "X-TenantID": "dicerproject",
          },
          data: {
            email: this.user.email,
            password: this.user.password,
          },
        })
          .then((response) => {
            console.log(response);
            localStorage.setItem("authToken", response.headers.authorization);
            this.isAuth = true;
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
      this.$router.push({ name: "todos" });
    },
    checkToken() {
      return localStorage.getItem("authToken") != null
        ? (this.isAuth = true)
        : (this.isAuth = false);
    },
    logout() {
      localStorage.removeItem("authToken");
      this.isAuth = false;
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>
