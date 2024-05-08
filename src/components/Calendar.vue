<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
                <v-sheet height="600">
                    <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
                        @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
                        @change="updateRange"></v-calendar>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { VEventInput } from 'vuetify/types';

@Component
export default class Calendar extends Vue {
    focus = new Date().toISOString().substr(0, 10);
    events: VEventInput[] = [
        { name: 'Lunch with Mom', start: '2019-05-01', end: '2019-05-01', color: 'red' },
        { name: 'Meeting with Client', start: '2019-05-07', end: '2019-05-07', color: 'green' },
        // Add more events here
    ];

    getEventColor(event: { color: string }) {
        return event.color;
    }

    showEvent({ nativeEvent, event }: { nativeEvent: MouseEvent; event: any }) {
        const open = () => {
            this.$refs.calendar.getEventPopover(event);
        };
        if (nativeEvent) {
            nativeEvent.stopPropagation();
        }
        setTimeout(open, 10);
    }

    viewDay({ date }: { date: string }) {
        this.focus = date;
    }

    updateRange() {
        // Logic to update the range of the calendar based on the user interactions or requests
    }
}
</script>
  
<style scoped>
.v-sheet {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
}
</style>