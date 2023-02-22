<template>
  <v-app class="bg">
    <v-app-bar flat app>
      <v-container class="fill-height d-flex align-center">
        <v-avatar class="me-10 ms-4" color="grey" size="32"></v-avatar>
        <v-spacer></v-spacer>
        Meno
      </v-container>
    </v-app-bar>
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-title> List Item {{ n }} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet min-height="80vh" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
      min-height="10vh"
      class="bg-indigo-lighten-1 text-center d-flex flex-column"
    >
      <p>Footer</p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
  }),
};
</script>

<style scoped>
.bg {
  background-color: grey;
}
</style>
