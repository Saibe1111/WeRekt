<template>
  <div>
    <div class="d-flex justify">{{ editMode }}</div>
    <!-- Background Image -->
    <v-img
      :class="$style.bannerBg"
      max-height="317"
      max-width="100vw"
      :src="bgUserProfile"
    ></v-img>
    <v-file-input
      prepend-icon="mdi-camera-image"
      dark
      hide-input
      @change="changeBgFile"
      :class="$style.btnChangeBg"
    ></v-file-input>
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
                v-model="date"
                prepend-inner-icon="mdi-calendar"
                readonly
                dark
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
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
          ></v-select>
        </div>
        <div>
          <h3 :class="$style.secondaryTitle">Languages</h3>
          <div class="d-flex align-center">
            <v-select
              label="Language"
              v-model="language"
              dark
              hide-details
              :items="languageList"
              outlined
            ></v-select>
            <v-btn @click="addLanguage" :class="$style.btn">Add</v-btn>
          </div>
          <div v-for="lang in userLanguages" :key="lang">
            <div class="d-flex align-center justify-space-between">
              <div>{{ lang }}</div>
              <v-btn @click="deleteLanguage(lang)" icon
                ><v-icon>mdi-minus</v-icon></v-btn
              >
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <div>
          <h3 :class="$style.secondaryTitle">Platforms</h3>
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
export default {
  name: "Profile",
  props: {
    editMode: Boolean,
  },
  components: {},
  data() {
    return {
      valid: false,
      aboutMe: "",
      aboutMeRules: [
        (v) =>
          v.length <= 170 ||
          "About me section must be less than 170 characters",
      ],
      activePicker: null,
      date: null,
      menu: false,
      country: "",
      countryList: [],
      language: "",
      languageList: [],
      userLanguages: [],
      bgUserProfile: "https://picsum.photos/id/11/500/300",
      twitterId: "",
      instagramId: "",
      discordId: "",
      twitchId: "",
    };
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
      let reader = new FileReader();
      reader.onload = (event) => {
        this.bgUserProfile = event.target.result;
      };
      reader.readAsDataURL(file);
      console.log(file);
    },
  },
  mounted() {
    this.getCountries();
    this.getLanguages();
  },
};
</script>

<style lang="scss" module>
@import "../style";

.bannerBg {
  position: relative;
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
  @extend .font-1-medium;
}

.widthFirstDesktop {
  width: 572px;
}
</style>
