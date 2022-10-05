<template>
  <LightLayoutVue>
    <template v-slot:sidebarSlot>
      <SidebarFriendVue />
    </template>
  </LightLayoutVue>
</template>

<script>
import LightLayoutVue from "@/layout/LightLayout.vue";
import SidebarFriendVue from "@/components/friends/Sidebar.vue";

export default {
  name: "FriendsView",
  components: { LightLayoutVue, SidebarFriendVue },
};
</script>

<style></style>
