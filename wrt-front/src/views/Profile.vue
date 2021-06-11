<template>
  <div>
    <div class="d-flex justify">{{ editMode }}</div>
    <!-- Background Image -->
    <v-img
      dark
      :class="$style.bannerBg"
      max-height="317"
      max-width="100vw"
      :src="bgUserProfile"
    ></v-img>
    <div :class="$style.bannerTest"></div>
    <v-file-input
      prepend-icon="mdi-camera-image"
      dark
      accept="image/png, image/jpeg"
      hide-input
      @change="changeBgFile"
      :class="$style.btnChangeBg"
    ></v-file-input>
    <!-- Avatar à mettre dans un composant props img -->
    <div :class="$style.displayAvatar">
      <AvatarUser :username="username" :avatarImg="avatarUser"></AvatarUser>
    </div>
    <v-btn @click="toggleEdit" :class="$style.btnEdit">Edit</v-btn>
    <v-form v-model="valid" class="d-flex justify-space-around px-16">
      <v-col>
        <h3 :class="$style.secondaryTitle">Personal information</h3>
        <div>
          <v-textarea
            label="About me"
            v-model="aboutMe"
            dark
            :rules="aboutMeRules"
            :counter="170"
            outlined
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
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="birthdayDate"
              no-title
              scrollable
              :active-picker.sync="activePicker"
              :max="
                new Date(new Date().setFullYear(new Date().getFullYear() - 13))
                  .toISOString()
                  .substr(0, 10)
              "
              @change="saveDate"
            ></v-date-picker>
          </v-menu>

          <v-select
            label="Country"
            v-model="country"
            dark
            :items="countryList"
            outlined
            required
          ></v-select>
        </div>
        <div>
          <h3 :class="$style.secondaryTitle">Languages</h3>
          <v-select
            label="Language"
            v-model="language"
            dark
            :items="languageList"
            outlined
            @change="addLanguage"
          ></v-select>
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
          <h3 :class="$style.secondaryTitle">Platforms</h3>
          <div class="d-flex flex-row">
            <v-select
              label="Platform"
              v-model="plaform"
              dark
              :items="platformList"
              outlined
            ></v-select>
            <v-text-field
              label="Platform username"
              v-model="platformUsername"
              dark
              outlined
            ></v-text-field>
            <v-btn :style="$style.btn" @click="addPlatform">Add</v-btn>
          </div>
          <div class="d-flex flex-wrap">
            <div
              v-for="plat in userPlatforms"
              :key="plat.name"
              class="mr-2 mb-2"
            >
              <v-badge color="transparent" overlap offset-x="32" offset-y="20">
                <v-btn
                  slot="badge"
                  x-small
                  icon
                  dark
                  @click="deletePlatform(plat.name)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-img :src="bgUserProfile" height="80" width="80"></v-img>
              </v-badge>
              <div>{{ plat.name }} &nbsp;{{ plat.username }}</div>
            </div>
          </div>
        </div>
        <div>
          <h3 :class="$style.secondaryTitle">Social media</h3>
          <div>
            <div class="d-flex mr-4">
              <div class="d-flex align-center mb-5">
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
                  class="mx-2"
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
                  class="mx-2"
                ></v-text-field>
              </div>
            </div>
            <div class="d-flex mr-4">
              <div class="d-flex align-center">
                <v-img
                  :src="require('../assets/profile/discord.png')"
                  height="30"
                  width="30"
                  contain
                ></v-img>
                <v-text-field
                  label="Discord ID"
                  v-model="discordId"
                  hide-details
                  dark
                  outlined
                  class="mx-2"
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
                  class="mx-2"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <div>
          <h3 :class="$style.secondaryTitle">Games</h3>
        </div>
      </v-col>
    </v-form>
  </div>
</template>

<script>
import AvatarUser from "../components/AvatarUser.vue";
export default {
  name: "Profile",
  props: {
    editMode: Boolean,
  },
  components: {
    AvatarUser,
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
      platformList: ["PC", "PSN", "Xbox", "Nintendo Switch Online"],
      language: "",
      plaform: "",
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
        this.bgUserProfile +
        ", linear-gradient(180deg, rgba(255, 255, 255, 0), #1B1B1B)"
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
        username: this.platformUsername,
      };

      this.userPlatforms = [...this.userPlatforms, newPlatform];
      this.plaform = "";
      this.platformUsername = "";
      console.log(this.userPlatforms);
    },
    deletePlatform(platformName) {
      this.userPlatforms = this.userPlatforms.filter(
        (platform) => platform.name !== platformName
      );
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
  // position: relative;
}

.btnChangeBg {
  position: absolute;
  top: 280px;
  right: 20px;
}

.btn {
  background-color: $color-secondary !important;
}

.btnEdit {
  @extend .btn;
  float: right;
  margin-right: 10px;
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
  top: 45px;
  margin-left: -75px;
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

.widthFirstDesktop {
  width: 572px;
}
</style>
