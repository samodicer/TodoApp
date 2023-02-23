<template>
  <v-form v-model="isFormValid">
    <v-text-field
      v-model="user.email"
      tabindex="1"
      label="Email"
      placeholder="Email"
      :rules="[rules.required]"
      outlined
      color="#26A69A"
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      tabindex="1"
      label="Password"
      placeholder="Password"
      :rules="[rules.required]"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      outlined
      color="#26A69A"
    ></v-text-field>
    <v-btn
      class="white--text"
      tabindex="2"
      color="#26A69A"
      :disabled="!isFormValid"
      @click="login()"
    >
      Login
    </v-btn>
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
