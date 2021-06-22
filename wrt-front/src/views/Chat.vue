<template>
  <div id="chat">
    <RoomGroup
      v-if="roomsAreInitialized"
      :rooms="roomsReversed"
      @roomChanged="changeRoom"
    />
    <div class="d-flex justify-space-between">
      <span></span>
      <h1
        v-if="this.selectedRoom.game"
        class="text-center pb-2 justify-center my-n1"
        :class="$vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile"
      >
        {{ this.selectedRoom.game + " " + this.selectedRoom.id }}
      </h1>

      <v-btn
        icon
        dark
        :ripple="false"
        class="mr-2"
        :class="$vuetify.breakpoint.mdAndUp ? 'mt-3' : 'pb-5'"
        color="white"
        elevation="0"
        @click="toggleUserPanel()"
        ><v-icon>mdi-account-details</v-icon></v-btn
      >
    </div>
    <div class="d-flex">
      <ChatZone
        :class="$style.chatZone"
        :messages="messages"
        :selectedRoom="selectedRoom"
        :connectedUserID="connectedUserID"
        @send-msg="sendMessage"
        @typing-msg="isTyping"
        :isDisabled="isDisabled"
        :isTypingUser="isTypingUser"
      />
      <ListMembersChat v-if="userPanel" class="mx-3" :members="members" />
    </div>
  </div>
</template>

<script>
import RoomGroup from "../components/RoomGroup.vue";
import ChatZone from "../components/ChatZone.vue";
import ListMembersChat from "../components/ListMembersChat.vue";
import socket from "../socket";

export default {
  name: "Chat",
  components: {
    RoomGroup,
    ChatZone,
    ListMembersChat,
  },
  data() {
    return {
      connectedUserID: "",
      connectedUsername: "",
      userPanel: true,
      rooms: [],
      selectedRoom: {},
      messages: [],
      members: [],
      roomsAreInitialized: false,
      isTypingUser: "",
    };
  },
  computed: {
    roomsReversed() {
      return [...this.rooms].reverse();
    },
    isDisabled() {
      if (this.rooms.length == 0) return true;
      return false;
    },
  },
  methods: {
    async getConnectedUser() {
      let url = process.env.VUE_APP_API_URL;
      const res = await fetch(`${url}/api/user`, {
        method: "GET",
        credentials: "include",
      });

      const user = await res.json();
      this.connectedUsername = user.username;
      this.connectedUserID = user.User_ID;
    },
    sendMessage(content) {
      if (!content) return;

      let date = new Date();
      var dateStr =
        ("00" + date.getDate()).slice(-2) +
        "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear() +
        " " +
        ("00" + date.getHours()).slice(-2) +
        ":" +
        ("00" + date.getMinutes()).slice(-2) +
        ":" +
        ("00" + date.getSeconds()).slice(-2);

      let newMessage = {
        content: content,
        timestamp: dateStr,
        senderId: this.connectedUserID,
        room: this.selectedRoom.id,
      };
      socket.emit("message", newMessage);
    },
    isTyping() {
      socket.emit("typing", this.selectedRoom.id,this.connectedUserID);
    },
    changeRoom(room) {
      this.selectedRoom = room;
      socket.emit("change_room", this.selectedRoom.id);
      
    },
    toggleUserPanel() {
      this.userPanel = !this.userPanel;
    },
  },
  async mounted() {
    await this.getConnectedUser();
    let userId = this.connectedUserID;
    socket.emit("user_connected", userId);
    socket.disconnect();
    socket.connect();
    socket.on("connect", () => {});
    socket.on("new_message", (message) => {
      this.messages = [...this.messages, message];
    });

    socket.on("room", (rooms) => {
      if (Array.isArray(rooms)) {
        this.rooms = rooms;
        this.roomsAreInitialized = true;
        this.selectedRoom = rooms[rooms.length - 1];
        socket.emit("change_room", this.selectedRoom.id);
      } else {
        this.rooms = [...this.rooms, rooms];
      }
    });

    socket.on("user_typing", (username) => {
      this.isTypingUser = username;
      setTimeout( () => {
        this.isTypingUser = ""
      }, 5000);
    });

    socket.on("room_Info", (messages, users) => {
      if (Array.isArray(messages)) {
        this.messages = messages;
        this.members = users;
      } else {
        this.messages = [...this.messages, messages];
      }
    });

    setTimeout(() => {
      this.roomsAreInitialized = true;
    }, 1000);
  },
};
</script>

<style lang="scss" module>
@import "../style";

.title {
  color: $color-font-primary;
  background-color: $color-main-bg;
  @extend .font-1-medium;
}

.titleMobile {
  color: $color-font-primary;
  background-color: $color-main-bg;
  @extend .font-1-small;
}

.bigTitle {
  color: $color-font-primary;
  @extend .font-1-extra-large;
}

.chatZone {
  width: 100%;
}

.subtitle {
  color: $color-font-primary;
  @extend .font-1-large;
}

.v-btn {
  transition: none !important;
}

.v-btn:before {
  opacity: 0 !important;
}

.v-ripple__container {
  opacity: 0 !important;
}
</style>