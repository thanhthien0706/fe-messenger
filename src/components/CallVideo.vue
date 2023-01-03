<style lang="scss" scoped>
.CallvideoShow {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .innerContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    height: 600px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 20px;

    .boxVideoCall {
      width: 100%;
      height: 100%;
    }

    .streamFriend {
      width: 100%;
      height: 100%;
    }

    .streamMe {
      position: absolute;
      z-index: 99999;
      right: 30px;
      bottom: 30px;
      width: 200px;
      height: 200px;
    }
  }
}

.btn-circle.btn-sm {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  font-size: 8px;
  text-align: center;
}
.btn-circle.btn-md {
  width: 50px;
  height: 50px;
  padding: 7px 10px;
  border-radius: 25px;
  font-size: 10px;
  text-align: center;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 12px;
  text-align: center;
}

.boxBtnHandler {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  .btn-video,
  .btn-mic {
    opacity: 0.5;
  }

  .btn-video:hover,
  .btn-mic:hover {
    opacity: 1;
  }

  .activeTag {
    opacity: 1;
  }

  .iconHandle {
    width: 20px;
    height: 20px;
    margin: 0;
    padding: 0;
  }
}
</style>

<template>
  <div class="CallvideoShow" v-if="statueShow">
    <div class="innerContent">
      <div class="boxVideoCall">
        <video class="streamFriend" id="streamFriend"></video>
        <video class="streamMe" id="streamMe"></video>
      </div>

      <div class="boxBtnHandler">
        <button
          type="button"
          class="btn btn-primary btn-circle btn-md mr-5 btn-video"
          :class="{ activeTag: tagVideo }"
          @click="pauseStreamVideo('streamMe')"
        >
          <fa
            :icon="['fas', 'video-slash']"
            class="iconHandle"
            style="cursor: pointer"
          />
        </button>

        <button
          type="button"
          class="btn btn-warning btn-circle btn-md mr-5 btn-mic"
          :class="{ activeTag: tagMic }"
          @click="pauseStreamAudio('streamMe')"
        >
          <fa
            :icon="['fas', 'microphone-slash']"
            class="iconHandle"
            style="cursor: pointer"
          />
        </button>

        <button
          type="button"
          class="btn btn-danger btn-circle btn-md btn-phone"
          @click="onCallOff"
        >
          <fa
            :icon="['fas', 'phone-slash']"
            class="iconHandle"
            style="cursor: pointer"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import Peer from "peerjs";
import { mapGetters } from "vuex";

export default {
  name: "CallVideoComponent",
  props: [
    "typeConversation",
    "dataPeerId",
    "inforCaller",
    "statueShow",
    "dataStreamCall",
    "onHandleCloseCall",
  ],

  data() {
    return {
      //   peer: null,
      indexTag: null,
      tagVideo: false,
      tagMic: false,
      streamMe: null,
      caller: null,
    };
  },
  created() {
    this.initMain();
    this.startCalle();
  },
  methods: {
    onCallOff() {
      this.closeAllCall();
    },
    closeAllCall() {
      this.closeStream("streamMe");
      this.closeStream("streamFriend");

      if (this.caller) {
        this.caller.close();
      }

      if (this.dataStreamCall) {
        this.dataStreamCall.close();
      }
      this.$emit("sendCloseCall", false);
    },

    initMain() {
      if (this.typeConversation == "single") {
        const calleUser = this.dataPeerId[0];

        this.openStream().then((stream) => {
          this.playStream("streamMe", stream);
          this.caller = this.peer.call(calleUser.idPeer, stream);
          this.caller.on("stream", (remoteStream) =>
            this.playStream("streamFriend", remoteStream)
          );
        });
      }
    },

    startCalle() {
      if (this.dataStreamCall) {
        this.openStream().then((stream) => {
          this.dataStreamCall.answer(stream);
          this.playStream("streamMe", stream);
          this.dataStreamCall.on("stream", (remoteStream) => {
            console.log(remoteStream);
            this.playStream("streamFriend", remoteStream);
          });
        });
      }
    },

    openStream() {
      const config = { audio: true, video: true };
      return navigator.mediaDevices.getUserMedia(config);
    },

    closeStream(idVideo) {
      const video = document.getElementById(idVideo);
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      video.srcObject = null;
    },

    pauseStreamVideo(idVideo) {
      this.tagVideo = !this.tagVideo;
      const video = document.getElementById(idVideo);
      const stream = video.srcObject;
      var tracks = stream.getTracks();

      const myVideo = tracks.filter((track) => track.kind === "video")[0];

      if (this.tagVideo) {
        myVideo.enabled = false;
      } else {
        myVideo.enabled = true;
      }
    },

    pauseStreamAudio(idVideo) {
      this.tagMic = !this.tagMic;
      const video = document.getElementById(idVideo);
      const stream = video.srcObject;
      var tracks = stream.getTracks();

      const myAudio = tracks.filter((track) => track.kind === "audio")[0];

      if (this.tagMic) {
        myAudio.enabled = false;
      } else {
        myAudio.enabled = true;
      }
    },

    checkVideoEnded(video) {
      if (video.ended) {
        console.log("Video stream has ended");
      } else {
        console.log("Video stream khong dung");
        setTimeout(this.checkVideoEnded, 500);
      }
    },

    playStream(idVideoTag, stream) {
      const video = document.getElementById(idVideoTag);
      video.srcObject = stream;
      video.play();
      video.addEventListener("timeupdate", this.checkVideoEnded(video));
    },
  },
  computed: {
    ...mapGetters({
      peer: "getPeerObject",
    }),
  },
  watch: {
    onHandleCloseCall(newVal) {
      if (newVal) {
        console.log("thay doi true");
        this.closeAllCall();
      }
    },
  },
};
</script>
