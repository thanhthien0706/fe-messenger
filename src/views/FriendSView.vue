<template>
  <LightLayoutVue>
    <template v-slot:sidebarSlot>
      <SidebarFriendVue @onShowTab="onShowTab" />
    </template>

    <template v-slot:mainContentSlot>
      <MainContentFriendVue :nameTabChoose="nameTabChoose" />
    </template>
  </LightLayoutVue>
</template>

<script>
import LightLayoutVue from "@/layout/LightLayout.vue";
import SidebarFriendVue from "@/components/friends/Sidebar.vue";
import MainContentFriendVue from "@/components/friends/MainContent.vue";

export default {
  name: "FriendsView",
  components: { LightLayoutVue, SidebarFriendVue, MainContentFriendVue },
  data() {
    return {
      nameTabChoose: "",
    };
  },
  methods: {
    onShowTab(tabName) {
      this.nameTabChoose = tabName;
    },
  },
};
</script>

<style></style>
