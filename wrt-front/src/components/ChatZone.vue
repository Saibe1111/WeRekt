<template>
  <div
    class="d-flex flex-column justify-space-between"
    :class="$style.background"
  >
    <div
      class="d-flex flex-column my-4"
      :class="$style.flow"
      ref="messagesContainer"
    >
      <ChatBubble
        v-for="(msg, index) in messages"
        :key="index"
        :sender="msg.sender"
        :senderId="msg.senderId"
        :content="msg.content"
        :timestamp="msg.timestamp"
        :isSender="connectedUserID == msg.senderId"
      />
    </div>
    <div>
      <div :class="$style.description" class="mx-8">{{ messageIsTyping }}</div>
      <v-text-field
        :disabled="isDisabled"
        :class="$style.inputStyle"
        :rules="inputRules"
        class="ma-4"
        label="Chat with your friends..."
        dark
        clearable
        v-model="chatInput"
        solo
        counter="255"
        append-outer-icon="mdi-send"
        @keyup.enter="sendMessage()"
        @keydown="isWriting()"
        @click:append-outer="sendMessage()"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import ChatBubble from "../components/ChatBubble.vue";

export default {
  name: "ChatZone",
  components: {
    ChatBubble,
  },
  props: {
    connectedUserID: {
      type: String,
    },
    messages: {
      type: Array,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      chatInput: "",
      inputRules: [(v) => v.length < 256 || "Max 255 characters"],
      messageIsTyping: "",
    };
  },
  methods: {
    async sendMessage() {
      if (this.chatInput.length > 256) {
        return;
      }
      if (this.chatInput) {
        await this.$emit("send-msg", this.chatInput);
        this.chatInput = "";
      }
    },
    isWriting() {
      // console.log("writing");
      // let typingTimer;
      // let doneTypingInterval = 5000;

      this.messageIsTyping = this.connectedUserID + " is typing...";
    },
    scrollDown() {
      let content = this.$refs.messagesContainer;
      content.scrollTop = content.scrollHeight;
    },
  },
  watch: {
    messages: function () {
      setTimeout(() => {
        this.scrollDown();
      }, 10);
    },
  },
};
</script>


<style lang="scss" module>
@import "../style";

.description {
  color: $color-font-primary;
  @extend .font-2-tiny;
}

.inputStyle {
  @extend .font-2-small;
}

.flow {
  height: 70vh;
  overflow-y: scroll;
}

.background {
  background-color: $color-main-darker-bg;
}
</style>

