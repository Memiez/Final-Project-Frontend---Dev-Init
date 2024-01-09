<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { VApp, VMain, VNavigationDrawer } from 'vuetify/lib'


export default defineComponent({
  setup() {
    const focus = ref('');
    const type = ref('month');
    const typeToLabel = {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    };
    const selectedEvent = ref({});
    const selectedElement = ref(null);
    const selectedOpen = ref(false);
    const events = ref([]);
    const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];
    const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'];

    onMounted(() => {
      // คุณจะต้องใช้ ref ที่นี่ เช่น this.calendarRef.value.checkChange()
    });

    const viewDay = ({ date }) => {
      focus.value = date;
      type.value = 'day';
    };

    const getEventColor = (event) => {
      return event.color;
    };

    const setToday = () => {
      focus.value = '';
    };

    const prev = () => {
      // คุณจะต้องใช้ ref ที่นี่ เช่น this.calendarRef.value.prev()
    };

    const next = () => {
      // คุณจะต้องใช้ ref ที่นี่ เช่น this.calendarRef.value.next()
    };

    const showEvent = ({ nativeEvent, event }) => {
      // โค้ดของคุณ
    };

    const updateRange = ({ start, end }) => {
      // โค้ดของคุณ
    };

    const rnd = (a, b) => {
      return Math.floor((b - a + 1) * Math.random()) + a;
    };

    // คุณจะต้อง return สิ่งที่จะใช้ใน template ด้านล่างนี้
    return {
      focus,
      type,
      typeToLabel,
      selectedEvent,
      selectedElement,
      selectedOpen,
      events,
      viewDay,
      getEventColor,
      setToday,
      prev,
      next,
      showEvent,
      updateRange,
      rnd,
    };
  },
});
</script>

<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
          :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
          @change="updateRange"></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>