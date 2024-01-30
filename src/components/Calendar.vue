<script setup lang="ts">
import { ref } from 'vue';

type CalendarEvent = {
    name: string;
    start: string;
    end: string;
    color: string;
};

const selectedDate = ref(new Date().toISOString().substr(0, 10));
const calendarEvents = ref<CalendarEvent[]>([
    // กำหนดเหตุการณ์ของคุณที่นี่
    {
        name: 'เหตุการณ์ที่ 1',
        start: '2024-01-30',
        end: '2024-01-30',
        color: 'blue'
    },
    // ... เพิ่มเหตุการณ์เพิ่มเติมตามต้องการ
]);

const getEventColor = (event: CalendarEvent) => event.color;

const onClickEvent = (event: CalendarEvent) => {
    // จัดการการคลิกเหตุการณ์ที่นี่
    console.log(event.name);
};
</script>

<template>
    <v-container>
        <v-calendar v-model="selectedDate" :events="calendarEvents" :event-color="getEventColor"
            @click:event="onClickEvent"></v-calendar>
    </v-container>
</template>

<style scoped>
/* เพิ่มสไตล์ที่นี่ถ้าจำเป็น */
</style>