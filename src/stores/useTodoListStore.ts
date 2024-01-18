import { defineStore } from "pinia";
import { ref } from "vue";

interface ToDoItem {
  item: string;
  id: number;
  completed: boolean;
}

export const useTodoListStore = defineStore("todoList", () => {
  const todoList = ref<ToDoItem[]>([])
  const id = ref(0)
  const showAlert = ref(false)
  function addTodo(item: string) {
   todoList.value.push({ item, id:id.value++, completed: false });
  }
  function deleteTodo(itemID: number) {
   todoList.value =todoList.value.filter((object) => {
      return object.id !== itemID;
    });
  }
  function toggleCompleted(idToFind: number) {
    const todo =todoList.value.find((obj) => obj.id === idToFind);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
  function inputAlert() {
   showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 1000);
  }
  return { todoList, id, showAlert, addTodo, deleteTodo, toggleCompleted, inputAlert }
});

// state: () => ({
//   todoList: [] as ToDoItem[],
//   id: 0,
//   showAlert: false,
// }),
// actions: {
//   addTodo(item: string) {
//    todoList.push({ item, id:id++, completed: false });
//   },
//   deleteTodo(itemID: number) {
//    todoList =todoList.filter((object) => {
//       return object.id !== itemID;
//     });
//   },
//   toggleCompleted(idToFind: number) {
//     const todo =todoList.find((obj) => obj.id === idToFind);
//     if (todo) {
//       todo.completed = !todo.completed;
//     }
//   },
//   inputAlert() {
//    showAlert = true;
//     setTimeout(() => {
//      showAlert = false;
//     }, 1000);
//   },
// },