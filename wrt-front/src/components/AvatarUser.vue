<template>
  <div class="d-flex flex-column align-center">
    <v-avatar
      :color="$style.colorMainBg"
      :size="$vuetify.breakpoint.mdAndUp ? 150 : 75"
    >
      <v-img v-if="avatarImg" :src="avatarImg"></v-img>
      <v-icon
        v-else
        :size="$vuetify.breakpoint.mdAndUp ? 200 : 100"
        :color="$style.colorSecondary"
      >
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <span
      :class="
        $vuetify.breakpoint.mdAndUp ? $style.username : $style.usernameMobile
      "
      >{{ username }}</span
    >
  </div>
</template>

<script>
export default {
  name: "AvatarUser",
  props: {
    username: {
      type: String,
      required: true,
    },
    avatarImg: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" module>
@import "../style";

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