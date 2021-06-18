<template>
  <div id="profile">
    <Banner
      :bgUserProfile="bgUserProfile"
      :username="username"
      :avatarImg="avatarUser"
      :editMode="false"
    />
    <v-row class="d-flex flex-row-reverse mt-2">
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
          <v-slide-group multiple show-arrows="always" dark>
            <v-slide-item v-for="(game, index) in userGames" :key="index">
              <v-card class="ma-4" height="140" width="100">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-img
                      :src="game.path"
                      v-on="on"
                      height="140"
                      max-width="100"
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
                {{ this.twitterId ? this.twitterId : "Unknown" }}
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
              cols="6"
              md="3"
              class="d-flex"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-img
                    :src="platform.path"
                    v-on="on"
                    class="rounded-lg"
                  ></v-img>
                </template>
                <span>{{ platform.description }}</span>
              </v-tooltip>
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
  props: {},
  components: {
    Banner,
  },
  data() {
    return {
      // models
      bgUserProfile: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
      aboutMe:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec. nec nonummy molestie, enim est",
      avatarUser: "",
      birthdayDate: null,
      country: "",
      userLanguages: ["English", "French", "Spanish", "Italian"],
      userPlatforms: [
        {
          name: "PC",
          description: "leplusfor93",
          path: require("../assets/profile/platforms/PC.png"),
        },
        {
          name: "Play Station",
          description: "leplusnul93",
          path: require("../assets/profile/platforms/Play Station.png"),
        },
        {
          name: "Nintendo Switch",
          description: "leplusmid93",
          path: require("../assets/profile/platforms/Nintendo Switch.png"),
        },
        {
          name: "Xbox",
          description: "leplusmid93",
          path: require("../assets/profile/platforms/Xbox.png"),
        },
      ],
      userGames: [
        {
          name: "League of Legends",
          description: "League of Legends",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Minecrafteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          description: "Minecrafteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Fortnite Fortnite Fortnite Fortnite Fortnite",
          description: "Fortnite Fortnite Fortnite Fortnite Fortnite",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Valorant",
          description: "Valorant",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Rocket League",
          description: "Rocket League",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Among us",
          description: "Among us",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "League of Legends",
          description: "League of Legends",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Minecraft",
          description: "Minecraft",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Fortnite",
          description: "Fortnite",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Valorant",
          description: "Valorant",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Rocket League",
          description: "Rocket League",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          name: "Among us",
          description: "Among us",
          path: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
      ],
      username: "Truc",
      discordId: "discord id",
      twitterId: "twitter id",
      instagramId: "instagram id",
      twitchId: "",
    };
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
