<template>
  <div class="layout">
    <Navbar />
    <slot />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style src="@/assets\css\template.min.css"></style>
