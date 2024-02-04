<script setup lang="ts">
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '../firebase';


interface Item {
  id: string;
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
    items: [],
  },
  {
    title: 'Todo 📋',
    items: [],
  },
  {
    title: 'In Progress 🚧',
    items: [],
  },
  {
    title: 'Ready to go 🚀',
    items: [],
  },
]);

// ดึงข้อมูลจาก Firestore และเตรียม board
onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "ideas"));
  querySnapshot.forEach((doc) => {
    const data = doc.data() as Item;
    const column = board.value.find(column => column.title === data.column);
    if (column) {
      column.items.push({ id: doc.id, ...data });
    }
  });
});

// ฟังก์ชันเพิ่ม idea ใหม่
const addIdea = async () => {
  if (newIdea.value.trim()) {
    try {
      const docRef = await addDoc(collection(db, "ideas"), {
        text: newIdea.value,
        column: 'Idea 💡' // กำหนดค่าเริ่มต้นสำหรับ field column
      });
      const ideaColumn = board.value.find(column => column.title === 'Idea 💡');
      if (ideaColumn) {
        ideaColumn.items.push({ id: docRef.id, text: newIdea.value });
      }
      newIdea.value = '';
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};


// ฟังก์ชันลบ idea
const deleteItem = async (columnIndex: number, item: Item) => {
  try {
    await deleteDoc(doc(db, "ideas", item.id));
    board.value[columnIndex].items = board.value[columnIndex].items.filter(i => i.id !== item.id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

// ฟังก์ชันแก้ไข idea
const editItem = async (columnIndex: number, item: Item, newText: string) => {
  try {
    const ideaRef = doc(db, "ideas", item.id);
    await updateDoc(ideaRef, { text: newText });
    item.text = newText; // อัปเดตใน local state
  } catch (e) {
    console.error("Error updating document: ", e);
  };

  const onDragEnd = async (event) => {
    console.log(event);
    // ดึงข้อมูลจาก event (ตรวจสอบว่าข้อมูลเหล่านี้ถูกส่งมาจาก draggable correctly)
    const { movedElementId, fromColumnTitle, toColumnTitle } = event;

    // อัปเดต Firestore
    const itemRef = doc(db, "ideas", movedElementId);
    await updateDoc(itemRef, {
      column: toColumnTitle // อัปเดตค่าของ field column ใน Firestore
    });

    // อัปเดต state ใน Vue
    // หา item ในคอลัมน์เริ่มต้นและนำออก
    const fromColumn = board.value.find(column => column.title === fromColumnTitle);
    const itemIndex = fromColumn.items.findIndex(item => item.id === movedElementId);
    const [movedItem] = fromColumn.items.splice(itemIndex, 1);

    // เพิ่ม item ในคอลัมน์ปลายทาง
    const toColumn = board.value.find(column => column.title === toColumnTitle);
    toColumn.items.push(movedItem);
  };

};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
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
              <v-banner>
                <draggable class="drag-area" v-model="column.items" group="items" @end="onDragEnd">
                  <template #item="{ element, index }">
                    <div :key="element.id" class="pa-2 d-flex justify-space-between align-center">
                      {{ element.text }}
                      <span>
                        <!-- Edit Button -->
                        <v-btn variant="text" size="x-small" icon small @click="editItem(columnIndex, index)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <!-- Delete Button -->
                        <v-btn variant="text" size="x-small" icon small @click="deleteItem(columnIndex, index)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </span>
                    </div>
                  </template>
                </draggable>
              </v-banner>
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
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;
  overflow-wrap: break-word;
  word-break: break-word;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Styles for the buttons inside the draggable area */
.drag-area .v-btn {
  margin-left: 4px;
}

/* Styles for the icon buttons */
.drag-area .v-icon {
  color: #424242;
}

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
