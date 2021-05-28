<template>
  <div :class="$style.background">
    <nav-bar />
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "Home",

  components: {
    NavBar,
  },
};
</script>

<style lang="scss" module>
@import "../style";

.background {
  background-color: $color-main-bg;
  height: 100vh;
}
</style>