<template>
  <v-app style="background: grey">
    <v-app-bar flat app>
      <v-container class="fill-height d-flex align-center">
        <v-avatar class="me-10 ms-4" color="grey" size="32"></v-avatar>
        <v-spacer></v-spacer>
        Meno
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded>
              <v-list rounded>
                <div v-for="(page, index) in pages" :key="index">
                  <v-list-item @click="navigate(page.route)" link>
                    <v-list-item-title>
                      {{ page.title }}
                    </v-list-item-title>
                  </v-list-item>
                </div>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet min-height="80vh" rounded>
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer min-height="10vh" class="text-center d-flex flex-column">
      <p>TODO App - Samuel Dicer - 2023</p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    pages: [
      { title: "Login", route: "/" },
      { title: "Todos", route: "/todos" },
      { title: "Translate", route: "/translate" },
    ],
  }),
  methods: {
    navigate(route) {
      if (this.$route.path != route) {
        this.$router.push(route);
      }
    },
  },
};
</script>
