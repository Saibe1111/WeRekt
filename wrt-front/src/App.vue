<template>
  <v-app>
    <v-main class="pa-0">
      <div :class="$style.background">
        <NavBar></NavBar>
        <ToTopBtn />
        <v-main>
          <router-view />
          <Footer />
        </v-main>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ToTopBtn from "./components/ToTopBtn";

export default {
  name: "App",
  components: {
    NavBar,
    ToTopBtn,
    Footer,
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