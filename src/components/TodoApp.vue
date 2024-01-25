<script setup lang="ts">
import { ref } from 'vue';

interface Note {
  title: string;
  content: string;
}

const newNote = ref<Note>({ title: '', content: '' });
const notes = ref<Note[]>([]);

const addNote = () => {
  if (newNote.value.title && newNote.value.content) {
    notes.value.push({ ...newNote.value });
    newNote.value.title = '';
    newNote.value.content = '';
  }
};

const editNote = (index: number) => {
  // Logic for editing a note
  // For example, you might want to open a dialog here
};

const deleteNote = (index: number) => {
  notes.value.splice(index, 1);
};
</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Add New</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="addNote">
                  <v-text-field label="Title" v-model="newNote.title" required></v-text-field>
                  <v-textarea label="เนื้อหา" v-model="newNote.content" rows="4" required></v-textarea>
                  <v-btn type="submit" color="primary">Add</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" v-for="(note, index) in notes" :key="index">
            <v-card>
              <v-card-title>{{ note.title }}</v-card-title>
              <v-card-text>{{ note.content }}</v-card-text>
              <v-card-actions>
                <v-btn color="blue" @click="editNote(index)">Edit</v-btn>
                <v-btn color="red" @click="deleteNote(index)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>
/* สไตล์ CSS ตามต้องการ */
</style>
