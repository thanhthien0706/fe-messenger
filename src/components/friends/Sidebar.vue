<style scoped>
.formCustomSearch {
}
.showDropdown {
  z-index: 99999;
  background-color: #edeef6;
  border-radius: 0.375rem;
}

.dropdown-item-custom:last-child {
  margin-bottom: 0 !important;
  border-radius: 0.375rem;
}
</style>

<template>
  <div class="sidebar">
    <div class="tab-content h-100" role="tablist">
      <div
        class="tab-pane fade h-100 show active"
        id="tab-content-friends"
        role="tabpanel"
      >
        <div class="d-flex flex-column h-100">
          <div class="hide-scrollbar">
            <div class="container-fluid py-6">
              <!-- Title -->
              <h2 class="font-bold mb-6">Friends</h2>
              <!-- Title -->

              <!-- Search -->
              <form class="formCustomSearch mb-6 position-relative">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Tìm kiếm bằng email hoặc SĐT"
                    aria-label="Search for messages or users..."
                    v-model="searchText"
                    @input="handleSearch"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-lg btn-ico btn-secondary btn-minimal"
                    >
                      <i class="fe-search"></i>
                    </button>
                  </div>
                </div>

                <div
                  class="showDropdown py-5 px-4 position-absolute w-100"
                  v-if="searchText"
                >
                  <div v-if="!isPending">
                    <ul
                      class="dropdown-menu-custom d-flex flex-column"
                      v-if="dataListUsers"
                    >
                      <li
                        class="dropdown-item-custom py-4 px-4 bg-light mb-4"
                        v-for="item in dataListUsers"
                        :key="item.id"
                      >
                        <div class="innerContent d-flex align-items-center">
                          <img
                            :src="item.avatar"
                            :alt="item.fullName"
                            class="rounded-circle"
                            width="50"
                            height="50"
                          />
                          <p
                            class="textName ml-4 font-weight-bold"
                            style="flex: 1"
                          >
                            {{ item.fullName }}
                          </p>
                          <fa
                            :icon="['fas', 'user-plus']"
                            class=""
                            style="cursor: pointer"
                            @click="handleAddFriend(item.id)"
                          />
                        </div>
                      </li>
                    </ul>

                    <p class="text-center" v-else>Không tìm thấy kết quả</p>
                  </div>
                  <div class="text-center" v-else>
                    <LoadingView :isPending="isPending" />
                  </div>
                </div>
              </form>
              <!-- Search -->

              <!-- Button -->
              <button
                type="button"
                class="btn btn-lg btn-block btn-secondary d-flex align-items-center mb-6"
                :class="{ active: chooseTab == 'list' }"
                @click="emitChooseTab('list')"
              >
                Danh sách kết bạn
                <i class="fe-user-plus ml-auto"></i>
              </button>

              <!-- Button -->
              <button
                type="button"
                class="btn btn-lg btn-block btn-secondary d-flex align-items-center mb-6"
                :class="{ active: chooseTab == 'group' }"
                @click="emitChooseTab('group')"
              >
                Danh sách nhóm
                <i class="fe-users ml-auto"></i>
              </button>

              <!-- Friends -->
              <nav class="mb-n6">
                <div class="mb- 6">
                  <small class="">Bạn bè(20)</small>
                </div>

                <div class="mb-6">
                  <small class="text-uppercase">A</small>
                </div>

                <!-- Friend -->
                <div class="card mb-6">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar avatar-online mr-5">
                        <img
                          class="avatar-img"
                          src="@/assets\images\avatars\10.jpg"
                          alt="Anna Bridges"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">Anna Bridges</h6>
                        <small class="text-muted">Online</small>
                      </div>

                      <div class="align-self-center ml-5">
                        <div class="dropdown z-index-max">
                          <a
                            href="#"
                            class="btn btn-sm btn-ico btn-link text-muted w-auto"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              New chat <span class="ml-auto fe-edit-2"></span>
                            </a>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              Delete <span class="ml-auto fe-trash-2"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="chat-2.html" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend -->

                <div class="mb-6">
                  <small class="text-uppercase">B</small>
                </div>

                <!-- Friend -->
                <div class="card mb-6">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img
                          class="avatar-img"
                          src="@/assets\images\avatars\6.jpg"
                          alt="Brian Dawson"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">Brian Dawson</h6>
                        <small class="text-muted">last seen 2 hours ago</small>
                      </div>

                      <div class="align-self-center ml-5">
                        <div class="dropdown z-index-max">
                          <a
                            href="#"
                            class="btn btn-sm btn-ico btn-link text-muted w-auto"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              New chat <span class="ml-auto fe-edit-2"></span>
                            </a>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              Delete <span class="ml-auto fe-trash-2"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="#" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend -->

                <div class="mb-6">
                  <small class="text-uppercase">L</small>
                </div>

                <!-- Friend -->
                <div class="card mb-6">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img
                          class="avatar-img"
                          src="@/assets\images\avatars\5.jpg"
                          alt="Leslie Sutton"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">Leslie Sutton</h6>
                        <small class="text-muted">last seen 3 days ago</small>
                      </div>

                      <div class="align-self-center ml-5">
                        <div class="dropdown z-index-max">
                          <a
                            href="#"
                            class="btn btn-sm btn-ico btn-link text-muted w-auto"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              New chat <span class="ml-auto fe-edit-2"></span>
                            </a>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              Delete <span class="ml-auto fe-trash-2"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="#" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend -->

                <div class="mb-6">
                  <small class="text-uppercase">M</small>
                </div>

                <!-- Friend -->
                <div class="card mb-6">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img
                          class="avatar-img"
                          src="@/assets\images\avatars\4.jpg"
                          alt="Matthew Wiggins"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">Matthew Wiggins</h6>
                        <small class="text-muted">last seen 3 days ago</small>
                      </div>

                      <div class="align-self-center ml-5">
                        <div class="dropdown z-index-max">
                          <a
                            href="#"
                            class="btn btn-sm btn-ico btn-link text-muted w-auto"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              New chat <span class="ml-auto fe-edit-2"></span>
                            </a>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              Delete <span class="ml-auto fe-trash-2"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="#" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend -->

                <div class="mb-6">
                  <small class="text-uppercase">S</small>
                </div>

                <!-- Friend -->
                <div class="card mb-6">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img
                          class="avatar-img"
                          src="@/assets\images\avatars\7.jpg"
                          alt="Simon Hensley"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">Simon Hensley</h6>
                        <small class="text-muted">last seen 3 days ago</small>
                      </div>

                      <div class="align-self-center ml-5">
                        <div class="dropdown z-index-max">
                          <a
                            href="#"
                            class="btn btn-sm btn-ico btn-link text-muted w-auto"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              New chat <span class="ml-auto fe-edit-2"></span>
                            </a>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              Delete <span class="ml-auto fe-trash-2"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="#" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend -->

                <div class="mb-6">
                  <small class="text-uppercase">W</small>
                </div>

                <!-- Friend -->
                <div class="card mb-6">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img
                          class="avatar-img"
                          src="@/assets\images\avatars\9.jpg"
                          alt="William Wright"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">William Wright</h6>
                        <small class="text-muted">last seen 3 days ago</small>
                      </div>

                      <div class="align-self-center ml-5">
                        <div class="dropdown z-index-max">
                          <a
                            href="#"
                            class="btn btn-sm btn-ico btn-link text-muted w-auto"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              New chat <span class="ml-auto fe-edit-2"></span>
                            </a>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              Delete <span class="ml-auto fe-trash-2"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="#" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend --><!-- Friend -->
                <div class="card mb-6">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img
                          class="avatar-img"
                          src="@/assets\images\avatars\3.jpg"
                          alt="William Greer"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">William Greer</h6>
                        <small class="text-muted"
                          >last seen 10 minutes ago</small
                        >
                      </div>

                      <div class="align-self-center ml-5">
                        <div class="dropdown z-index-max">
                          <a
                            href="#"
                            class="btn btn-sm btn-ico btn-link text-muted w-auto"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              New chat <span class="ml-auto fe-edit-2"></span>
                            </a>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              Delete <span class="ml-auto fe-trash-2"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="#" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend -->

                <div class="mb-6">
                  <small class="text-uppercase">Z</small>
                </div>

                <!-- Friend -->
                <div class="card mb-6">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img
                          class="avatar-img"
                          src="@/assets\images\avatars\7.jpg"
                          alt="Zane Mayes"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">Zane Mayes</h6>
                        <small class="text-muted">last seen 3 days ago</small>
                      </div>

                      <div class="align-self-center ml-5">
                        <div class="dropdown z-index-max">
                          <a
                            href="#"
                            class="btn btn-sm btn-ico btn-link text-muted w-auto"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              New chat <span class="ml-auto fe-edit-2"></span>
                            </a>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              Delete <span class="ml-auto fe-trash-2"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="#" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend -->
              </nav>
              <!-- Friends -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarHome",
  setup() {},
  data() {
    return {
      chooseTab: "",
      isShowDropdown: false,
      searchText: null,
      typingTimer: null,
      doneTypingInterval: 3000,
      dataListUsers: null,
    };
  },
  mounted() {
    this.emitChooseTab("list");
  },
  methods: {
    emitChooseTab(nameTab) {
      this.chooseTab = nameTab;
      // this.$emit("onShowTab", this.chooseTab);
    },
  },
};
</script>

<style></style>
