<template>
  <div>
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
</style>