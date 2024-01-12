<script lang="ts">
import { defineComponent } from 'vue'
import vuetify from './plugins/vuetify'
import TodoApp from './components/TodoApp.vue'

export default {
  name: "App",

  components: {
    TodoApp
  },


  data() {
    return {
      drawer: true,
      rail: true,
    }
  },
}

</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="Lisa" nav>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar title="Application bar"></v-app-bar>
      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <v-container class="bg-light-blue">
          <v-row no-gutters>
            <v-col cols="auto">
              <v-sheet class="pa-2 ma-2">
                <!-- col 1 -->
                <v-container>
                  <v-row justify="space-around">
                    <v-date-picker elevation="24"></v-date-picker>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="pa-2 ma-2">
                .v-col-auto
                <v-app>
                  <!-- ส่วนอื่นๆ ของเทมเพลต -->
                  <v-card>
                    <!-- เพิ่ม TodoApp.vue ที่นี่ -->
                    <todo-app></todo-app>
                  </v-card>
                  <!-- ส่วนอื่นๆ ของเทมเพลต -->
                </v-app>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col>
              <v-sheet class="pa-2 ma-2">
                .v-col-auto
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="pa-2 ma-2">
                .v-col-auto
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="pa-2 ma-2">
                .v-col-auto
              </v-sheet>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="2">
              <v-sheet class="pa-2 ma-2">
                .v-col-2
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="pa-2 ma-2">
                .v-col-auto
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

      </v-main>
    </v-layout>
  </v-card>
</template>


