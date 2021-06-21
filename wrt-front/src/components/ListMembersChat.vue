<template>
  <div :class="$style.container">
    <AvatarUser
      class="mb-5"
      v-for="member in members"
      :key="member.User_ID"
      :id="member.User_ID"
      :username="member.username"
      :avatarImg="member.profile_url"
      :mini="true"
      :canRedirect="true"
    >
    </AvatarUser>
  </div>
</template>

<script>
import AvatarUser from "../components/AvatarUser.vue";
export default {
  name: "ListMembersChat",
  components: {
    AvatarUser,
  },
  props: {
    members: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" module>
.parent {
  height: 90vh;
  width: 100px;
  overflow: hidden;
  position: relative;
}

.container {
  height: 90vh;
  width: 70px;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}
.container::-webkit-scrollbar {
  /* WebKit */
  width: 0;
  height: 0;
}
</style>