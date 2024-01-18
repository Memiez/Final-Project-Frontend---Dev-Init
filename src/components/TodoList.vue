<template>
    <div v-for="todo in todoStore.todoList" :key="todo.id" class="list">
        <div class="item">
            <span :class="{ completed: todo.completed }">{{ todo.item }}</span>
            <div>
                <span @click.stop="todoStore.toggleCompleted(todo.id)">&#10004;</span>
                <span @click="todoStore.deleteTodo(todo.id)" class="x">&#10060;</span>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { useTodoListStore } from "@/stores/useTodoListStore";



const todoStore = useTodoListStore();




</script>
  
<style scoped>
span {
    margin: 0 10px;
    cursor: pointer;
}

.completed {
    text-decoration: line-through;
}

.list {
    display: flex;
    justify-content: center;
}

.item {
    display: flex;
    font-size: 1.5em;
    justify-content: space-between;
    width: 80vw;
    padding: 5px;
}
</style>