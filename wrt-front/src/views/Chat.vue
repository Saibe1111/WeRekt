<template>
  <div id="chat">
    <RoomGroup :rooms="rooms" @roomChanged="changeRoom" />
    <div class="d-flex justify-space-between">
      <span></span>
      <h1
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
      selectedRoom: {
        id: "1",
        game: "Among Us",
      },
      messages: [],
      members: [],
    };
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
      let newMessage = {
        content: content,
        timestamp: "12:03",
        sender: this.connectedUsername,
        senderId: this.connectedUserID,
      };

      this.messages = [...this.messages, newMessage];
    },
    changeRoom(room) {
      this.selectedRoom = room;
    },
    toggleUserPanel() {
      this.userPanel = !this.userPanel;
    },
  },
  async mounted() {

    console.log('Montage')
    await this.getConnectedUser();
    let userId = this.connectedUserID;
    socket.emit("user_connected", userId);
    socket.connect();
      socket.on("connect", () => {
      });

      socket.on("room", (rooms) => {
        if (Array.isArray(rooms)){
          this.rooms = rooms;
        }else{
          this.rooms = [...this.rooms, rooms];
        }
      });	

      socket.on("room_Info", (messages, users) => {
        if (Array.isArray(messages)){
          this.messages = messages;
          this.members = users;
        }else{
          this.messages = [...this.messages, messages];
        }
      });	
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