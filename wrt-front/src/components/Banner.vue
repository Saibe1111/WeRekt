<template>
  <div>
    <div
      :class="
        $vuetify.breakpoint.mdAndUp ? $style.bannerBg : $style.bannerBgMobile
      "
      :style="{ background: styleBgUser }"
    ></div>
    <v-file-input
      v-if="editMode"
      prepend-icon="mdi-camera-image"
      dark
      accept="image/png, image/jpeg"
      hide-input
      v-model="newBanner"
      @change="$emit('change-bg-file', newBanner)"
      :class="
        $vuetify.breakpoint.mdAndUp
          ? $style.btnChangeBg
          : $style.btnChangeBgMobile
      "
    ></v-file-input>
    <div
      :class="
        $vuetify.breakpoint.mdAndUp
          ? $style.displayAvatar
          : $style.displayAvatarMobile
      "
    >
      <AvatarUser :id="id"></AvatarUser>
    </div>
  </div>
</template>

<script>
import AvatarUser from "../components/AvatarUser.vue";

export default {
  name: "Banner",
  props: {
    bgUserProfile: String,
    username: String,
    avatarImg: String,
    editMode: Boolean,
    id: String,
  },
  data() {
    return {
      newBanner: null,
    };
  },
  components: {
    AvatarUser,
  },
  computed: {
    styleBgUser() {
      return (
        "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #1b1b1b 100%), center url('" +
        this.bgUserProfile +
        "')"
      );
    },
  },
  emits: ["change-bg-file"],
};
</script>

<style lang="scss" module>
@import "../style";

.bannerBg {
  height: 317px;
  width: 100vw;
}

.bannerBgMobile {
  height: 150px;
  width: 100vw;
}

.btnChangeBg {
  position: absolute;
  top: 255px;
  right: 20px;
}

.btnChangeBgMobile {
  position: absolute;
  top: 70px;
  right: 20px;
}

.displayAvatar {
  position: absolute;
  top: 85px;
  margin-left: -75px;
  left: 50%;
}

.displayAvatarMobile {
  position: absolute;
  top: 55px;
  margin-left: -50px;
  left: 50%;
}
</style>