<template>
  <v-dialog :value="show" width="auto" persistent>
    <v-form class="d-flex justify-center" v-model="isFormValid">
      <v-card class="pa-6">
        <v-card-text>
          <v-card-title class="justify-center">{{ title }} Todo</v-card-title>
          <v-text-field
            v-model="todo.text"
            tabindex="1"
            label="Text"
            placeholder="Text"
            :rules="[rules.required, rules.max]"
            outlined
            color="primary"
          ></v-text-field>
          <v-text-field
            v-model="todo.dueDate"
            tabindex="1"
            label="Due Date"
            placeholder="Due Date"
            :rules="[rules.required, rules.max]"
            outlined
            color="primary"
          ></v-text-field>
          <v-checkbox label="Completed" v-model="todo.completed"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="cancel">
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            :disabled="!isFormValid"
            @click="execute()"
          >
            {{ title }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import Vue from "vue";
export default {
  name: "TodoDialog",
  data() {
    return {
      todo: {
        text: "",
        completed: false,
        dueDate: "",
      },
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
    current: {
      type: Object,
      required: false,
    },
  },
  methods: {
    //execute action in parent
    execute() {
      this.action(this.todo);
    },
  },
  watch: {
    //watching prop current to set inputs for update dialog
    current(newVal) {
      this.todo = Vue.util.extend({}, newVal);
    },
  },
};
</script>
