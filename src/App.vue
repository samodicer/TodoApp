<template>
  <v-app style="background: grey">
    <v-app-bar flat app>
      <v-container class="py-0 fill-height">
        <v-icon color="primary" size="32">mdi-calendar-clock</v-icon>
        <p class="mb-0 ml-2 font-weight-bold">TODO App</p>
        <v-spacer></v-spacer>
        <v-switch class="mt-4" v-model="toggled" label="CZ"></v-switch>
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
    toggled: false,
  }),
  methods: {
    //redirection on clicked route
    navigate(route) {
      //it will not trigger if redirecting to current route
      if (this.$route.path != route) {
        this.$router.push(route).catch((e) => e);
      }
    },
  },
  watch: {
    //watching for language switch
    toggled(newVal) {
      //set locale value based on switch off/on
      newVal ? (this.$i18n.locale = "cz") : (this.$i18n.locale = "en");
    },
  },
  mounted() {
    //set switch on mount based on locale value
    this.$i18n.locale == "en" ? (this.toggled = false) : (this.toggled = true);
  },
};
</script>
