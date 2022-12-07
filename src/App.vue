<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.mainInit();
  },
  methods: {
    async mainInit() {
      await this.initDataMe();
      await this.initListFriends();
      await this.initListGroupChats();
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
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";
</style>
