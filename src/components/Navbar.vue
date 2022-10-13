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

      <!-- Create group -->
      <!-- <li class="nav-item">
        <a
          class="nav-link position-relative p-0 py-xl-3"
          data-toggle="tab"
          href="#tab-content-create-chat"
          title="Create chat"
          role="tab"
        >
          <i class="icon-lg fe-edit"></i>
        </a>
      </li> -->

      <!-- Chats -->
      <li class="nav-item mt-xl-9">
        <router-link
          class="nav-link position-relative p-0 py-xl-3"
          data-toggle="tab"
          title="Chats"
          role="tab"
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
          data-toggle="tab"
          title="Friends"
          role="tab"
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

      <!-- Profile -->
      <li
        class="nav-item mt-xl-9 d-none d-xl-block flex-xl-grow-1"
        @click="changeShowNav(2)"
      >
        <router-link
          class="nav-link position-relative p-0 py-xl-3"
          data-toggle="tab"
          href="#tab-content-user"
          title="User"
          role="tab"
          to="/nguoi-dung"
          :class="{ active: $route.name == 'friends-page' }"
        >
          <i class="icon-lg fe-user"></i>
          <div
            class="badge badge-dot badge-primary badge-bottom-center"
            v-if="$route.name == 'friends-page'"
          ></div>
        </router-link>
      </li>

      <!-- Demo only: Documentation -->
      <!-- <li class="nav-item mt-xl-9 d-none d-xl-block flex-xl-grow-1">
        <a
          class="nav-link position-relative p-0 py-xl-3"
          data-toggle="tab"
          href="#tab-content-demos"
          title="Demos"
          role="tab"
        >
          <i class="icon-lg fe-layers"></i>
        </a>
      </li> -->

      <!-- Settings -->
      <li class="nav-item mt-xl-9">
        <router-link
          class="nav-link position-relative p-0 py-xl-3"
          href="settings.html"
          title="Settings"
          to="/thiet-lap"
        >
          <i class="icon-lg fe-settings"></i>
        </router-link>
      </li>
    </ul>
    <!-- Menu -->
  </div>
  <!-- Navbar -->
</template>

<script>
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
  },
};
</script>

<style></style>
