<template>
  <div>
    <div class="d-flex justify">{{ editMode }}</div>
    <v-btn @click="toggleEdit">Edit</v-btn>

    <v-form v-model="valid" class="d-flex justify-space-around px-16">
      <v-col>
        <h3 :class="$style.secondaryTitle">Personal informations</h3>
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
        </div>
      </v-col>
      <v-col>
        <div>
          <h3 :class="$style.secondaryTitle">Platforms</h3>
        </div>
        <div>
          <h3 :class="$style.secondaryTitle">Social media</h3>
          <div class="d-flex">
            <div class="d-flex flex-column mr-4">
              <div class="d-flex">
                <v-img
                  :src="require('../assets/profile/twitter.png')"
                  :max-height="30"
                  :max-width="30"
                  contain
                ></v-img>
                <v-text-field
                  label="Twitter ID"
                  v-model="twitterId"
                  dark
                  outlined
                  class="mx-2"
                ></v-text-field>
              </div>
              <div class="d-flex">
                <v-img
                  :src="require('../assets/profile/instagram.png')"
                  :max-height="30"
                  :max-width="30"
                  contain
                ></v-img>
                <v-text-field
                  label="Instagram ID"
                  v-model="instagramId"
                  dark
                  outlined
                  class="mx-2"
                ></v-text-field>
              </div>
            </div>
            <div class="d-flex flex-column ml-4">
              <div class="d-flex">
                <v-img
                  :src="require('../assets/profile/discord.png')"
                  height="30"
                  width="30"
                  contain
                ></v-img>
                <v-text-field
                  label="Discord ID"
                  v-model="discordId"
                  dark
                  outlined
                  class="mx-2"
                ></v-text-field>
              </div>
              <div class="d-flex">
                <v-img
                  :src="require('../assets/profile/twitch.jpg')"
                  :max-height="30"
                  :max-width="30"
                  contain
                ></v-img>
                <v-text-field
                  label="Twitch ID"
                  v-model="twitchId"
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
  },
  mounted() {
    this.getCountries();
  },
};
</script>

<style lang="scss" module>
@import "../style";

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
