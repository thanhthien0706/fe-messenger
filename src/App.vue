<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.initDataMe();
  },
  methods: {
    async initDataMe() {
      const token = localStorage.getItem("userToken");

      if (token && token !== "" && this.$store.state.inforMe != null) {
        await this.$store.dispatch("getMe");
      }
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss"></style>
