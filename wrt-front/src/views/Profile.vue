<template>
  <div id="profile">
    <!-- Background Image -->
    <!-- <v-img
      dark
      :class="$style.bannerBg"
      max-height="317"
      max-width="100vw"
      :src="bgUserProfile"
    ></v-img> -->

    <!-- début bannière -->
    <div
      :class="
        $vuetify.breakpoint.mdAndUp ? $style.bannerBg : $style.bannerBgMobile
      "
      :style="{ background: styleBgUser }"
    ></div>
    <v-file-input
      prepend-icon="mdi-camera-image"
      dark
      accept="image/png, image/jpeg"
      hide-input
      @change="changeBgFile"
      :class="
        $vuetify.breakpoint.mdAndUp
          ? $style.btnChangeBg
          : $style.btnChangeBgMobile
      "
    ></v-file-input>
    <div
      :class="
        $vuetify.breakpoint.mdAndUp
          ? $style.displayAvatar
          : $style.displayAvatarMobile
      "
    >
      <AvatarUser :username="username" :avatarImg="avatarUser"></AvatarUser>
    </div>
    <v-row :class="$style.containerBtnEdit">
      <v-btn @click="toggleEdit" class="mt-2" :class="$style.btnEdit">{{
        editMode ? "Edit" : "Save"
      }}</v-btn>
    </v-row>
    <!-- fin bannière -->

    <v-form
      v-model="valid"
      class="d-flex flex-md-row flex-column justify-space-around px-md-16 px-4"
    >
      <v-col>
        <h3
          :class="
            $vuetify.breakpoint.mdAndUp
              ? $style.secondaryTitle
              : $style.secondaryTitleMobile
          "
        >
          Personal information
        </h3>
        <div>
          <v-textarea
            label="About me"
            v-model="aboutMe"
            dark
            :rules="aboutMeRules"
            :counter="170"
            outlined
            :class="$style.inputText"
          ></v-textarea>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Birthday date"
                v-model="birthdayDate"
                prepend-inner-icon="mdi-calendar"
                readonly
                dark
                v-bind="attrs"
                v-on="on"
                outlined
                :class="$style.inputText"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="birthdayDate"
              no-title
              scrollable
              color="amber accent-4"
              :active-picker.sync="activePicker"
              :max="
                new Date(new Date().setFullYear(new Date().getFullYear() - 13))
                  .toISOString()
                  .substr(0, 10)
              "
              @change="saveDate"
            ></v-date-picker>
          </v-menu>

          <v-autocomplete
            label="Country"
            v-model="country"
            dark
            :items="countryList"
            outlined
            required
            item-color="amber accent-4"
            :class="$style.inputText"
          ></v-autocomplete>
        </div>
        <div>
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            Languages
          </h3>
          <v-autocomplete
            label="Language"
            v-model="language"
            dark
            :items="languageList"
            outlined
            item-color="amber accent-4"
            @change="addLanguage"
            :class="$style.inputText"
          ></v-autocomplete>
          <div class="d-flex flex-wrap">
            <div v-for="lang in userLanguages" :key="lang" class="mr-2 mb-2">
              <v-chip
                close
                :class="$style.chip"
                :color="$style.colorCardBg"
                :text-color="$style.colorFontPrirmary"
                @click:close="deleteLanguage(lang)"
              >
                {{ lang }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <div>
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            Platforms
          </h3>
          <div class="d-flex flex-column justify-space-between mb-md-0 mb-5">
            <v-select
              label="Platform"
              v-model="plaform"
              dark
              item-color="amber accent-4"
              :items="platformList"
              outlined
              :class="$style.inputText"
            ></v-select>
            <div class="d-flex flex-column flex-md-row">
              <v-text-field
                label="Platform username"
                v-model="platformUsername"
                dark
                outlined
                class="mr-md-5"
                :class="$style.inputText"
              ></v-text-field>
              <v-btn :class="$style.btn" @click="addPlatform" class="py-7"
                >Add</v-btn
              >
            </div>
          </div>
          <EditImgGrid
            :imgList="userPlatforms"
            @delete-img="deletePlatform"
            imgHeight="80"
            imgWidth="80"
          />
        </div>
        <div>
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            Social media
          </h3>
          <div class="d-flex flex-column flex-md-row justify-space-between">
            <div class="d-flex align-center mb-5 mr-md-5">
              <v-img
                :src="require('../assets/profile/twitter.png')"
                :max-height="30"
                :max-width="30"
                contain
              ></v-img>
              <v-text-field
                label="Twitter ID"
                v-model="twitterId"
                hide-details
                dark
                outlined
                class="ml-2"
                :class="$style.inputText"
              ></v-text-field>
            </div>
            <div class="d-flex align-center mb-5">
              <v-img
                :src="require('../assets/profile/instagram.png')"
                :max-height="30"
                :max-width="30"
                contain
              ></v-img>
              <v-text-field
                label="Instagram ID"
                v-model="instagramId"
                hide-details
                dark
                outlined
                class="ml-2"
                :class="$style.inputText"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex flex-column flex-md-row justify-space-between">
            <div class="d-flex align-center mb-md-0 mb-5 mr-md-5">
              <v-img
                :src="require('../assets/profile/discord.png')"
                :max-height="30"
                :max-width="30"
                contain
              ></v-img>
              <v-text-field
                label="Discord ID"
                v-model="discordId"
                hide-details
                dark
                outlined
                class="ml-2"
                :class="$style.inputText"
              ></v-text-field>
            </div>
            <div class="d-flex align-center">
              <v-img
                :src="require('../assets/profile/twitch.png')"
                :max-height="30"
                :max-width="30"
                contain
              ></v-img>
              <v-text-field
                label="Twitch ID"
                v-model="twitchId"
                hide-details
                dark
                outlined
                class="ml-2"
                :class="$style.inputText"
              ></v-text-field>
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <div>
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            Games
          </h3>
          <div class="d-flex flex-row">
            <v-autocomplete
              label="Game"
              v-model="game"
              dark
              :items="gameList"
              outlined
              item-color="amber accent-4"
              @change="addGame"
              :class="$style.inputText"
            ></v-autocomplete>
          </div>
          <EditImgGrid
            :imgList="userGames"
            @delete-img="deleteGame"
            imgHeight="140"
            imgWidth="100"
          />
        </div>
      </v-col>
    </v-form>
  </div>
</template>

<script>
import AvatarUser from "../components/AvatarUser.vue";
import EditImgGrid from "../components/EditImgGrid.vue";

export default {
  name: "Profile",
  props: {
    editMode: Boolean,
  },
  components: {
    AvatarUser,
    EditImgGrid,
  },
  data() {
    return {
      valid: false,
      aboutMeRules: [
        (v) =>
          v.length <= 170 ||
          "About me section must be less than 170 characters",
      ],
      activePicker: null,
      countryList: [],
      languageList: [],
      platformList: ["PC", "Play Station", "Xbox", "Nintendo Switch"],
      // à remplacer par une liste plus complète de jeu
      gameList: [
        "League of Legends",
        "Fortnite",
        "Rocket League",
        "Valorant",
        "Among us",
        "Minecraft",
      ],
      language: "",
      plaform: "",
      game: "",
      platformUsername: "",
      menu: false,
      // models
      bgUserProfile: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
      aboutMe: "",
      avatarUser: "",
      birthdayDate: null,
      country: "",
      userLanguages: [],
      userPlatforms: [],
      userGames: [],
      username: "",
      discordId: "",
      twitterId: "",
      instagramId: "",
      twitchId: "",
    };
  },
  computed: {
    styleBgUser() {
      return (
        "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #1b1b1b 100%), center url('" +
        this.bgUserProfile +
        "')"
      );
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    toggleEdit() {
      this.editMode = !this.editMode;
    },
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    addLanguage() {
      if (!this.language || this.userLanguages.includes(this.language)) {
        this.language = "";
        return;
      }
      this.userLanguages = [...this.userLanguages, this.language];
      this.language = "";
    },
    deleteLanguage(lang) {
      this.userLanguages = this.userLanguages.filter(
        (language) => language !== lang
      );
    },
    addPlatform() {
      if (
        !this.plaform ||
        this.userPlatforms.map((plat) => plat.name).includes(this.plaform)
      ) {
        return;
      }
      if (!this.platformUsername) {
        return;
      }

      let newPlatform = {
        name: this.plaform,
        description: this.platformUsername,
        // path à changer une fois qu'on aura des images
        path: this.bgUserProfile,
      };

      this.userPlatforms = [...this.userPlatforms, newPlatform];
      this.plaform = "";
      this.platformUsername = "";
    },
    deletePlatform(platformName) {
      this.userPlatforms = this.userPlatforms.filter(
        (platform) => platform.name !== platformName
      );
    },
    addGame() {
      if (
        !this.game ||
        this.userGames.map((game) => game.name).includes(this.game)
      ) {
        return;
      }

      let newGame = {
        name: this.game,
        description: this.game,
        // path à changer une fois qu'on aura des images
        path: this.bgUserProfile,
      };

      this.userGames = [...this.userGames, newGame];
      this.game = "";
    },
    deleteGame(gameName) {
      this.userGames = this.userGames.filter((game) => game.name !== gameName);
    },
    async getCountries() {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all?fields=name",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      this.countryList = data.map((country) => country.name).sort();
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
    changeBgFile(file) {
      // todo: limiter le poids des fichiers
      let reader = new FileReader();
      reader.onload = (event) => {
        this.bgUserProfile = event.target.result;
      };
      reader.readAsDataURL(file);
      console.log(file);
    },
    initUserDate(user) {
      if (user.profile_url != null) this.avatarUser = user.profile_url;
      this.username = user.username;
    },
    async getUser() {
      let url = process.env.VUE_APP_API_URL;
      fetch(`${url}/api/user/`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => this.initUserDate(response));
    },
  },
  mounted() {
    this.getUser();
    this.getCountries();
    this.getLanguages();
  },
};
</script>

<style lang="scss" module>
@import "../style";

.bannerBg {
  height: 317px;
  width: 100vw;
}

.bannerBgMobile {
  height: 150px;
  width: 100vw;
}

.btnChangeBg {
  position: absolute;
  top: 255px;
  right: 20px;
}

.btnChangeBgMobile {
  position: absolute;
  top: 70px;
  right: 20px;
}

.btn {
  background-color: $color-secondary !important;
  font-weight: bold;
  @extend .font-2-tiny;
}

.btnEdit {
  @extend .btn;
  margin-right: 30px;
}

.containerBtnEdit {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 10px;
}

.chip {
  @extend .font-1-small;
}

.displayAvatar {
  position: absolute;
  top: 85px;
  margin-left: -75px;
  left: 50%;
}

.displayAvatarMobile {
  position: absolute;
  top: 55px;
  margin-left: -50px;
  left: 50%;
}

.title {
  color: $color-font-primary;
  @extend .font-1-large-bold;
}

.titleMobile {
  color: $color-font-primary;
  @extend .font-1-medium-bold;
}

.secondaryTitle {
  color: $color-secondary;
  margin: 16px 0;
  @extend .font-1-medium;
}

.secondaryTitleMobile {
  color: $color-secondary;
  margin: 16px 0;
  @extend .font-1-medium-small;
}

.widthFirstDesktop {
  width: 572px;
}

.inputText {
  color: $color-font-primary;
  @extend .font-2-small;
}
</style>
