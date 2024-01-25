<script setup lang="ts">
import { ref } from 'vue';
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

const newIdea = ref('');
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

const addIdea = () => {
  const ideaColumn = board.value.find(column => column.title === 'Idea 💡');
  if (ideaColumn && newIdea.value.trim()) {
    ideaColumn.items.push({
      id: Date.now(), // This should be unique for each item
      text: newIdea.value
    });
    newIdea.value = ''; // Reset the input field after adding the idea
  }
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- Form for adding a new idea -->
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Add New Idea</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="addIdea">
                  <v-text-field label="Idea" v-model="newIdea" required></v-text-field>
                  <v-btn type="submit" color="primary">Add</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Kanban board -->
        <v-row>
          <v-col cols="12" md="3" v-for="(column, columnIndex) in board" :key="columnIndex">
            <v-card class="pa-2" outlined>
              <v-card-title>{{ column.title }}</v-card-title>
              <draggable class="drag-area" v-model="column.items" group="items">
                <template #item="{ element }">
                  <div :key="element.id" class="pa-2">{{ element.text }}</div>
                </template>
              </draggable>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>
.drag-area {
  min-height: 100px;
  background-color: #F5F5F5;
  padding: 10px 0;
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
