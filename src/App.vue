<style>
.boxText {
  position: fixed;
  z-index: 99999;
}
</style>

<template>
  <router-view />
  <CallVideoView
    :statueShow="statueShow"
    v-if="statueShow"
    :dataStreamCall="dataStreamCall"
    :inforCaller="inforCaller"
    :onHandleCloseCall="onHandleCloseCall"
    @sendCloseCall="sendCloseCall($event)"
    ref="callVideoView"
  />
</template>

<script>
import Peer from "peerjs";

export default {
  data() {
    return {
      statueShow: false,
      dataStreamCall: null,
      onHandleCloseCall: false,
      inforCaller: null,
    };
  },
  created() {
    this.mainInit();
  },
  methods: {
    async mainInit() {
      await this.initDataMe();
      await this.initListFriends();
      await this.initListGroupChats();
      if (this.$store.state.inforMe) {
        await this.onConnectPeer();
      }
    },
    async initDataMe() {
      const token = localStorage.getItem("userToken");

      if (token && token !== "" && this.$store.state.inforMe == null) {
        await this.$store.dispatch("getMe");
      }
    },

    async initListFriends() {
      const token = localStorage.getItem("userToken");

      if (token && token !== "" && this.$store.state.listFriends == null) {
        await this.$store.dispatch("getListFriends");
      }
    },

    async initListGroupChats() {
      const token = localStorage.getItem("userToken");

      if (token && token !== "" && this.$store.state.listGroupChats == null) {
        await this.$store.dispatch("findListGroupChats");
      }
    },

    async onConnectPeer() {
      const peer = new Peer({});
      this.$store.commit("PEER_OBJECT", peer);
      peer.on("open", (id) => {
        this.$store.commit("PEER_OPEN", id);
        this.$socket.emit("clientSubscribePeerId", {
          idUser: this.$store.state.inforMe._id,
          idPeer: id,
        });
      });

      //Callee
      peer.on("call", (call) => {
        this.statueShow = true;
        this.dataStreamCall = call;
      });
    },

    sendCloseCall(event) {
      this.statueShow = event;
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";
</style>
