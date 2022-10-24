<template>
  <LightLayoutVue>
    <template v-slot:mainContentSlot>
      <div class="m">hello ban</div>
    </template>
  </LightLayoutVue>
</template>

<script>
import LightLayoutVue from "@/layout/LightLayout.vue";
export default {
  name: "NotifiView",
  components: { LightLayoutVue },
};
</script>

<style></style>
