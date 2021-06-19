<template>
  <div class="d-flex flex-column align-center">
    <v-avatar
      :color="$style.colorMainBg"
      :size="mini ? 70 : $vuetify.breakpoint.mdAndUp ? 150 : 75"
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
          ? $style.usernameMobile
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
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    avatarImg: {
      type: String,
      default: "",
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
  methods: {
    redirectProfile() {
      if (this.canRedirect) this.$router.push("/profile/" + this.id);
    },
  },
};
</script>

<style lang="scss" module>
@import "../style";

.cursorPointer {
  cursor: pointer;
}

.username {
  color: white;
  font-weight: bold;
  @extend .font-2-medium;
}

.usernameMobile {
  color: white;
  font-weight: bold;
  @extend .font-2-small;
}
</style>