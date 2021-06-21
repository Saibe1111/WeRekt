<template>
  <div class="d-flex flex-column" :class="$style.background">
    <h1
      class="text-center pb-2"
      :class="$vuetify.breakpoint.mdAndUp ? $style.title : $style.titleMobile"
    >
      {{ this.selectedRoom.game + " " + this.selectedRoom.id }}
      <v-icon
        v-if="$vuetify.breakpoint.smAndDown"
        color="white"
        @click="toggleUserPanel()"
        >mdi-account-details</v-icon
      >
    </h1>
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
    <div :class="$style.description" class="mx-8">is writing...</div>
    <v-text-field
      :class="$style.inputStyle"
      class="ma-4"
      label="Chat with your friends..."
      dark
      v-model="chatInput"
      solo
      hide-details
      append-outer-icon="mdi-send"
      @keyup.enter="sendMessage"
      @click:append-outer="sendMessage()"
    ></v-text-field>
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
    selectedRoom: {
      type: Object,
    },
    messages: {
      type: Array,
    },
  },
  data() {
    return {
      chatInput: "",
      userPanel: false,
    };
  },
  methods: {
    async sendMessage() {
      if (this.chatInput) {
        await this.$emit("send-msg", this.chatInput);
        let content = this.$refs.messagesContainer;
        content.scrollTop += content.scrollHeight;
        this.chatInput = "";
      }
    },
    toggleUserPanel() {
      this.$emit("toggleUserPanel", !this.userPanel);
      this.userPanel = !this.userPanel;
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

.title {
  color: $color-font-primary;
  background-color: $color-main-bg;
  @extend .font-1-medium;
}

.titleMobile {
  color: $color-font-primary;
  background-color: $color-main-bg;
  @extend .font-1-small;
}

.inputStyle {
  @extend .font-2-small;
}

.flow {
  height: 65vh;
  overflow-y: scroll;
}

.background {
  background-color: $color-main-darker-bg;
}
</style>

