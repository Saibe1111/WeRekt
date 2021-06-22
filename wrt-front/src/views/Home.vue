<template>
  <div>
    <!-- First section -->
    <div
      class="d-flex flex-column justify-space-around align-center flex-md-row"
      :class="
        $vuetify.breakpoint.mdAndUp
          ? $style.sectionHeight
          : $style.sectionHeightMobile
      "
    >
      <div
        class="ma-4"
        :class="$vuetify.breakpoint.mdAndUp ? $style.widthFirstDesktop : ''"
      >
        <div class="mb-8">
          <v-chip
            :class="$style.chip"
            class="mr-3"
            :color="$style.colorSecondary"
            >Online</v-chip
          >
          <v-chip :class="$style.chip" :color="$style.colorSecondaryBis"
            >Matchmaking service
          </v-chip>
        </div>
        <h1
          :class="
            $vuetify.breakpoint.mdAndUp
              ? $style.mainTitle
              : $style.mainTitleMobile
          "
          class="mb-2"
        >
          Find the right players for you
        </h1>
        <p
          :class="
            $vuetify.breakpoint.mdAndUp
              ? $style.description
              : $style.descriptionMobile
          "
        >
          A social platform that helps you put together the perfect team
        </p>
      </div>
      <v-img
        :src="require('../assets/home/image1.jpg')"
        :max-height="$vuetify.breakpoint.mdAndUp ? 500 : 300"
        :max-width="$vuetify.breakpoint.mdAndUp ? 500 : 300"
      ></v-img>
    </div>
    <!-- Second section -->
    <div
      class="
        d-flex
        flex-column
        justify-space-around
        align-center
        flex-md-row-reverse
      "
      :class="
        $vuetify.breakpoint.mdAndUp
          ? $style.sectionHeight
          : $style.sectionHeightMobile
      "
    >
      <div
        class="ma-4"
        :class="$vuetify.breakpoint.mdAndUp ? $style.widthSecondDesktop : ''"
      >
        <div class="mb-8">
          <v-chip
            :class="$style.chip"
            class="mr-3"
            :color="$style.colorSecondary"
            >Co-op games</v-chip
          >
          <v-chip :class="$style.chip" :color="$style.colorSecondaryBis"
            >Multiplayer</v-chip
          >
        </div>
        <h1
          :class="
            $vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile
          "
          class="mb-2"
        >
          Connect with people
        </h1>
        <p
          :class="
            $vuetify.breakpoint.mdAndUp
              ? $style.description
              : $style.descriptionMobile
          "
        >
          Don't play own your own anymore! Meet people who want to play the same
          game as you right now
        </p>
      </div>
      <v-img
        :src="require('../assets/home/image2.jpg')"
        :max-height="$vuetify.breakpoint.mdAndUp ? 500 : 300"
        :max-width="$vuetify.breakpoint.mdAndUp ? 500 : 300"
      ></v-img>
    </div>
    <!-- Third section -->
    <div class="d-flex flex-column">
      <div class="mx-4">
        <h1
          :class="
            $vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile
          "
        >
          Find your team on any game
        </h1>
        <p
          :class="
            $vuetify.breakpoint.mdAndUp
              ? $style.description
              : $style.descriptionMobile
          "
        >
          Hundreds of compatible games
        </p>
      </div>
      <div :class="$style.gamesGrid">
        <div class="d-flex justify-space-around px-16 py-10">
          <v-row v-if="this.games.length == 0">
            <v-col
              v-for="n in 12"
              :key="n"
              md="2"
              cols="4"
              class="d-flex justify-center"
            >
              <v-skeleton-loader
                :aspect-ratio="3 / 4"
                width="150"
                height="225"
                type="image"
                dark
                tile
              >
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col
              v-for="(game, index) in games"
              :key="index"
              md="2"
              cols="4"
              class="d-flex justify-center"
            >
              <v-img :src="game.cover" :aspect-ratio="3 / 4" max-width="150">
              </v-img>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-center pb-16"
      :class="
        $vuetify.breakpoint.mdAndUp
          ? $style.lastSectionHeight
          : $style.lastSectionHeightMobile
      "
    >
      <h1
        :class="$vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile"
      >
        Join us
      </h1>
      <h1
        :class="
          $vuetify.breakpoint.mdAndUp
            ? $style.coloredTitle
            : $style.coloredTitleMobile
        "
        class="mx-2 px-2"
      >
        now
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      games: [],
    };
  },
  methods: {
    async getGames() {
      let url = process.env.VUE_APP_API_URL;
      const res = await fetch(`${url}/api/games/top?nbr_games=12`, {
        method: "GET",
      });

      const data = await res.json();
      this.games = data.games;
    },
  },
  async mounted() {
    this.getGames();
  },
};
</script>

<style lang="scss" module>
@import "../style";

.chip {
  @extend .font-1-small;
}

.mainTitle {
  color: $color-font-primary;
  text-transform: uppercase;
  @extend .font-1-large-bold;
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

.mainTitleMobile {
  color: $color-font-primary;
  text-transform: uppercase;
  @extend .font-1-medium-bold;
}

.title {
  color: $color-font-primary;
  @extend .font-1-large-bold;
}

.titleMobile {
  color: $color-font-primary;
  @extend .font-1-medium-bold;
}

.description {
  color: $color-font-primary;
  @extend .font-2-medium;
}

.descriptionMobile {
  color: $color-font-primary;
  @extend .font-2-small;
}

.footerText {
  color: $color-font-primary;
  @extend .font-2-tiny;
}

.gamesGrid {
  background-color: $color-main-darker-bg;
}

.sectionHeight {
  min-height: 70vh !important;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.sectionHeightMobile {
  min-height: 70vh !important;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 5%;
}

.lastSectionHeight {
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

.lastSectionHeightMobile {
  @extend .lastSectionHeight;
  min-height: 40vh !important;
}

.widthFirstDesktop {
  width: 572px;
}
.widthSecondDesktop {
  width: 470px;
}
</style>
