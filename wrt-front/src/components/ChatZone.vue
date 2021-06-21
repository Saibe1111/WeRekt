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
      <div :class="$style.description" class="mx-8">is writing...</div>
      <v-text-field
        :class="$style.inputStyle"
        class="ma-4"
        label="Chat with your friends..."
        dark
        clearable
        v-model="chatInput"
        solo
        hide-details
        append-outer-icon="mdi-send"
        @keyup.enter="sendMessage"
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
  },
  data() {
    return {
      chatInput: "",
    };
  },
  methods: {
    async sendMessage() {
      if (this.chatInput) {
        await this.$emit("send-msg", this.chatInput);
        this.scrollDown();
        this.chatInput = "";
      }
    },
    scrollDown() {
      let content = this.$refs.messagesContainer;
      content.scrollTop += content.scrollHeight;
    },
  },
  mounted() {
    this.scrollDown();
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

