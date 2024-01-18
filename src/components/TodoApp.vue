<template>
    <div class="todo-app">
        <h1>To Do List</h1>
        <pre>{{ todoStore.todoList }}</pre>
        
        
    </div>
</template>
  
<script lang="ts" setup>

import { useTodoListStore } from "../stores/useTodoListStore";
const todoStore = useTodoListStore()
</script>
<style scoped>
.todo-app {
    padding: 5vh;
    min-height: 100vh;
    width: 30vw;
    background-color: #f7f9fc;
}
</style>