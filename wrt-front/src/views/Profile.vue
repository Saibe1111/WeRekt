<template>
  <div id="profile">
    <Banner
      :bgUserProfile="bgUserProfile"
      :id="this.$route.params.id"
      :editMode="false"
    />
    <v-row
      v-if="this.connectedUserID == this.$route.params.id"
      class="d-flex flex-row-reverse mt-2"
    >
      <router-link style="text-decoration: none" to="/profile/edit"
        ><v-btn class="mt-2" :class="$style.btnEdit">Edit</v-btn></router-link
      >
    </v-row>
    <div
      class="d-flex flex-column justify-space-around px-md-16 px-4 my-12 mx-4"
    >
      <v-row
        class="
          d-flex
          flex-md-row flex-column
          align-center align-md-stretch
          justify-space-between
        "
      >
        <v-col :class="$style.card" class="ma-4 px-8" cols="11" md="3">
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            About me
          </h3>
          <p
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.description
                : $style.descriptionMobile
            "
          >
            {{ this.aboutMe }}
          </p>
          <p
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.description
                : $style.descriptionMobile
            "
          >
            Birthday: {{ this.birthdayDate ? this.birthdayDate : "Unknown" }}
          </p>
          <p
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.description
                : $style.descriptionMobile
            "
          >
            Country: {{ this.country ? this.country : "Unknown" }}
          </p>
        </v-col>
        <v-col :class="[$style.card]" class="ma-4 px-8" cols="11" md="8">
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            Games
          </h3>
          <v-slide-group multiple show-arrows="always" dark class="my-4">
            <v-slide-item v-for="(game, index) in userGames" :key="index">
              <v-card
                class="ma-auto pa-4"
                height="200"
                width="150"
                color="transparent"
                elevation="0"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-img
                      :src="game.path"
                      v-on="on"
                      class="rounded-lg"
                    ></v-img>
                  </template>
                  <span>{{ game.description }}</span>
                </v-tooltip>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col :class="$style.card" class="ma-4 px-8">
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            Languages
          </h3>
          <p
            v-for="lang in userLanguages"
            :key="lang"
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.description
                : $style.descriptionMobile
            "
          >
            {{ lang }}
          </p>
        </v-col>
        <v-col :class="$style.card" class="ma-4 px-8">
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            Social media
          </h3>
          <v-row>
            <v-col class="d-flex">
              <v-img
                :src="require('../assets/profile/twitter.png')"
                :max-height="30"
                :max-width="30"
                contain
              ></v-img>
              <p
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? $style.description
                    : $style.descriptionMobile
                "
                class="ml-2"
              >
                {{ this.twitterId ? this.twitterId : "Unknown" }}
              </p>
            </v-col>
            <v-col class="d-flex">
              <v-img
                :src="require('../assets/profile/instagram.png')"
                :max-height="30"
                :max-width="30"
                contain
              ></v-img>
              <p
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? $style.description
                    : $style.descriptionMobile
                "
                class="ml-2"
              >
                {{ this.instagramId ? this.instagramId : "Unknown" }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex">
              <v-img
                :src="require('../assets/profile/discord.png')"
                :max-height="30"
                :max-width="30"
                contain
              ></v-img>
              <p
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? $style.description
                    : $style.descriptionMobile
                "
                class="ml-2"
              >
                {{ this.discordId ? this.discordId : "Unknown" }}
              </p>
            </v-col>
            <v-col class="d-flex">
              <v-img
                :src="require('../assets/profile/twitch.png')"
                :max-height="30"
                :max-width="30"
                contain
              ></v-img>
              <p
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? $style.description
                    : $style.descriptionMobile
                "
                class="ml-2"
              >
                {{ this.twitchId ? this.twitchId : "Unknown" }}
              </p>
            </v-col>
          </v-row>
        </v-col>
        <v-col :class="$style.card" class="ma-4 px-8">
          <h3
            :class="
              $vuetify.breakpoint.mdAndUp
                ? $style.secondaryTitle
                : $style.secondaryTitleMobile
            "
          >
            Platforms
          </h3>
          <v-row>
            <v-col
              v-for="(platform, index) in userPlatforms"
              :key="index"
              class="d-flex justify-center"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-img
                    :src="platform.path"
                    v-on="on"
                    class="rounded-lg"
                    max-width="100"
                    contain
                    @click="copyText(platform.description)"
                  ></v-img>
                </template>
                <span v-bind:id="platform.description">{{
                  platform.description
                }}</span>
              </v-tooltip>
              <v-snackbar
                v-model="copySnackbar"
                timeout="1000"
                content-class="text-center"
                dark
              >
                {{ snackbarText }}
              </v-snackbar>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";

export default {
  name: "Profile",
  props: {
    banner: String,
  },
  components: {
    Banner,
  },
  data() {
    return {
      connectedUserID: "",
      copySnackbar: false,
      snackbarText: "",
      // User models
      bgUserProfile: "",
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
  methods: {
    renameKey(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    },
    initSocialMedia(media) {
      switch (media.name) {
        case "Twitter":
          this.twitterId = media.username;
          break;
        case "Instagram":
          this.instagramId = media.username;
          break;
        case "Discord":
          this.discordId = media.username;
          break;
        case "Twitch":
          this.twitchId = media.username;
          break;
        default:
      }
    },
    initUserData(user) {
      console.log(user);
      this.username = user.username;
      if (user.profile_url != null) this.avatarUser = user.profile_url;
      if (this.banner != null) this.bgUserProfile = this.banner;
      else if (user.banner != null) this.bgUserProfile = user.banner;
      if (user.description != null) this.aboutMe = user.description;
      if (user.country != null) this.country = user.country;
      if (user.birthdate != null) this.birthdayDate = user.birthdate;
      if (user.languages != null) this.userLanguages = user.languages;
      if (user.platforms != null) {
        user.platforms.forEach((el) => {
          this.renameKey(el, "username", "description");
          el["path"] = require("../assets/profile/platforms/" +
            el.name +
            ".png");
        });
        this.userPlatforms = user.platforms;
      }
      if (user.games != null) {
        user.games.forEach((el) => {
          this.renameKey(el, "cover_url", "path");
          el["description"] = el.name;
        });
        this.userGames = user.games;
      }
      if (user.social_networks != null) {
        user.social_networks.forEach((el) => {
          this.initSocialMedia(el);
        });
      }
    },
    async getUser() {
      let url = process.env.VUE_APP_API_URL;
      fetch(
        `${url}/api/user?` +
          new URLSearchParams({
            id: this.$route.params.id,
          }),
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => {
          if (response.status === 404) {
            this.$router.push({
              path: "/PageNotFound",
            });
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (data) this.initUserData(data);
        });
    },
    async getConnectedUser() {
      let url = process.env.VUE_APP_API_URL;
      const res = await fetch(`${url}/api/user`, {
        method: "GET",
        credentials: "include",
      });

      const user = await res.json();

      this.connectedUserID = user.User_ID;
    },
    copyText(toCopyElementId) {
      let r = document.createRange();
      r.selectNode(document.getElementById(toCopyElementId));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      this.copySnackbar = true;
      this.snackbarText = `"${toCopyElementId}" copied to clipboard!`;
    },
  },
  mounted() {
    this.getUser();
    this.getConnectedUser();
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

.btnEdit {
  @extend .btn;
  margin-right: 30px;
}

.card {
  background-color: $color-card-bg;
  border-radius: 20px;
}

.description {
  color: $color-font-primary;
  @extend .font-2-small;
}

.descriptionMobile {
  color: $color-font-primary;
  @extend .font-2-tiny;
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
</style>
