<template>
  <div
    id="play"
    class="d-flex flex-column align-center justify-center"
    :class="$style.sectionHeight"
  >
    <div v-if="!waiting">
      <div class="d-flex justify-center text-center my-10 mb-12">
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
      <div class="d-flex align-center mx-4">
        <v-autocomplete
          class="mr-5"
          ref="gameChoice"
          label="Choose a game"
          v-model="chosenGame"
          :items="gamesList"
          :rules="gamesRules"
          required="true"
          dark
          clearable
          outlined
          item-color="amber accent-4"
          @keyup.enter="playBtn()"
        ></v-autocomplete>
      </div>
      <div class="d-flex justify-center mb-8">
        <v-btn :class="$style.btn" @click="playBtn()">Play</v-btn>
      </div>
      <v-expansion-panels dark popout>
        <v-expansion-panel>
          <v-expansion-panel-header expand-icon="mdi-menu-down">
            <span :class="$style.inputText" class="mx-4"
              >Optional matchmaking settings</span
            >
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex flex-column flex-md-row ma-4">
              <v-select
                label="Platform"
                v-model="platform"
                dark
                item-color="amber accent-4"
                :items="platformList"
                outlined
                clearable
                :class="$style.inputText"
              ></v-select>
              <v-spacer></v-spacer>
              <v-autocomplete
                label="Language"
                v-model="language"
                dark
                :items="languageList"
                outlined
                clearable
                item-color="amber accent-4"
                :class="$style.inputText"
              ></v-autocomplete>
            </div>
            <div class="d-flex align-center mx-4">
              <span :class="$style.inputText">Age range :</span>
              <v-range-slider
                v-model="ageRange"
                :max="ageMax"
                :min="ageMin"
                :thumb-color="$style.colorSecondary"
                dark
                hide-details
                thumb-label="always"
                class="align-center ma-6"
              >
              </v-range-slider>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
      // Models
      ageMin: 13,
      ageMax: 100,
      ageRange: [13, 100],
      platform: "",
      language: "",
      // Page data
      connectedUserID: "",
      chosenGame: "",
      nbGamersWaiting: 0,
      maxGamers: 0,
      waiting: false,
      message: "In search of new players",
      platformList: ["PC", "Play Station", "Xbox", "Nintendo Switch"],
      languageList: [],
      gamesList: [],
      gamesRules: [(v) => !!v || "Game is required"],
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
    async getGames() {
      let url = process.env.VUE_APP_API_URL;
      const res = await fetch(`${url}/api/games/list`, {
        method: "GET",
        credentials: "include",
      });
      const games = await res.json();
      this.gamesList = games.sort();
    },
    async getLanguages() {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all?fields=languages",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      data
        .map((country) => country.languages.map((lang) => lang.name))
        .forEach((element) => {
          this.languageList = this.languageList.concat(element).sort();
        });
    },
    async playBtn() {
      // vérifier que le jeu chosenGame existe
      if (this.chosenGame && this.chosenGame.length > 0) {
        this.waiting = true;
        let game = this.chosenGame;

        await this.getConnectedUser();

        let userId = this.connectedUserID;
        socket.disconnect();
        socket.connect();
        socket.on("connect", () => {
          socket.emit("game_search", game, userId, this.language, this.platform, this.ageMin, this.ageMax);
        });

        socket.on("number_user", (nb, max) => {
          this.nbGamersWaiting = nb;
          this.maxGamers = max;
          this.message = `${this.nbGamersWaiting} / ${this.maxGamers} players found`;
        });

        socket.on("launch_game", () => {
          socket.emit("leave_room", 'searching ' + game);
          this.message = "A room for " + game + " is being created";
          socket.disconnect();
          document.location.href = "/chat";
        });
      } else {
        this.$refs.gameChoice.focus();
      }
    },
    cancelBtn() {
      this.waiting = false;
      socket.disconnect();
    },
  },
  mounted() {
    this.getLanguages();
    this.getGames();
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

.inputText {
  color: $color-font-primary;
  @extend .font-2-small;
}

.optionalSettings {
  background-color: $color-card-bg;
}

.sectionHeight {
  min-height: 84vh !important;
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

<style lang="scss">
@import "../style";

#play .v-slider__thumb-label {
  color: $color-font-secondary;
  @extend .font-2-tiny;
}

#play .v-expansion-panel-header,
.v-expansion-panel-content {
  background-color: $color-card-darker-bg !important;
}
</style>