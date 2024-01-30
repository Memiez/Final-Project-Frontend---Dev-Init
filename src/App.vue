<script setup lang="ts">
import { ref } from 'vue';
import TodoApp from './components/TodoApp.vue';
import Calendar from './components/Calendar.vue';
import draggable from 'vuedraggable';
import { VCol, VContainer, VCard, VCardTitle, VRow } from 'vuetify/components';


interface Item {
  id: number;
  text: string;
}

interface Column {
  title: string;
  items: Item[];
}


const drawer = ref(true);
const rail = ref(true);
const board = ref<Column[]>([
  {
    title: 'Idea 💡',
    items: [{ id: 1, text: 'Migrate codebase to TypeScript' }],
  },
  {
    title: 'Todo 📋',
    items: [
      { id: 2, text: 'Dockerize App' },
      { id: 3, text: 'Add vue draggable to project' },
    ],
  },
  {
    title: 'In Progress 🚧',
    items: [{ id: 4, text: 'Implement Web3 Features' }],
  },
  {
    title: 'Ready to go 🚀',
    items: [{ id: 5, text: 'Bump to vite js' }],
  },
]);
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item
          prepend-avatar="https://media.allure.com/photos/6127a91ac2052c31747415dd/1:1/w_2323,h_2323,c_limit/blackpink%20lisa%20gold%20background.jpg"
          title="Lisa" nav>
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
        <v-container class="main-color">
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
                <!-- col 2 -->
                <v-app>
                  <!-- ส่วนอื่นๆ ของเทมเพลต -->
                  <v-card>
                    <!-- เพิ่ม TodoApp.vue ที่นี่ -->
                    <TodoApp />
                  </v-card>
                  <!-- ส่วนอื่นๆ ของเทมเพลต -->
                </v-app>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-container>
              <v-row>
                <v-col cols="12" md="3" v-for="(column, index) in board" :key="index">
                  <v-card class="pa-2" outlined>
                    <v-card-title v-text="column.title" />
                    <draggable v-model="column.items" group="items" class="drag-area" item-key="id">
                      <template #item="{ element }">
                        <div :key="element.id" class="pa-2">
                          {{ element.text }}
                        </div>
                      </template>
                    </draggable>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
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


<style scoped>
.v-container {
  padding-top: 20px;
  background-color: #FFF6F6;
}

.main-color {
  min-height: 100px;
  padding: 10px;
  border: 1px solid transparent;
  background-color: #F875AA;
  transition: background-color 0.3s ease;
}

.drag-area {
  min-height: 100px;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.drag-area>div {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #AEDEFC;
  border: 1px solid transparent;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.drag-area>div:hover {
  border-color: #9e9e9e;
}
</style>

