<template>
  <div>
    <img src="{{gameIcon}}" alt="Game icon" />
    <h1>{{ roomName }}</h1>
  </div>
</template>

<style lang="scss" module>
@import "../style";
//TODO
</style>

<script>
export default {
  name: "RoomLine",
  props: {
    gameIcon: String,
    roomName: String,
  },
};
</script>
