<template>
  <v-app-bar
    app
    clipped-left
    fixed
    :color="$style.colorMainBg"
    elevate-on-scroll
  >
    <v-toolbar-title>
      <router-link :to="isLog ? '/play' : '/'" :class="$style.logo"
        >WeRekt</router-link
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="isLog" class="mr-5">
      <v-icon class="mr-5" color="white" size="24" @click="redirect('play')"
        >mdi-magnify</v-icon
      >
      <v-icon class="mr-5" color="white" size="24" @click="redirect('chat')"
        >mdi-forum</v-icon
      >
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="white" size="36" v-bind="attrs" v-on="on"
            >mdi-account-circle
          </v-icon>
        </template>
        <v-list dark :class="$style.menu">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :href="item.path"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else :class="$style.btnContainer">
      <v-btn @click="login()" :class="$style.btnLogin">Log in</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
const fetch = require("node-fetch");

export default {
  name: "NavBar",
  data() {
    return {
      ownDiscordId: "",
      isLog: false,
    };
  },
  computed: {
    menuItems() {
      return [
        {
          title: "My profile",
          path: "/profile/" + this.ownDiscordId,
        },
        {
          title: "Log out",
          path: `${process.env.VUE_APP_API_URL}/api/auth/logout`,
        },
      ];
    },
  },
  methods: {
    login() {
      let url = process.env.VUE_APP_API_URL;
      window.location.href = `${url}/api/auth/discord/`;
    },
    redirect(name) {
      this.$router.push("/" + name);
    },
    getUserState() {
      let url = process.env.VUE_APP_API_URL;
      this.isLog = false;
      fetch(`${url}/api/auth/state`, {
        method: "GET",
        credentials: "include",
      }).then((response) => (this.isLog = response.status === 200));
    },
    async getUser() {
      let url = process.env.VUE_APP_API_URL;
      const res = await fetch(`${url}/api/user/`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      this.ownDiscordId = data.User_ID;
    },
  },
  created() {
    this.getUserState();
    this.getUser();
  },
};
</script>

<style lang="scss" module>
@import "../style";

.logo {
  //color: $color-font-primary !important;
  font-weight: bold;
  background: -webkit-linear-gradient(
    45deg,
    $color-secondary,
    $color-secondary-bis
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  @extend .font-1-medium;
}

.btnLogin {
  position: relative;
  background: $color-main-bg !important;
  color: $color-font-primary !important;
  background-clip: padding-box;
  @extend .font-2-tiny-uppercase;
}

.btnLogin::after {
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  background: linear-gradient(45deg, $color-secondary, $color-secondary-bis);
  content: "";
  z-index: -1;
  border-radius: 4px;
}

.menu {
  background-color: $color-main-bg !important;
}
</style>
