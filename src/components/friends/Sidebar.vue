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
                    @input="onSearchUser"
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
                        :key="item._id"
                      >
                        <div class="innerContent d-flex align-items-center">
                          <img
                            :src="item.avatar"
                            :alt="item.local.fullname"
                            class="rounded-circle"
                            width="50"
                            height="50"
                            style="object-fit: cover; background-color: #fff"
                          />
                          <p
                            class="textName ml-4 font-weight-bold"
                            style="flex: 1"
                          >
                            {{ item.local.fullname }}
                          </p>
                          <fa
                            :icon="['fas', 'user-plus']"
                            class=""
                            style="cursor: pointer"
                            @click="handleAddFriend(item._id)"
                          />
                        </div>
                      </li>
                    </ul>

                    <p class="text-center" v-else>Can't found users</p>
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
              <nav class="mb-n6" v-if="listFriends">
                <div class="mb- 6">
                  <small class="">Bạn bè({{ listFriends.length }})</small>
                </div>

                <!-- Friend -->
                <div
                  class="card mb-6"
                  v-for="item in listFriends"
                  :key="item._id"
                >
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img
                          class="avatar-img"
                          :src="item.avatar"
                          alt="Anna Bridges"
                        />
                      </div>

                      <div class="media-body align-self-center">
                        <h6 class="mb-0">{{ item.local.fullname }}</h6>
                      </div>
                    </div>

                    <!-- Link -->
                    <a href="chat-2.html" class="stretched-link"></a>
                  </div>
                </div>
                <!-- Friend -->
              </nav>

              <p v-else>Chưa có bạn bè</p>
              <!-- Friends -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { userService, isPending } from "@/services/UserService";
import { FriendService } from "@/services/FriendService";

export default {
  name: "SidebarHome",
  setup() {
    return { isPending };
  },
  data() {
    return {
      chooseTab: "",
      isShowDropdown: false,
      searchText: "",
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
      this.$emit("onShowTab", this.chooseTab);
    },

    async onSearchUser() {
      try {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(async () => {
          const dataRef = await userService.searchUser(this.searchText);
          console.log(dataRef);
          if (dataRef.status) {
            this.dataListUsers = dataRef.data;
          } else {
            this.dataListUsers = null;
            throw new Error("Not Found Data User");
          }
        }, 1200);
      } catch (error) {
        console.error(error.message);
      }
    },

    async handleAddFriend(idFriend) {
      try {
        const dataInvitation = {
          description: `Tôi là ${this.$store.state.inforMe.local.fullname}, muốn kết bạn với bạn`,
          receiver: idFriend,
        };

        const dataRef = await FriendService.addFriend(dataInvitation);
        console.log(dataRef);

        if (dataRef.status) {
          alert("Send Invitation Friend Successfully");
        } else {
          alert("Send Invitation Friend Faild");
          throw new Error("Not Send Invitation Friend");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  computed: {
    ...mapGetters({
      listFriends: "getListFriends",
    }),
  },
};
</script>

<style></style>
