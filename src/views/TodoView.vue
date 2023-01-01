<template>
  <LightLayoutVue>
    <template v-slot:sidebarSlot>
      <SidebarTodoList
        @onShowTab="onShowTab"
        @onEmitInforWork="onEmitInforWork"
      />
    </template>
    <template v-slot:mainContentSlot>
      <MainContentTodoList
        :nameTabChoose="nameTabChoose"
        :inforWork="inforWork"
      />
    </template>
  </LightLayoutVue>
</template>

<script>
import LightLayoutVue from "@/layout/LightLayout.vue";
import SidebarTodoList from "@/components/to-do-list/Sidebar.vue";
import MainContentTodoList from "@/components/to-do-list/MainContent.vue";

export default {
  name: "TodoView",
  components: { LightLayoutVue, SidebarTodoList, MainContentTodoList },
  data() {
    return {
      nameTabChoose: "",
      inforWork: null,
    };
  },
  methods: {
    onShowTab(tabName) {
      this.nameTabChoose = tabName;
    },

    onEmitInforWork(work) {
      this.inforWork = work;
    },
  },
};
</script>

<style></style>
