<template>
  <v-card>
    {{ text }}
  </v-card>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {};
  },
  props: ["text"],
};
</script>
