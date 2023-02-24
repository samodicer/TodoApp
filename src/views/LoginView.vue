<template>
  <v-form class="d-flex justify-center pa-6" v-model="isFormValid">
    <v-card flat width="600">
      <v-card-title class="d-flex justify-center">LOGIN</v-card-title>
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
      <v-btn
        class="white--text"
        tabindex="2"
        color="primary"
        :disabled="!isFormValid"
        @click="login()"
      >
        Login
      </v-btn>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
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
    ...mapActions({
      userLogin: "user/userLogin",
    }),
    login() {
      this.userLogin(this.user).then(() => {
        this.$router.push({ name: "todos" });
      });
    },
  },
};
</script>
