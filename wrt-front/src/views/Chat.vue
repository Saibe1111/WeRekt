<template>
  <div id="chat">
    <v-col>
      <RoomLine
        gameIcon="https://g6k7x4j6.stackpathcdn.com/wp-content/uploads/2020/06/Install-macOS-Big-Sur-on-VirtualBox-1000x563.jpg"
        roomName="Test"
    /></v-col>
    <v-col> </v-col>
    <v-col> </v-col>
  </div>
</template>

<script>
export default {
  name: "Chat",
};
</script>

<style lang="scss" module>
@import "../style";

.bigTitle {
  color: $color-font-primary;
  @extend .font-1-extra-large;
}

.subtitle {
  color: $color-font-primary;
  @extend .font-1-large;
}
</style>