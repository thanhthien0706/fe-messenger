<style lang="scss" scoped>
.listMenu {
  .menuItem {
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>

<template>
  <div class="sidebar">
    <div class="tab-content h-100" role="tablist">
      <div
        class="tab-pane fade h-100 show active"
        id="tab-content-dialogs"
        role="tabpanel"
      >
        <div class="d-flex flex-column h-100">
          <!-- hide-scrollbar -->
          <div class="">
            <div class="container-fluid py-6">
              <!-- Title -->
              <h2 class="font-bold mb-6">Tin Nhắn</h2>
              <!-- Title -->

              <!-- Chats -->
              <nav
                class="nav d-block list-discussions-js mb-n6"
                v-if="listGroupChats"
              >
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

                        <div class="media-body">
                          <h6 class="text-truncate mb-0 mr-auto">
                            {{ sub_string(getInforFriend(item).name, 20) }}
                          </h6>
                        </div>

                        <div
                          class="media-body"
                          style="
                            display: flex;
                            justify-content: flex-end;
                            position: relative;
                          "
                          @click="onHandleShowMenu(index)"
                        >
                          <fa
                            :icon="['fas', 'ellipsis-vertical']"
                            class=""
                            style="cursor: pointer"
                          />

                          <nav
                            class="listMenu"
                            style="
                              position: absolute;
                              top: 100%;
                              border: 2px solid #000;
                              border-radius: 6px;
                              background-color: #fff;
                              z-index: 999;
                            "
                            v-show="indexDrop == index && statusDrop"
                          >
                            <li
                              class="menuItem"
                              style="padding: 4px 16px"
                              @click="
                                onCreateConversation(
                                  getInforFriend(item).idUser
                                )
                              "
                              v-if="item.typeConversation == 'single'"
                            >
                              Tạo nhóm
                            </li>
                            <li class="menuItem" style="padding: 4px 16px">
                              Rời nhóm
                            </li>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <!-- Chat link -->
              </nav>
              <!-- Chats -->

              <p class="text-center" v-else>Chưa có nhóm chat nào</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ConversationService } from "@/services/ConversationService";
import SubString from "@/utils/SubString";

export default {
  name: "SidebarHome",
  data() {
    return {
      groupChats: null,
      currentTag: null,
      indexDrop: null,
      statusDrop: false,
    };
  },
  created() {
    // this.onHandleShowGroupChat(0);
  },

  methods: {
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
        console.log(item.dataMembers);
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

    onHandleShowGroupChat(index) {
      this.currentTag = index;
      this.$emit("emitIndexGroup", index);
    },

    onHandleShowMenu(index) {
      this.indexDrop = index;
      this.statusDrop = !this.statusDrop;
    },

    async onCreateConversation(idUser) {
      console.log(idUser);
      try {
        const dataRef = await ConversationService.createConversation(idUser);
        if (dataRef.status) {
          this.$store.commit("addGroupChatToGroups", dataRef.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    sub_string: SubString,
  },
  computed: {
    ...mapGetters({
      listGroupChats: "getListGroupChats",
    }),
  },
};
</script>

<style></style>
