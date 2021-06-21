<template>
  <div
    class="d-flex flex-column align-center justify-center"
    style="height: 80vh"
  >
    <span :class="$style.bigTitle">404</span>
    <p :class="$style.subtitle">Page Not Found</p>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style lang="scss" module>
@import "../style";

.bigTitle {
  color: $color-font-primary;
  @extend .font-1-extra-large;
}

.subtitle {
  color: $color-font-primary;
  @extend .font-1-large;
}
</style>