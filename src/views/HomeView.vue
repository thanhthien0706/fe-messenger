<template>
  <LightLayoutVue>
    <template v-slot:sidebarSlot> <SidebarHome /> </template>
    <template v-slot:mainContentSlot> <MainContentVue /> </template>
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
};
</script>

<style></style>
