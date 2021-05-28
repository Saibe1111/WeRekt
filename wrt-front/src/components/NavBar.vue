<template>
  <v-app-bar>
    <v-toolbar-title>WeRekt</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn>Log in</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  methods: {
    testFonction() {},
  },
  created() {
    console.log("NavBar created");
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" module>
@import "../style";

</style>
