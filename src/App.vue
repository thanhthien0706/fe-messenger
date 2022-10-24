<template>
  <button @click="onSocket">Click me!</button>
  <router-view />
</template>

<script>
import { WebsocketService, stompClient } from "@/services/WebsocketService";
import { mapGetters } from "vuex";

export default {
  created() {
    this.nConnect();
  },
  methods: {
    onConnected() {},
    nConnect() {
      if (this.myInfor) {
        WebsocketService(this.myInfor);
      }
    },

    onSocket() {
      const chatMessage = {
        receiverId: 13,
        thumbnail: null,
        message: "Ban dep gai lam",
        date: "now",
      };

      stompClient.send("/app/private-notifi", {}, JSON.stringify(chatMessage));
    },
  },
  computed: {
    ...mapGetters({
      myInfor: "getInforUser",
    }),
  },
  watch: {
    myInfor(newVal) {
      if (newVal) {
        this.nConnect();
      }
    },
  },
};
</script>

<style lang="scss"></style>
