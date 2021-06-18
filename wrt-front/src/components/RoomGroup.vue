<template>
  <div>
    <h1>(game name) rooms</h1>
    <div v-for="game in gameList" :key="gameName">
      <RoomLine icon="" roomName="" />
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../style";
//TODO
</style>

<script>
export default {
  name: "ChatBubble",
  props: {
    // On doit pouvoir différencier si le msg vient de nous ou non
    // dans le cas ou qqn a le même nom que soi
    username: String,
    userID: Number,
    msgContent: String,
    sentAt: String,
  },
};
</script>
