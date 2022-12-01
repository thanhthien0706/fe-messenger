<template>
  <div class="sidebar">
    <div class="tab-content h-100" role="tablist">
      <div
        class="tab-pane fade h-100 show active"
        id="tab-content-dialogs"
        role="tabpanel"
      >
        <div class="d-flex flex-column h-100">
          <div class="hide-scrollbar">
            <div class="container-fluid py-6">
              <!-- Title -->
              <h2 class="font-bold mb-6">Chats</h2>
              <!-- Title -->

              <!-- Search -->
              <form class="mb-6">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Search for messages or users..."
                    aria-label="Search for messages or users..."
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-lg btn-ico btn-secondary btn-minimal"
                      type="submit"
                    >
                      <i class="fe-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <!-- Search -->

              <!-- Favourites -->
              <div
                class="text-center hide-scrollbar d-flex my-7"
                data-horizontal-scroll=""
              >
                <a href="#" class="d-block text-reset mr-7 mr-lg-6">
                  <div class="avatar avatar-sm avatar-online mb-3">
                    <img
                      class="avatar-img"
                      src="@/assets\images\avatars\2.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div class="small">William</div>
                </a>

                <a href="#" class="d-block text-reset mr-7 mr-lg-6">
                  <div class="avatar avatar-sm avatar-online mb-3">
                    <img
                      class="avatar-img"
                      src="@/assets\images\avatars\3.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div class="small">Simon</div>
                </a>

                <a href="#" class="d-block text-reset mr-7 mr-lg-6">
                  <div class="avatar avatar-sm avatar-online mb-3">
                    <img
                      class="avatar-img"
                      src="@/assets\images\avatars\4.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div class="small">Thomas</div>
                </a>

                <a href="#" class="d-block text-reset mr-7 mr-lg-6">
                  <div class="avatar avatar-sm avatar-online mb-3">
                    <img
                      class="avatar-img"
                      src="@/assets\images\avatars\5.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div class="small">Zane</div>
                </a>

                <a href="#" class="d-block text-reset mr-7 mr-lg-6">
                  <div class="avatar avatar-sm mb-3">
                    <img
                      class="avatar-img"
                      src="@/assets\images\avatars\6.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div class="small">Thomas</div>
                </a>

                <a href="#" class="d-block text-reset mr-7 mr-lg-6">
                  <div class="avatar avatar-sm mb-3">
                    <img
                      class="avatar-img"
                      src="@/assets\images\avatars\7.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div class="small">William</div>
                </a>

                <a href="#" class="d-block text-reset mr-7 mr-lg-6">
                  <div class="avatar avatar-sm mb-3">
                    <img
                      class="avatar-img"
                      src="@/assets\images\avatars\8.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div class="small">Simon</div>
                </a>

                <a href="#" class="d-block text-reset mr-7 mr-lg-6">
                  <div class="avatar avatar-sm mb-3">
                    <img
                      class="avatar-img"
                      src="@/assets\images\avatars\9.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div class="small">Thomas</div>
                </a>
              </div>
              <!-- Favourites -->

              <!-- Chats -->
              <nav class="nav d-block list-discussions-js mb-n6">
                <!-- Chat link -->
                <a
                  class="text-reset nav-link p-0 mb-6"
                  href="javascript:void(0)"
                  v-for="(item, index) in listGroupChats"
                  :key="index"
                  @click="onHandleShowGroupChat(index)"
                  :class="{ active: currentTag == index }"
                >
                  <div class="card card-active-listener">
                    <div class="card-body">
                      <div class="media align-items-center">
                        <div class="avatar mr-5">
                          <img
                            class="avatar-img"
                            :src="getInforFriend(item).src"
                            alt="Bootstrap Themes"
                          />
                        </div>

                        <div class="media-body overflow-hidden">
                          <h6 class="text-truncate mb-0 mr-auto">
                            {{ getInforFriend(item).name }}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <!-- Chat link -->
              </nav>
              <!-- Chats -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SidebarHome",
  data() {
    return {
      groupChats: null,
      currentTag: 0,
    };
  },
  created() {
    this.onHandleShowGroupChat(0);
  },

  methods: {
    getInforFriend(item) {
      let src = "";
      let name = "";

      if (item.typeConversation == "single") {
        const friend = item.dataMembers.filter(
          (i) => i._id != this.$store.state.inforMe._id
        )[0];

        src = friend.avatar;
        name = friend.local.fullname;
      } else {
        src = item.avatar;
        name = item.nameGroup;
      }

      return { src, name };
    },

    onHandleShowGroupChat(index) {
      this.currentTag = index;
      this.$emit("emitIndexGroup", index);
    },
  },
  computed: {
    ...mapGetters({
      listGroupChats: "getListGroupChats",
    }),
  },
};
</script>

<style></style>
