<template>
  <v-dialog :value="show" width="auto" persistent>
    <v-form class="d-flex justify-center" v-model="isFormValid" ref="form">
      <v-card class="pa-6" width="600">
        <v-card-text>
          <v-card-title class="justify-center">{{ title }}</v-card-title>
          <v-text-field
            v-model="todo.text"
            tabindex="1"
            :label="input1"
            :placeholder="input1"
            :rules="[rules.required, rules.max]"
            outlined
            color="primary"
          ></v-text-field>
          <div @click="showPicker = true">
            <v-text-field
              v-model="todo.dueDate"
              tabindex="1"
              :label="input2"
              :placeholder="input2"
              :rules="[rules.required, rules.max]"
              outlined
              color="primary"
            ></v-text-field>
          </div>
          <v-dialog width="300" v-model="showPicker">
            <v-date-picker v-model="todo.dueDate" reactive></v-date-picker>
            <v-btn color="primary" @click="showPicker = false"> OK </v-btn>
          </v-dialog>
          <v-checkbox :label="checkbox" v-model="todo.completed"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="executeCancel()"> Close </v-btn>
          <v-btn :disabled="!isFormValid" @click="executeAction()">
            {{ btntext }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: "TodoDialog",
  data() {
    return {
      todo: {
        text: "",
        completed: false,
        dueDate: "",
      },
      picker: "",
      showPicker: false,
      dialog: true,
      isFormValid: false,
      rules: {
        //checking if value is empty
        required: (value) => !!value || "This field is required",
        //checking if value has more than 255 chars
        max: (value) => value?.length <= 255 || "Max 255 characters",
      },
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    cancel: {
      type: Function,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    input1: {
      type: String,
      required: true,
    },
    input2: {
      type: String,
      required: true,
    },
    checkbox: {
      type: String,
      required: false,
    },
    btntext: {
      type: String,
      required: true,
    },
    current: {
      type: Object,
      required: false,
    },
  },
  methods: {
    //execute action in parent
    executeAction() {
      this.action(this.todo);
      this.$refs.form.reset();
    },
    executeCancel() {
      this.cancel();
      this.$refs.form.reset();
    },
  },
  watch: {
    //watching prop current to set inputs for update dialog
    current(newVal) {
      this.todo = newVal;
    },
  },
};
</script>
