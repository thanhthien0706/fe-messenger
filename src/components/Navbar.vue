<template>
  <!-- Navbar -->
  <div class="navigation navbar navbar-light justify-content-center py-xl-7">
    <!-- Brand -->
    <a href="#" class="d-none d-xl-block mb-6">
      <img
        src="@/assets/images/brand.svg"
        class="mx-auto fill-primary"
        data-inject-svg=""
        alt=""
        style="height: 46px"
      />
    </a>

    <!-- Menu -->
    <ul
      class="nav navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center py-3 py-lg-0"
      role="tablist"
    >
      <!-- Invisible item to center nav vertically -->
      <li class="nav-item d-none d-xl-block invisible flex-xl-grow-1">
        <a class="nav-link position-relative p-0 py-xl-3" href="#" title="">
          <i class="icon-lg fe-x"></i>
        </a>
      </li>

      <!-- Chats -->
      <li class="nav-item">
        <router-link
          class="nav-link position-relative p-0 py-xl-3"
          to="/"
          :class="{ active: $route.name == 'home-page' }"
        >
          <i class="icon-lg fe-message-square"></i>
          <div
            class="badge badge-dot badge-primary badge-bottom-center"
            v-if="$route.name == 'home-page'"
          ></div>
        </router-link>
      </li>

      <!-- Friend -->
      <li class="nav-item mt-xl-9">
        <router-link
          class="nav-link position-relative p-0 py-xl-3"
          to="/ban-be"
          :class="{ active: $route.name == 'friends-page' }"
        >
          <i class="icon-lg fe-users"></i>
          <div
            class="badge badge-dot badge-primary badge-bottom-center"
            v-if="$route.name == 'friends-page'"
          ></div>
        </router-link>
      </li>

      <!-- Todo List -->
      <li class="nav-item mt-xl-9 d-xl-block flex-xl-grow-1">
        <router-link
          class="nav-link position-relative p-0 py-xl-3"
          to="/cong-viec"
          :class="{ active: $route.name == 'todo-page' }"
        >
          <i class="icon-lg fe-list"></i>
          <div
            class="badge badge-dot badge-primary badge-bottom-center"
            v-if="$route.name == 'todo-page'"
          ></div>
        </router-link>
      </li>

      <!-- Settings -->
      <li class="nav-item mt-xl-9">
        <a
          class="nav-link position-relative p-0 py-xl-3"
          title="Settings"
          @click="onSignOut"
        >
          <fa
            :icon="['fas', 'right-from-bracket']"
            class="iconHandle"
            style="cursor: pointer"
          />
        </a>
      </li>
    </ul>
    <!-- Menu -->
  </div>
  <!-- Navbar -->
</template>

<script>
import { AuthenService } from "@/services/AuthenService";
export default {
  name: "NavbarComponent",
  data() {
    return {
      indexNav: 0,
    };
  },
  methods: {
    changeShowNav(index) {
      this.indexNav = index;
    },
    onSignOut() {
      AuthenService.logoutAccount;
      this.$router.push("/dang-nhap");
    },
  },
};
</script>

<style></style>
