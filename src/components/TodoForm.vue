<template>
    <div>
        <form @submit.prevent="addItemAndClear(todo)">
            <input v-model="todo" type="text" /><button>Add</button>
            <div class="alert-div">
                <div v-show="store.showAlert" class="alert">
                    Please type something...
                </div>
            </div>
        </form>
    </div>
</template>
<script lang="ts" setup>
import { useTodoListStore } from "@/stores/useTodoListStore";
import { ref } from "vue";


const todo = ref("");
const store = useTodoListStore();

function addItemAndClear(item: string) {
    if (item.length === 0) {
        store.inputAlert();
        return;
    }
    store.addTodo(item);
    todo.value = "";
}


</script>
<style scoped>
form {
    margin-bottom: 15px;
}

input {
    margin-top: 25px;
    margin-bottom: 15px;
    height: 20px;
    width: 50%;
}

button {
    margin-left: 30px;
    background-color: #2f6089;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    font-weight: 800;
    color: white;
    width: 15%;
}

.alert-div {
    min-height: 25px;
}

.alert {
    color: #d1495b;
    font-size: 1em;
    font-weight: 600;
}
</style>