<template>
  <v-app>
    <v-main>
      <div :class="$style.background">
        <NavBar></NavBar>
        <ToTopBtn />
        <v-content class="mt-10">
          <router-view />
        </v-content>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import ToTopBtn from "./components/ToTopBtn";

export default {
  name: "App",
  components: {
    NavBar,
    ToTopBtn,
  },
  data: () => ({}),
};
</script>

<style lang="scss" module>
@import "./style";

.background {
  background-color: $color-main-bg;
  height: 100%;
}
</style>