<template>
  <div id="chat">
    <RoomGroup :rooms="rooms" @roomChanged="changeRoom" />
    <div class="d-flex flex-row">
      <v-col cols="11">
        <ChatZone
          :messages="messages"
          :selectedRoom="selectedRoom"
          :connectedUserID="connectedUserID"
          @send-msg="sendMessage"
        />
      </v-col>
      <v-col>
        <ListMembersChat :members="members" />
      </v-col>
    </div>
  </div>
</template>

<script>
import RoomGroup from "../components/RoomGroup.vue";
import ChatZone from "../components/ChatZone.vue";
import ListMembersChat from "../components/ListMembersChat.vue";

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
      rooms: [
        {
          id: "1",
          game: "Among Us",
          gameIcon:
            "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uaf.jpg",
        },
        {
          id: "2",
          game: "Among Us",
          gameIcon:
            "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uaf.jpg",
        },
        {
          id: "3",
          game: "Grand Theft Auto V",
          gameIcon:
            "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg",
        },
        {
          id: "4",
          game: "Minecraft",
          gameIcon:
            "https://images.igdb.com/igdb/image/upload/t_cover_big/co2b4k.jpg",
        },
      ],
      selectedRoom: {
        id: "1",
        game: "Among Us",
      },
      messages: [
        {
          content: "Il est bo le lavabo",
          timestamp: "dfsdfs",
          sender: "Antoine",
          senderId: "345823189449965579",
        },
        {
          content: "mamamia como estas",
          timestamp: "ioiuo",
          sender: "Monica",
          senderId: "283639048483110922",
        },
        {
          content:
            "AAAAAAAAAH qsqfsd fdsfs df sd fsdf sdf sdf sdf sdf dsefezfes s fzef sdf esfs fds frez fsdf ",
          timestamp: "ghfghf",
          sender: "Vivi",
          senderId: "578957887108546571",
        },
      ],
      members: [
        {
          User_ID: "578957887108546571",
          username: "Vivi",
          profile_url:
            "https://cdn.discordapp.com/avatars/578957887108546571/71714a0dbf66a6d85cbdb24953875d03.png",
        },
        {
          User_ID: "345823189449965579",
          username: "Antoine",
          profile_url:
            "https://cdn.discordapp.com/avatars/345823189449965579/a_9b9e67636f6a4154d7c277a8d5509053.png",
        },
        {
          User_ID: "283639048483110922",
          username: "Monica",
          profile_url:
            "https://cdn.discordapp.com/avatars/283639048483110922/113cb2453cb70ef21a3212177956ae40.png",
        },
      ],
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
        // timestamp: Date.now(),
        timestamp: "12:03",
        sender: this.connectedUsername,
        senderId: this.connectedUserID,
      };

      this.messages = [...this.messages, newMessage];
    },
    changeRoom(room) {
      this.selectedRoom = room;
    },
  },
  mounted() {
    this.getConnectedUser();
  },
};

// rooms: [
//   {
//     id: "",
//     game: "",
//     gameIcon: "",
//     members: [
//       {
//         username: "",
//         avatar: "",
//       },
//       {
//         username: "",
//         avatar: "",
//       },
//     ],
//     messages: [
//       {
//         content: "",
//         timestamp: "",
//         sender: "",
//       },
//     ],
//   },
// ],
</script>

<style lang="scss" module>
@import "../style";

.bigTitle {
  color: $color-font-primary;
  @extend .font-1-extra-large;
}

.subtitle {
  color: $color-font-primary;
  @extend .font-1-large;
}
</style>