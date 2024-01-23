<template>
    <div>
      <draggable :list="items">
        <div v-for="(item, index) in items" :key="index">{{ item }}</div>
      </draggable>
    </div>
  </template>
  
  <script lang="ts">
  import draggable from "vuedraggable";
  
  export default {
    components: {
      draggable,
    },
    data() {
      return {
        items: ["Item 1", "Item 2", "Item 3"],
      };
    },
  };
  </script>