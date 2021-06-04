<template>
  <div :class="$style.background">
    <NavBar />
    <ToTopBtn />
    <!-- First section -->
    <div class="d-flex justify-space-around">
      <div style="width: 572px">
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
        <h1 :class="$style.mainTitle" class="mb-2">
          Find the matching players to play with
        </h1>
        <p :class="$style.description">
          A social platform where you can join a team which meet your
          expectations
        </p>
      </div>
      <div>
        <v-img
          :src="require('../assets/home/image1.jpg')"
          height="500"
          width="500"
        ></v-img>
      </div>
    </div>
    <!-- Second section -->
    <div class="d-flex justify-space-around">
      <div>
        <v-img
          :src="require('../assets/home/image2.jpg')"
          height="500"
          width="500"
        ></v-img>
      </div>
      <div style="width: 470px">
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
        <h1 :class="$style.title" class="mb-2">Connect with people</h1>
        <p :class="$style.description">
          Don't play alone anymore. Meet people playing the same games who want
          to play them at the same time as you
        </p>
      </div>
    </div>
    <!-- Third section -->
    <h1 :class="$style.title">Find your team on any game</h1>
    <p>More than xxxx games available</p>
    <div class="gamesGrid">
      <v-row>
        <v-col v-for="n in 12" :key="n" cols="2">
          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            aspect-ratio="1"
          >
          </v-img>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import ToTopBtn from "../components/ToTopBtn";

export default {
  name: "Home",
  components: {
    NavBar,
    ToTopBtn,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" module>
@import "../style";

.background {
  background-color: $color-main-bg;
  height: 100%;
}

.chip {
  @extend .font-1-small;
}

.mainTitle {
  color: $color-font-primary;
  text-transform: uppercase;
  @extend .font-1-large-bold;
}

.title {
  color: $color-font-primary;
  @extend .font-1-large-bold;
}

.description {
  color: $color-font-primary;
  @extend .font-2-medium;
}
</style>