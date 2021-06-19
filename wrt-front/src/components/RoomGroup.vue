<template>
  <div>
    <v-navigation-drawer dark clipped app :color="$style.colorMainBg">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title :class="$style.mainTitle">
            Rooms
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav>
        <v-list-item-group v-model="selectedRoom">
          <v-list-item
            v-for="room in rooms"
            :key="room.id"
            link
            @click="changeRoom(room)"
          >
            <v-list-item-icon>
              <v-img max-width="30" :src="room.gameIcon"></v-img>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title :class="$style.gameText"
                >{{ room.game }} {{ room.id }}</v-list-item-title
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
      selectedRoom: "",
    };
  },
  methods: {
    changeRoom(room) {
      this.selectedRoom = room;
      this.$emit("roomChanged", room);
    },
  },
};
</script>

<style lang="scss" module>
@import "../style";

.mainTitle {
  @extend .font-1-medium-small;
}

.gameText {
  @extend .font-2-small;
}
</style>
