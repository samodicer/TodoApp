<template>
  <v-dialog :value="show" width="auto" persistent>
    <v-form class="d-flex justify-center" v-model="isFormValid">
      <v-card class="pa-6" width="600">
        <v-card-text>
          <v-card-title class="justify-center">{{ title }}</v-card-title>
          <v-text-field
            v-model="dialogModel.input1"
            tabindex="1"
            :label="firstinput"
            :placeholder="firstinput"
            :rules="[rules.required, rules.max]"
            outlined
            color="primary"
          ></v-text-field>
          <v-text-field
            v-model="dialogModel.input2"
            tabindex="1"
            :label="secondinput"
            :placeholder="secondinput"
            :rules="[rules.required, rules.max]"
            outlined
            color="primary"
          ></v-text-field>
          <v-checkbox
            :label="checkbox"
            v-model="dialogModel.checkbox"
          ></v-checkbox>
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
      dialogModel: {
        input1: "",
        input2: "",
        checkbox: false,
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
    title: {
      type: String,
      required: true,
    },
    firstinput: {
      type: String,
      required: true,
    },
    secondinput: {
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
    current: {
      type: Object,
      required: false,
    },
  },
  methods: {
    //execute action in parent
    execute() {
      this.action(this.dialogModel);
    },
  },
  watch: {
    //watching prop current to set inputs for update dialog
    current(newVal) {
      this.dialogModel = newVal;
    },
  },
};
</script>
