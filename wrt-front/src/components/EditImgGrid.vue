<template>
  <div :class="$style.container" class="d-flex flex-wrap justify-space-around">
    <v-col
      v-for="(img, index) in imgList"
      :key="index"
      class="d-flex flex-column align-center mb-2"
    >
      <v-badge
        color="transparent"
        overlap
        offset-x="32"
        offset-y="20"
        :class="$style.badge"
      >
        <v-btn
          slot="badge"
          x-small
          icon
          dark
          @click="$emit('delete-img', img.name)"
        >
          <v-icon
            style="background-color: rgba(0, 0, 0, 0.5); border-radius: 50%"
            >mdi-close</v-icon
          >
        </v-btn>
        <v-card class="rounded-lg">
          <v-img :src="img.path" :height="imgHeight" :width="imgWidth"></v-img>
        </v-card>
      </v-badge>

      <span
        class="text-center"
        :class="
          $vuetify.breakpoint.mdAndUp
            ? $style.description
            : $style.descriptionMobile
        "
      >
        {{ img.description }}
      </span>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "EditImgGrid",
  props: {
    imgList: Array,
    imgHeight: String,
    imgWidth: String,
  },
  emits: ["delete-img"],
};
</script>

<style lang="scss" module>
@import "../style";
.container {
  overflow-y: scroll;
  max-height: 410px;
}

.description {
  color: $color-font-primary;
  @extend .font-2-small;
}

.descriptionMobile {
  color: $color-font-primary;
  @extend .font-2-tiny;
}
</style>