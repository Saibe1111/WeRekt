<template>
  <div class="d-block" :class="$style.sectionHeight">
    <div class="d-flex justify-center text-center mt-16">
      <!-- <h1
        :class="$vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile"
      >
        What game do you want to
      </h1>
      <h1
        :class="
          $vuetify.breakpoint.mdAndUp
            ? $style.coloredTitle
            : $style.coloredTitleMobile
        "
        class="mx-2 px-2"
      >
        play
      </h1>
      <h1
        :class="$vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile"
      >
        ?
      </h1> -->

      <h1
        :class="$vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile"
      >
        What game do you want to
        <span
          :class="
            $vuetify.breakpoint.mdAndUp
              ? $style.coloredTitle
              : $style.coloredTitleMobile
          "
          class="px-2 py-4 mr-2"
          >play</span
        >?
      </h1>
    </div>
    <div class="d-flex align-center flex-md-row">
      <v-text-field
        label="Choose a game"
        v-model="chosenGame"
        dark
        outlined
      ></v-text-field>
      <v-btn :class="$style.btn">Play</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Play",
  components: {},
  data() {
    return {};
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

.mainTitle {
  color: $color-font-primary;
  text-transform: uppercase;
  @extend .font-1-large-bold;
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
</style>