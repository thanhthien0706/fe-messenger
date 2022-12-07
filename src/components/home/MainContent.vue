<style lang="scss" scoped>
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
                      {{ sub_string(getInforFriend(dataGroup).name, 30) }}
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

                  <li
                    class="nav-item list-inline-item d-none d-xl-block mr-3"
                    v-if="dataGroup.typeConversation == 'group'"
                  >
                    <a
                      class="nav-link text-muted px-3"
                      data-chat-sidebar-toggle="#chat-1-members"
                      title="Add People"
                      data-toggle="modal"
                      data-target="#modalAddUserGroup"
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
                </ul>
              </div>
            </div>
            <!-- .row -->
          </div>
        </div>
        <!-- Chat: Header -->

        <!-- Chat: Content-->
        <div class="chat-content px-lg-8">
          <div class="container-xxl py-6 py-lg-10">
            <div v-if="!isPending">
              <template v-for="item in dataMessage" :key="item._id">
                <div v-if="item.sender !== inforMe._id" class="mb-2">
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
                        :src="item.dataSender.avatar"
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
                            <h6 class="mb-2">
                              {{ item.dataSender.local.fullname }}
                            </h6>
                            <div v-if="item.type == 'TEXT'">
                              {{ item.content }}
                            </div>

                            <div v-if="item.type == 'IMAGE'">
                              <p>
                                {{ item.content }}
                              </p>
                              <div style="width: 100%; height: 200px">
                                <img
                                  :src="item.attachment"
                                  alt=""
                                  style="
                                    object-fit: contain;
                                    width: 100%;
                                    height: 100%;
                                  "
                                />
                              </div>
                            </div>

                            <div class="mt-1">
                              <small class="opacity-65">{{
                                formatDateBasic(item.createdAt, "dd-MM-yyyy")
                              }}</small>
                            </div>
                          </div>
                          <!-- Message: content -->
                        </div>
                      </div>
                      <!-- Message: row -->
                    </div>
                    <!-- Message: Body -->
                  </div>
                  <!-- Message -->
                </div>

                <div v-else class="mb-4">
                  <!-- Message -->
                  <div class="message message-right">
                    <!-- Avatar -->
                    <div
                      class="avatar avatar-sm ml-4 ml-lg-5 d-none d-lg-block"
                    >
                      <img
                        class="avatar-img"
                        :src="item.dataSender.avatar"
                        alt=""
                      />
                    </div>

                    <!-- Message: body -->
                    <div class="message-body">
                      <!-- Message: row -->
                      <div class="message-row">
                        <div
                          class="d-flex align-items-center justify-content-end"
                        >
                          <!-- Message: content -->
                          <div class="message-content bg-primary text-white">
                            <div v-if="item.type == 'TEXT'">
                              {{ item.content }}
                            </div>

                            <div v-if="item.type == 'IMAGE'">
                              <p>
                                {{ item.content }}
                              </p>
                              <div style="width: 100%; height: 200px">
                                <img
                                  :src="item.attachment"
                                  alt=""
                                  style="
                                    object-fit: contain;
                                    width: 100%;
                                    height: 100%;
                                  "
                                />
                              </div>
                            </div>

                            <div class="mt-1">
                              <small class="opacity-65">{{
                                formatDateBasic(item.createdAt, "dd-MM-yyyy")
                              }}</small>
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
              </template>
            </div>

            <div class="text-center" v-else>
              <LoadingView :isPending="isPending" />
            </div>
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
              action="javascript:void(0)"
              data-emoji-form=""
            >
              <div class="form-row align-items-center">
                <div class="col">
                  <div class="input-group">
                    <!-- Textarea -->
                    <input
                      id="chat-id-1-input"
                      class="form-control bg-transparent border-0"
                      placeholder="Type your message..."
                      rows="1"
                      data-emoji-input=""
                      data-autosize="true"
                      autocomplete="off"
                      v-model="textMess"
                      @keyup.enter="sendMessage('TEXT')"
                    />

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
                      <label
                        id="chat-upload-btn-1"
                        class="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js"
                        type=""
                        style="position: relative; margin: 0"
                        for="inputFile"
                      >
                        <input
                          type="file"
                          style="display: none"
                          id="inputFile"
                          @change="onChangFile($event)"
                        />
                        <img
                          src="@/assets\images\paperclip.svg"
                          data-inject-svg=""
                          alt=""
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                          "
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Submit button -->
                <div class="col-auto" @keyup.enter="sendMessage('TEXT')">
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

  <!-- Modal -->
  <div class="modal fade" id="modalAddUserGroup">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Thêm bạn</h5>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control mb-5"
            placeholder="Nhập tên"
            @input="onSearchFriend"
          />

          <div>
            <ul
              class="dropdown-menu-custom d-flex flex-column"
              v-if="dataFriendSearch"
            >
              <li
                class="dropdown-item-custom py-4 px-4 bg-light mb-4"
                v-for="item in dataFriendSearch"
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
                  <p class="textName ml-4 font-weight-bold" style="flex: 1">
                    {{ item.local.fullname }}
                  </p>
                  <fa
                    :icon="['fas', 'user-plus']"
                    class=""
                    style="cursor: pointer"
                    @click="
                      handleAddUserToGroup({
                        idUser: item._id,
                        name: item.local.fullname,
                      })
                    "
                  />
                </div>
              </li>
            </ul>
            <p class="text-center" v-else>Can't found users</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { messageService, isPending } from "@/services/MessageService";
import formatDate from "@/utils/formatDate";
import SubString from "@/utils/SubString";
import { ConversationService } from "@/services/ConversationService";

export default {
  name: "MainContentHome",
  setup() {
    return { isPending };
  },
  props: ["indexGroup"],
  data() {
    return {
      status: true,
      dataGroup: null,
      dataMessage: null,
      textMess: "",
      fileUpload: null,
      typeMess: [
        "TEXT",
        "IMAGE",
        "VIDEO_CALL",
        "AUDIO",
        "VOICE_CALL",
        "VIDEO_MESS",
        "VOICE_MESS",
      ],
      dataMess: {
        content: null,
        type: null,
        conversation: null,
        attachment: null,
        sender: null,
      },
      dataFriendSearch: null,
    };
  },
  created() {},
  methods: {
    async handleAddUserToGroup(dataUser) {
      try {
        const dataRef = await ConversationService.joinGroup(
          dataUser.idUser,
          this.dataGroup._id
        );

        if (dataRef.status) {
          alert(`Đã thêm ${dataUser.name} vào nhóm`);
        }
      } catch (e) {
        console.log(e.message);
      }
    },

    onSearchFriend(e) {
      let searchText = e.target.value.toLowerCase();
      this.dataFriendSearch = this.listFriends.filter((item) => {
        const textNameItem = item.local.fullname
          .toLowerCase()
          .split(" ")
          .join("");

        return textNameItem.includes(searchText);
      });

      if (!searchText) {
        this.dataFriendSearch = null;
      }
    },

    onChangFile(event) {
      this.fileUpload = event.target.files[0];
      this.dataMess.attachment = event.target.files[0];
      this.sendMessage("IMAGE");
    },
    getInforFriend(item) {
      let src = "";
      let name = "";
      let idUser = "";

      if (item.typeConversation == "single") {
        const friend = item.dataMembers.filter(
          (i) => i._id != this.$store.state.inforMe._id
        )[0];

        src = friend.avatar;
        name = friend.local.fullname;
        idUser = friend._id;
      } else {
        src = item.avatar;
        name = item.nameGroup
          ? item.nameGroup
          : this.getNameMember(item.dataMembers);
      }

      return { src, name, idUser };
    },

    getNameMember(dataMembers) {
      let name = "";

      dataMembers.forEach((element, index) => {
        if (index == 0) {
          name += element.local.fullname;
        } else {
          name += "," + element.local.fullname;
        }
      });
      return name;
    },
    getConversation(index) {
      this.dataGroup = this.listGroupChats[index];
      this.dataMess.conversation = this.dataGroup._id;
    },
    async getMessageGroup() {
      try {
        const dataRef = await messageService.getListMessage(this.dataGroup._id);

        if (dataRef.status) {
          this.dataMessage = dataRef.data;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    joinGroupChat() {
      this.$socket.emit("groupchat:join", this.dataGroup._id);
      this.sockets.subscribe(
        `serverGroupChat:sendMess-${this.dataGroup._id}`,
        function (data) {
          this.dataMessage.push(data);
        }
      );
    },
    unsubscribeGroupChat(oldIndex) {
      if (oldIndex) {
        const oldGroup = this.listGroupChats[oldIndex];
        this.sockets.unsubscribe(`serverGroupChat:sendMess-${oldGroup._id}`);
      }
    },
    sendMessage(type) {
      this.dataMess.content = this.textMess;
      this.dataMess.type = type;
      this.dataMess.sender = this.inforMe._id;

      this.$socket.emit("groupchat:sendMess", {
        data: this.dataMess,
      });
      this.textMess = "";
    },
    formatDateBasic: formatDate.basicFormat,
    sub_string: SubString,
  },
  computed: {
    ...mapGetters({
      listGroupChats: "getListGroupChats",
      listFriends: "getListFriends",
      inforMe: "getInforMe",
    }),
  },
  watch: {
    indexGroup(newVal, oldVal) {
      this.getConversation(newVal);
      this.getMessageGroup(newVal);
      this.joinGroupChat();
      this.unsubscribeGroupChat(oldVal);
    },
  },
};
</script>

<style></style>
