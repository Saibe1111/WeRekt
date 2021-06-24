<template>
  <div>
    <v-dialog v-model="popupIsOpen" :width="width">
      <v-card :color="$style.colorCardBg" :class="$style.cardContainer">
        <div class="d-flex align-center justify-space-between">
          <v-card-title :class="$style.title" class="mt-2">
            {{ title }}
          </v-card-title>
          <v-btn fab dark outlined small class="mr-4" @click="closePopup()">
            <v-icon color="white ma-4" :class="$style.borderRadius"
              >mdi-close</v-icon
            >
          </v-btn>
        </div>
        <v-card-text class="font-2-small white--text pl-4">
          {{ message }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PopupMessage",
  props: {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    width: {
      type: Number,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      popupIsOpen: this.isOpen,
    };
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
  watch: {
    isOpen: function () {
      this.popupIsOpen = this.isOpen;
    },
  },
};
</script>

<style lang="scss" module>
@import "../style";

.cardContainer {
  background-color: $color-card-bg !important;
}

.title {
  color: $color-font-primary;
  text-transform: uppercase;
  @extend .font-1-medium-bold;
}
</style>