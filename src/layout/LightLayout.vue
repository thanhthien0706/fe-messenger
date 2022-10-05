<template>
  <div class="layout">
    <Navbar />

    <!-- Sidebar Start -->
    <slot name="sidebarSlot"></slot>
    <!-- Sidebar End -->

    <!-- Main Content Start -->
    <slot name="mainContentSlot"></slot>
    <!-- Main Content End -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
};
</script>

<style src="@/assets\css\template.min.css"></style>
