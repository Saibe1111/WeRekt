<template>
  <div id="roomGroup">
    <v-icon
      class="ml-2 mb-n8"
      :class="$vuetify.breakpoint.mdAndUp ? 'mb-n16' : 'mb-n10'"
      color="white"
      @click="panelVisible = !panelVisible"
      >mdi-menu</v-icon
    >
    <v-navigation-drawer
      v-model="panelVisible"
      dark
      bottom
      clipped
      app
      :color="$style.colorMainBg"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title :class="$style.mainTitle">
            Rooms
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list nav>
        <v-list-item-group mandatory v-model="selectedRoom">
          <v-list-item
            v-for="room in rooms"
            :key="room.id"
            @click="changeRoom(room)"
          >
            <v-list-item-icon>
              <v-img max-width="40" :src="room.gameIcon"></v-img>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title :class="$style.gameText"
                >{{ room.game }} {{ room.id }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="this.rooms.length == 0">
            <v-list-item-content>
              <v-list-item-title :class="$style.gameText"
                >No room available</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "RoomGroup",
  props: {
    rooms: {
      type: Array,
    },
  },
  data() {
    return {
      selectedRoom: {},
      panelVisible: true,
    };
  },
  methods: {
    changeRoom(room) {
      if (room != this.selectedRoom) {
        this.$emit("roomChanged", room);
      }
    },
  },
  mounted() {
    this.selectedRoom = this.rooms[0];
  },
};
</script>

<style lang="scss" module>
@import "../style";
.marginTop {
  margin-top: -10px;
}

.mainTitle {
  @extend .font-1-medium-small;
}

.gameText {
  font-size: 14px !important;
  @extend .font-2-small;
}
</style>

<style lang="scss">
@import "../style";

#roomGroup .v-list-item--active {
  background-color: $color-secondary !important;
  color: $color-font-secondary;
}
</style>