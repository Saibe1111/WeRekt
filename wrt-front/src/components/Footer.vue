<template>
  <v-footer padless :color="$style.colorMainBg">
    <v-col class="text-center" cols="12">
      <span :class="$style.footerText">© 2021 WeRekt</span></v-col
    >
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" module>
@import "../style";

.footerText {
  color: $color-font-primary;
  @extend .font-2-tiny;
}
</style>