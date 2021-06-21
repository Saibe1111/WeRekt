<template>
  <v-btn
    v-scroll="onScroll"
    v-show="fab"
    fab
    dark
    fixed
    bottom
    right
    tile
    @click="goToTop"
    :class="$style.btnToTop"
  >
    <v-icon>mdi-arrow-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ToTopBtn",
  data: () => ({
    fab: false,
  }),
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 40;
    },
    goToTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>

<style lang="scss" module>
@import "../style";

.btnToTop {
  background: linear-gradient(45deg, $color-secondary, $color-secondary-bis);
  color: $color-font-primary i !important;
  background-clip: padding-box;
  border-radius: 10px;
}
</style>