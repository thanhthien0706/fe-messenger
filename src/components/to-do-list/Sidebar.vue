<template>
  <div class="sidebar sidebar-todilist">
    <div class="tab-content h-100" role="tablist">
      <ul class="tab-change">
        <li
          class="item-tab"
          :class="{ active: chooseTab == 'single' }"
          @click="emitChooseTab('single')"
        >
          Cá nhân
        </li>
        <li
          class="item-tab"
          :class="{ active: chooseTab == 'group' }"
          @click="emitChooseTab('group')"
        >
          Nhóm
        </li>
        <li
          class="item-tab"
          :class="{ active: chooseTab == 'addTodo' }"
          @click="emitChooseTab('addTodo')"
        >
          Giao việc
        </li>
      </ul>

      <div class="boxContentTodo" v-if="chooseTab != 'addTodo'">
        <ul class="list-to-do">
          <li class="item-to-do" v-for="task in dataListTaks" :key="task._id">
            <p class="textName">{{ task.name }}</p>
            <p class="countList">({{ task.listTasks.length }})</p>
          </li>
        </ul>
      </div>

      <div class="boxContentTodo" v-else>
        <form @submit.prevent class="formAddTodo">
          <div class="form-group">
            <label for="inputNameTodo">Tên công việc</label>
            <input
              type="text"
              class="form-control"
              id="inputNameTodo"
              placeholder="vd: Học bài"
              v-model="dataCreateTodo.name"
            />
          </div>

          <div class="form-group">
            <label for="inputNameTodo">Kiểu công việc</label>
            <select
              class="form-control"
              id="inputNameTodo"
              v-model="dataCreateTodo.type"
            >
              <option value="single">Cá nhân</option>
              <option value="group">Nhóm</option>
            </select>
          </div>

          <div class="form-group">
            <label for="inputMemberTodo">Thành viên</label>
            <div class="boxShowAddMember">
              <ul class="listShowMember">
                <li
                  class="itemShowMember"
                  v-for="user in dataCreateTodo.members"
                  :key="user"
                >
                  <img
                    :src="getInforUserById(user).avatar"
                    alt=""
                    class="imgMember"
                  />
                </li>
              </ul>
              <fa
                :icon="['fas', 'caret-down']"
                class="iconHandle"
                style="cursor: pointer"
              />

              <div class="boxDropdownMember">
                <ul class="listMember">
                  <li class="itemMember">
                    <input
                      :id="`member-${inforMe._id}`"
                      type="checkbox"
                      class="checkBoxMember"
                      @click="onHandleAddMember(inforMe)"
                      :checked="checkExistUser(inforMe._id)"
                    />
                    <label :for="`member-${inforMe._id}`" class="nameUser">{{
                      inforMe.local.fullname
                    }}</label>
                  </li>
                  <li
                    class="itemMember"
                    v-for="friend in friends"
                    :key="friend._id"
                  >
                    <input
                      :id="`member-${friend._id}`"
                      type="checkbox"
                      class="checkBoxMember"
                      @click="onHandleAddMember(friend)"
                      :checked="checkExistUser(friend._id)"
                    />
                    <label :for="`member-${friend._id}`" class="nameUser">{{
                      friend.local.fullname
                    }}</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="text-center">
            <button class="btn btn-primary" @click="onCreateListTask">
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { TaskService } from "@/services/TaskService";

export default {
  name: "SidebarTodoList",
  data() {
    return {
      chooseTab: "",

      dataCreateTodo: {
        name: "",
        type: "single",
        members: [],
      },

      dataListTaks: [],
    };
  },
  mounted() {
    this.emitChooseTab("single");
  },
  methods: {
    emitChooseTab(nameTab) {
      this.chooseTab = nameTab;
    },
    getInforUserById(id) {
      if (id == this.inforMe._id) {
        return this.inforMe;
      } else {
        const inforUser = this.friends.filter((friend) => friend._id == id);
        return inforUser[0];
      }
    },
    checkExistUser(id) {
      const existId = this.dataCreateTodo.members.includes(id);
      if (existId) {
        return true;
      }
      return false;
    },
    onHandleAddMember(user) {
      const existId = this.checkExistUser(user._id);
      if (existId) {
        const indexMember = this.dataCreateTodo.members.indexOf(user._id);
        if (indexMember > -1) {
          this.dataCreateTodo.members.splice(indexMember, 1);
        }
      } else {
        this.dataCreateTodo.members.push(user._id);
      }
    },

    async onCreateListTask() {
      try {
        const dataRef = await TaskService.createListTask(this.dataCreateTodo);

        console.log(dataRef);
        if (dataRef.status) {
          alert("Tạo công việc thành cong");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getAllListTask(type) {
      try {
        const dataRef = await TaskService.getListTask(type);

        if (dataRef.status) {
          this.dataListTaks = dataRef.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters({ friends: "getListFriends", inforMe: "getInforMe" }),
  },
  watch: {
    chooseTab(newVal) {
      this.getAllListTask(newVal);
    },
  },
};
</script>

<style></style>
