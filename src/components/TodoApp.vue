<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';

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
          <v-col cols="12">
            <v-card class="text-center mx-auto" style="max-width: 500px;">
              <v-card-title>Add New Idea</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="addIdea">
                  <v-text-field label="Idea" v-model="newIdea" required outlined class="mx-auto my-4"
                    style="max-width: 400px;"></v-text-field>
                  <v-btn type="submit" class="styled-button mx-auto">Add Idea</v-btn>
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
.v-container {
  padding-top: 20px;
  background-color: #FFF6F6;
}




/* ตั้งค่าสำหรับการ์ด */
.v-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  overflow: hidden;
}

/* ตั้งค่าหัวข้อการ์ด */
.v-card-title {
  background-color: #F875AA;
  /* สีสันหลักของเว็บแอป */
  color: white;
  padding: 12px 24px;
  font-size: 1.25rem;
  border-radius: 6px;
}

/* ตั้งค่าขอบเขตลาก (Draggable Area) */
.drag-area {
  padding: 10px;
  min-height: 100px;
  transition: background-color 0.3s ease;
  background-color: white;
  border-radius: 6px;
}

/* ตั้งค่าสไตล์สำหรับแต่ละไอเท็มในขอบเขตลาก */
.drag-area>div {
  background-color: #BBDEFB;
  border: 1px solid #90CAF9;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 4px;
  transition: box-shadow 0.2s ease-in-out;
}

/* หากไอเท็มถูกโฮเวอร์, จะเปลี่ยนเป็นเงา */
.drag-area>div:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.10);
}

.styled-button {
  background-image: linear-gradient(to right, #FF85B3, #FF5788);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
}

.styled-button::after {
  content: '\2713';
  margin-left: 10px;
  font-size: 18px;
}

.styled-button:hover {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.styled-button:active {
  transform: translateY(1px);
}

.styled-button:hover::after {
  transform: scale(1.2);
}

/* Custom style for the outlined text field */
.v-text-field--outlined .v-input__control .v-input__slot {
  border: 2px solid #E91E63;
  /* Custom border color */
}

/* Custom styles for the v-text-field focused state */
.v-text-field--outlined.v-input--is-focused .v-input__control .v-input__slot {
  border-color: #C2185B;
  /* Darker border color for focused state */
}
</style>
