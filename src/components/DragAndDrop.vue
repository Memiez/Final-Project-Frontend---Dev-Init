<template>
  <div>
    <draggable :list="items">
      <div v-for="(item, index) in items" :key="index">{{ item }}</div>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

// สร้างตัวแปร reactive โดยใช้ ref
const items = ref(['Item 1', 'Item 2', 'Item 3'])
</script>
