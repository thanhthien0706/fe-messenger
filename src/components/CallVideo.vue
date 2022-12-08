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
    width: 80%;
    height: 80%;
    background-color: #fff;
    overflow: hidden;
    border-radius: 20px;

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
        <video class="streamFriend" id="streamFriend" controls autoplay></video>
        <video class="streamMe" id="streamMe" controls autoplay></video>
      </div>

      <div class="boxBtnHandler">
        <button
          type="button"
          class="btn btn-primary btn-circle btn-md mr-5 btn-video"
          :class="{ activeTag: tagVideo }"
          @click="tagVideo = !tagVideo"
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
          @click="tagMic = !tagMic"
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
  props: ["typeConversation", "dataPeerId", "statueShow", "dataStreamCall"],

  data() {
    return {
      //   peer: null,
      indexTag: null,
      tagVideo: false,
      tagMic: false,
    };
  },
  created() {
    this.initMain();
    this.startCalle();
  },
  methods: {
    initMain() {
      //   this.peer = new Peer({});

      if (this.typeConversation == "single") {
        const calleUser = this.dataPeerId[0];

        this.openStream().then((stream) => {
          this.playStream("streamMe", stream);
          const call = this.peer.call(calleUser.idPeer, stream);
          call.on("stream", (remoteStream) =>
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
          this.dataStreamCall.on("stream", (remoteStream) =>
            this.playStream("streamFriend", remoteStream)
          );
        });
      }
    },

    openStream() {
      const config = { audio: true, video: true };
      return navigator.mediaDevices.getUserMedia(config);
    },

    playStream(idVideoTag, stream) {
      const video = document.getElementById(idVideoTag);
      video.srcObject = stream;
      video.play();
    },
  },
  computed: {
    ...mapGetters({
      peer: "getPeerObject",
    }),
  },
};
</script>
