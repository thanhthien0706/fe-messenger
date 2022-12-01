<template>
  <LightLayoutVue>
    <template v-slot:sidebarSlot>
      <SidebarHome @emitIndexGroup="emitIndexGroup" />
    </template>
    <template v-slot:mainContentSlot>
      <MainContentVue :indexGroup="indexGroup" />
    </template>
  </LightLayoutVue>
</template>

<script>
import LightLayoutVue from "@/layout/LightLayout.vue";
import SidebarHome from "@/components/home/Sidebar.vue";
import MainContentVue from "@/components/home/MainContent.vue";

export default {
  name: "HomeView",
  components: {
    LightLayoutVue,
    SidebarHome,
    MainContentVue,
  },
  data() {
    return {
      indexGroup: null,
    };
  },
  methods: {
    emitIndexGroup(e) {
      this.indexGroup = e;
    },
  },
};
</script>

<style></style>
