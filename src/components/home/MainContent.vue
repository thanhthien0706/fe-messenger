<template>
  <!-- Main Content -->
  <div
    class="main main-visible"
    data-mobile-height=""
    v-if="status && dataGroup != null"
  >
    <!-- Chat -->
    <div id="chat-1" class="chat dropzone-form-js" data-dz-url="some.php">
      <!-- Chat: body -->
      <div class="chat-body">
        <!-- Chat: Header -->
        <div class="chat-header border-bottom py-4 py-lg-6 px-lg-8">
          <div class="container-xxl">
            <div class="row align-items-center">
              <!-- Close chat(mobile) -->
              <div class="col-3 d-xl-none">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <a class="text-muted px-0" href="#" data-chat="open">
                      <i class="icon-md fe-chevron-left"></i>
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Chat photo -->
              <div class="col-6 col-xl-6">
                <div class="media text-center text-xl-left">
                  <div class="avatar avatar-sm d-none d-xl-inline-block mr-5">
                    <img
                      :src="getInforFriend(dataGroup).src"
                      class="avatar-img"
                      alt=""
                    />
                  </div>

                  <div class="media-body align-self-center text-truncate">
                    <h6 class="text-truncate mb-n1">
                      {{ getInforFriend(dataGroup).name }}
                    </h6>
                    <small class="text-muted"
                      >{{ dataGroup.members.length }} members</small
                    >
                  </div>
                </div>
              </div>

              <!-- Chat toolbar -->
              <div class="col-3 col-xl-6 text-right">
                <ul class="nav justify-content-end">
                  <li class="nav-item list-inline-item d-none d-xl-block mr-5">
                    <a
                      class="nav-link text-muted px-3"
                      data-toggle="collapse"
                      data-target="#chat-1-search"
                      href="#"
                      title="Search this chat"
                    >
                      <i class="icon-md fe-search"></i>
                    </a>
                  </li>

                  <li class="nav-item list-inline-item d-none d-xl-block mr-3">
                    <a
                      class="nav-link text-muted px-3"
                      href="#"
                      data-chat-sidebar-toggle="#chat-1-members"
                      title="Add People"
                    >
                      <i class="icon-md fe-user-plus"></i>
                    </a>
                  </li>

                  <li class="nav-item list-inline-item d-none d-xl-block mr-0">
                    <a
                      class="nav-link text-muted px-3"
                      href="#"
                      data-chat-sidebar-toggle="#chat-1-info"
                      title="Details"
                    >
                      <i class="icon-md fe-more-vertical"></i>
                    </a>
                  </li>

                  <!-- Mobile nav -->
                  <li class="nav-item list-inline-item d-block d-xl-none">
                    <div class="dropdown">
                      <a
                        class="nav-link text-muted px-0"
                        href="#"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="icon-md fe-more-vertical"></i>
                      </a>
                      <div class="dropdown-menu">
                        <a
                          class="dropdown-item d-flex align-items-center"
                          data-toggle="collapse"
                          data-target="#chat-1-search"
                          href="#"
                        >
                          Search <span class="ml-auto pl-5 fe-search"></span>
                        </a>

                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                          data-chat-sidebar-toggle="#chat-1-info"
                        >
                          Chat Info
                          <span class="ml-auto pl-5 fe-more-horizontal"></span>
                        </a>

                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                          data-chat-sidebar-toggle="#chat-1-members"
                        >
                          Add Members
                          <span class="ml-auto pl-5 fe-user-plus"></span>
                        </a>
                      </div>
                    </div>
                  </li>
                  <!-- Mobile nav -->
                </ul>
              </div>
            </div>
            <!-- .row -->
          </div>
        </div>
        <!-- Chat: Header -->

        <!-- Chat: Search -->
        <div class="collapse border-bottom px-lg-8" id="chat-1-search">
          <div class="container-xxl py-4 py-lg-6">
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Search this chat"
                aria-label="Search this chat"
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
          </div>
        </div>
        <!-- Chat: Search -->

        <!-- Chat: Content-->
        <div class="chat-content px-lg-8">
          <div class="container-xxl py-6 py-lg-10">
            <!-- Message -->
            <div class="message">
              <!-- Avatar -->
              <a
                class="avatar avatar-sm mr-4 mr-lg-5"
                href="#"
                data-chat-sidebar-toggle="#chat-1-user-profile"
              >
                <img
                  class="avatar-img"
                  src="@/assets\images\avatars\7.jpg"
                  alt=""
                />
              </a>

              <!-- Message: body -->
              <div class="message-body">
                <!-- Message: row -->
                <div class="message-row">
                  <div class="d-flex align-items-center">
                    <!-- Message: content -->
                    <div class="message-content bg-light">
                      <h6 class="mb-2">William Wright</h6>
                      <div>
                        Yeah, I'm going to meet a friend of mine at the
                        department store. I have to buy some presents for my
                        parents.
                      </div>

                      <div class="mt-1">
                        <small class="opacity-65">8 mins ago</small>
                      </div>
                    </div>
                    <!-- Message: content -->

                    <!-- Message: dropdown -->
                    <div class="dropdown">
                      <a
                        class="text-muted opacity-60 ml-3"
                        href="#"
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
                          Edit <span class="ml-auto fe-edit-3"></span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          Share <span class="ml-auto fe-share-2"></span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          Delete <span class="ml-auto fe-trash-2"></span>
                        </a>
                      </div>
                    </div>
                    <!-- Message: dropdown -->
                  </div>
                </div>
                <!-- Message: row -->
              </div>
              <!-- Message: Body -->
            </div>
            <!-- Message -->

            <!-- Message -->
            <div class="message message-right">
              <!-- Avatar -->
              <div class="avatar avatar-sm ml-4 ml-lg-5 d-none d-lg-block">
                <img
                  class="avatar-img"
                  src="@/assets\images\avatars\12.jpg"
                  alt=""
                />
              </div>

              <!-- Message: body -->
              <div class="message-body">
                <!-- Message: row -->
                <div class="message-row">
                  <div class="d-flex align-items-center justify-content-end">
                    <!-- Message: dropdown -->
                    <div class="dropdown">
                      <a
                        class="text-muted opacity-60 mr-3"
                        href="#"
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
                          Edit <span class="ml-auto fe-edit-3"></span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          Share <span class="ml-auto fe-share-2"></span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          Delete <span class="ml-auto fe-trash-2"></span>
                        </a>
                      </div>
                    </div>
                    <!-- Message: dropdown -->

                    <!-- Message: content -->
                    <div class="message-content bg-primary text-white">
                      <div>
                        Yeah, I'm going to meet a friend of mine at the
                        department store. I have to buy some presents for my
                        parents.
                      </div>

                      <div class="mt-1">
                        <small class="opacity-65">8 mins ago</small>
                      </div>
                    </div>
                    <!-- Message: content -->
                  </div>
                </div>
                <!-- Message: row -->
              </div>
              <!-- Message: body -->
            </div>
            <!-- Message -->
          </div>

          <!-- Scroll to end -->
          <div class="end-of-chat"></div>
        </div>
        <!-- Chat: Content -->

        <!-- Chat: Footer -->
        <div class="chat-footer border-top py-4 py-lg-6 px-lg-8">
          <div class="container-xxl">
            <form
              id="chat-id-1-form"
              action="assets/php/upload.php"
              data-emoji-form=""
            >
              <div class="form-row align-items-center">
                <div class="col">
                  <div class="input-group">
                    <!-- Textarea -->
                    <textarea
                      id="chat-id-1-input"
                      class="form-control bg-transparent border-0"
                      placeholder="Type your message..."
                      rows="1"
                      data-emoji-input=""
                      data-autosize="true"
                    ></textarea>

                    <!-- Emoji button -->
                    <div class="input-group-append">
                      <button
                        class="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
                        type="button"
                        data-emoji-btn=""
                      >
                        <img
                          src="@/assets\images\smile.svg"
                          data-inject-svg=""
                          alt=""
                        />
                      </button>
                    </div>

                    <!-- Upload button -->
                    <div class="input-group-append">
                      <button
                        id="chat-upload-btn-1"
                        class="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js"
                        type="button"
                      >
                        <img
                          src="@/assets\images\paperclip.svg"
                          data-inject-svg=""
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Submit button -->
                <div class="col-auto">
                  <button
                    class="btn btn-ico btn-primary rounded-circle"
                    type="submit"
                  >
                    <span class="fe-send"></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- Chat: Footer -->
      </div>
      <!-- Chat: body -->
    </div>
    <!-- Chat -->
  </div>
  <div class="main" data-mobile-height="" v-else>
    <!-- Default Page -->
    <div class="chat flex-column justify-content-center text-center">
      <div class="container-xxl">
        <div class="avatar avatar-lg mb-5">
          <img class="avatar-img" src="@/assets\images\avatars\12.jpg" alt="" />
        </div>

        <h6>Hey, Matthew!</h6>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
    <!-- Default Page -->
  </div>
  <!-- Main Content -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainContentHome",
  props: ["indexGroup"],
  data() {
    return {
      status: true,
      dataGroup: null,
      dataMessage: null,
    };
  },
  created() {},
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
    initMainData() {
      this.dataGroup = this.listGroupChats[this.indexGroup];
      this.dataMessage = null;
    },
  },
  computed: {
    ...mapGetters({
      groupCurrent: "getGroupCurrent",
      listGroupChats: "getListGroupChats",
    }),
  },
  watch: {
    "$store.state.groupCurrent"(newVal) {
      this.dataGroup = newVal;
    },
    indexGroup(newVal) {
      this.dataGroup = this.listGroupChats[newVal];
    },
  },
};
</script>

<style></style>
