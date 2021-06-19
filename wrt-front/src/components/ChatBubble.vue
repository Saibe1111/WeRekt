<template>
  <div
    class="d-flex flex-column ma-4 pa-2"
    :class="
      isSender
        ? [$style.yellowBubble, 'align-self-end']
        : [$style.blackBubble, 'align-self-start']
    "
  >
    <div class="d-flex flex-row justify-space-between">
      <div
        :class="isSender ? $style.senderBlack : $style.senderWhite"
        class="mr-8"
      >
        {{ this.sender }}
      </div>
      <div :class="isSender ? $style.textBlack : $style.textWhite">
        {{ this.timestamp }}
      </div>
    </div>
    <div :class="isSender ? $style.textBlack : $style.textWhite">
      {{ this.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBubble",
  props: {
    // On doit pouvoir différencier si le msg vient de nous ou non
    // dans le cas ou qqn a le même nom que soi
    sender: String,
    senderId: String,
    content: String,
    timestamp: String,
    isSender: Boolean,
  },
};
</script>

<style lang="scss" module>
@import "../style";

.bubble {
  border-radius: 4px;
  max-width: 80%;
}

/* Yellow bubble style start */
.yellowBubble {
  background-color: $color-secondary;
  @extend .bubble;
}

.textBlack {
  color: $color-font-secondary;
  @extend .font-2-small;
}

.senderBlack {
  font-weight: bold;
  @extend .textBlack;
}

/* Yellow bubble style end */

/* Black bubble style start */
.blackBubble {
  background-color: $color-card-bg;
  @extend .bubble;
}

.textWhite {
  color: $color-font-primary;
  @extend .font-2-small;
}

.senderWhite {
  font-weight: bold;
  @extend .textWhite;
}
/* Black bubble style end */
</style>