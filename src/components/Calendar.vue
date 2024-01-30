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

    {
        name: 'เหตุการณ์ที่ 1',
        start: '2024-01-30',
        end: '2024-01-30',
        color: 'blue'
    },

]);

const getEventColor = (event: CalendarEvent) => event.color;

const onClickEvent = (event: CalendarEvent) => {

    console.log(event.name);
};
</script>

<template>
    <v-container>
        <v-calendar v-model="selectedDate" :events="calendarEvents" :event-color="getEventColor"
            @click:event="onClickEvent"></v-calendar>
    </v-container>
</template>

<style scoped></style>