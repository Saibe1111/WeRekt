<template>
  <div
    class="d-flex flex-column align-center justify-center"
    :class="$style.sectionHeight"
  >
    <div v-if="!waiting">
      <div class="d-flex justify-center text-center mt-16">
        <h1
          :class="
            $vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile
          "
        >
          What game do you want to
          <span
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.coloredTitle
                : $style.coloredTitleMobile
            "
            class="px-2 py-4 mr-2"
            @click="playBtn()"
            >play</span
          >?
        </h1>
      </div>
      <div class="d-flex align-center mt-12 mx-5">
        <v-text-field
          class="mr-5"
          label="Choose a game"
          v-model="chosenGame"
          hide-details
          dark
          outlined
        ></v-text-field>
        <v-btn :class="$style.btn" @click="playBtn()">Play</v-btn>
      </div>
    </div>
    <div v-else class="d-flex flex-column align-center">
      <h1
        :class="$vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile"
      >
        Finding
        <span :class="$style.textColor">{{ chosenGame }}</span>
        players...
      </h1>
      <v-progress-circular
        class="my-10"
        :size="80"
        :color="$style.colorSecondary"
        indeterminate
      ></v-progress-circular>
      <span :class="$style.text">{{ message }}</span>

      <v-btn class="mt-7" :class="$style.btn" @click="cancelBtn()"
        >Cancel</v-btn
      >
    </div>
  </div>
</template>

<script>
import socket from "../socket";
export default {
  name: "Play",
  components: {},
  data() {
    return {
      connectedUserID: "",
      chosenGame: "",
      message: "In search of new players",
      nbGamersWaiting: 0,
      maxGamers: 0,
      waiting: false,
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
      this.connectedUserID = user.User_ID;
    },
    async playBtn() {
      // vérifier que le jeu chosenGame existe
      this.waiting = true;
      let game = this.chosenGame;

      await this.getConnectedUser();

      let userId = this.connectedUserID;
      socket.disconnect();
      socket.connect();
      socket.on("connect", () => {
        socket.emit("game_search", game, userId);
      });

      socket.on("number_user", (nb, max) => {
        this.nbGamersWaiting = nb;
        this.maxGamers = max;
        this.message = `${this.nbGamersWaiting} / ${this.maxGamers} players found`;
      });

      socket.on("launch_game", () => {
        socket.emit("leave_room");
        
        this.message = "A room for " + this.chosenGame + " is being created";
        socket.disconnect();
        document.location.href = "/chat";
      });
    },
    cancelBtn() {
      this.waiting = false;
      socket.disconnect();
    },
  },
};
</script>

<style lang="scss" module>
@import "../style";

.btn {
  background-color: $color-secondary !important;
  font-weight: bold;
  @extend .font-2-tiny;
}

.coloredTitle {
  background: linear-gradient(270deg, $color-secondary, $color-secondary-bis);
  border-radius: 4px;
  @extend .title;
}

.coloredTitleMobile {
  background: linear-gradient(270deg, $color-secondary, $color-secondary-bis);
  border-radius: 4px;
  @extend .titleMobile;
}

.sectionHeight {
  min-height: 80vh !important;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.title {
  color: $color-font-primary;
  @extend .font-1-large-bold;
}

.titleMobile {
  color: $color-font-primary;
  @extend .font-1-medium-bold;
}

.text {
  color: $color-font-primary;
  @extend .font-1-medium-small;
}

.textColor {
  color: $color-secondary;
}
</style>