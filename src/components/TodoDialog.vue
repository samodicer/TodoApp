<template>
  <v-dialog :value="show" width="auto">
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="todo.text"
          tabindex="1"
          label="Text"
          placeholder="Text"
          :rules="[rules.required]"
          outlined
          color="#26A69A"
        ></v-text-field>
        <v-text-field
          v-model="todo.dueDate"
          tabindex="1"
          label="Date"
          placeholder="Date"
          :rules="[rules.required]"
          outlined
          color="#26A69A"
        ></v-text-field>
        <v-checkbox label="Completed" v-model="todo.completed"></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="cancel">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="execute()">
          {{ btnText }}
        </v-btn>
      </v-card-actions>
    </v-card>
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
        dueDate: "2022-03-28",
      },
      dialog: true,
      isFormValid: false,
      rules: {
        required: (value) => !!value || "This field is required",
      },
    };
  },
  props: ["show", "cancel", "action", "btnText"],
  methods: {
    execute() {
      this.action(this.todo);
    },
  },
};
</script>
