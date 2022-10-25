<template>
  <router-view />
</template>

<script>
import { WebsocketService } from "@/services/WebsocketService";
import { mapGetters } from "vuex";

export default {
  created() {
    this.nConnect();
  },
  methods: {
    nConnect() {
      if (this.myInfor) {
        WebsocketService(this.myInfor);
      }
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
