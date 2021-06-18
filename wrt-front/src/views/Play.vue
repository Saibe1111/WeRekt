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
      <span :class="$style.text">players found</span>
      <v-btn class="mt-7" :class="$style.btn" @click="cancelBtn()"
        >Cancel</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Play",
  components: {},
  data() {
    return {
      chosenGame: "",
      // prendre le nb de gens max + actuel du back
      waiting: false,
    };
  },
  methods: {
    playBtn() {
      // vérifier que le jeu chosenGame existe
      this.waiting = true;
    },
    cancelBtn() {
      this.waiting = false;
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
  min-height: 88vh !important;
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