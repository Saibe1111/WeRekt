<template>
  <div class="d-flex flex-column align-center">
    <v-avatar
      :color="$style.colorMainBg"
      :size="mini ? 55 : $vuetify.breakpoint.mdAndUp ? 150 : 75"
    >
      <v-img
        v-if="avatarImg"
        :src="avatarImg"
        :class="canRedirect ? $style.cursorPointer : ''"
        @click="redirectProfile()"
      ></v-img>
      <v-icon
        v-else
        :size="mini ? 75 : $vuetify.breakpoint.mdAndUp ? 200 : 100"
        :color="$style.colorSecondary"
      >
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <span
      :class="
        mini
          ? $style.chat
          : $vuetify.breakpoint.mdAndUp
          ? $style.username
          : $style.usernameMobile
      "
      >{{ username }}</span
    >
  </div>
</template>

<script>
export default {
  name: "AvatarUser",
  props: {
    id: {
      type: String,
      required: true,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    canRedirect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      username: "",
      avatarImg: "",
    };
  },
  methods: {
    redirectProfile() {
      if (this.canRedirect) this.$router.push("/profile/" + this.id);
    },
    initUserData(user) {
      this.username = user.username;
      this.avatarImg = user.profile_url;
    },
    async getUser() {
      let url = process.env.VUE_APP_API_URL;
      fetch(
        `${url}/api/user?` +
          new URLSearchParams({
            id: this.id,
          }),
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => {
          if (response.status === 404) {
            console.log("error id");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (data) this.initUserData(data);
        });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss" module>
@import "../style";

.chat {
  color: $color-font-primary;
  @extend .font-2-tiny;
}

.cursorPointer {
  cursor: pointer;
}

.username {
  color: $color-font-primary;
  font-weight: bold;
  @extend .font-2-medium;
}

.usernameMobile {
  color: $color-font-primary;
  font-weight: bold;
  @extend .font-2-small;
}
</style>