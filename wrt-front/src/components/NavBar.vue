<template>
  <v-app-bar :color="$style.colorMainBg">
    <v-toolbar-title :class="$style.logo">WeRekt</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="isLog">
      <v-icon color="white" size="24">mdi-magnify</v-icon>
      <v-icon color="white" size="36">mdi-account-circle</v-icon>
    </div>
    <div v-else :class="$style.btnContainer">
      <v-btn v-on:click="login" :class="$style.btnLogin">Log in</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
const fetch = require("node-fetch");

export default {
  name: "NavBar",
  data() {
    return {
      isLog:false
    };
  },
  methods: {
    testFonction() {},
    login() {
      window.location.href = 'http://localhost:3000/api/auth/discord/'
    },
  },
  created() {
    console.log("NavBar created");
    this.isLog = false;
    fetch('http://localhost:3000/api/auth', {method:'GET',
        credentials: 'include'
      })
    .then(
        response => response.json()
    ).then(function(data){
        return new Promise(function(resolve) {
        if(data.user){
          resolve(true);
        }
        resolve(false);
        });
    }).then((state) => this.isLog = state);
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" module>
@import "../style";

.logo {
  color: $color-font-primary !important;
  @extend .font-1-medium;
}

.btnLogin {
  position: relative;
  background: $color-main-bg !important;
  color: $color-font-primary !important;
  background-clip: padding-box;
  @extend .font-2-tiny-uppercase;
}

.btnLogin::after{
    position: absolute;
    top: -2px; bottom: -2px;
    left: -2px; right: -2px;
    background: linear-gradient(45deg, $color-secondary, $color-secondary-bis);
    content: '';
    z-index: -1;
    border-radius: 4px;
}

</style>
