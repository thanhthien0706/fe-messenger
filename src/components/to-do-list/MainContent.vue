<template>
  <div class="main main-visible mainContentTodoCustom">
    <div class="mb-5 d-flex justify-content-between align-items-center">
      <h2>{{ inforWork.name }}</h2>
      <button class="btnAddTag" @click="onShowHandleTask(null, 'add')">
        Thêm thẻ
      </button>
    </div>

    <div class="boxContentListTask mb-5">
      <div
        class="boxHeaderItem d-flex justify-content-between align-item-center"
      >
        <h4 class="mb-3">Chưa xong</h4>
        <p class="textCount">({{ taskFalse.length }})</p>
      </div>
      <ul class="listItems">
        <li
          class="item d-flex align-items-center justify-content-between"
          v-for="task in taskFalse"
          :key="task._id"
          @click="onClickItem(task)"
        >
          <div class="boxRight d-flex align-items-center">
            <fa :icon="['fas', 'circle']" class="iconCheck" />
            <div class="contentInner">
              <p class="textItem">{{ task.name }}</p>
              <p class="timeDealine" v-if="task.dueDate">
                {{ formatDateBasic(task.dueDate, "DD-MM-yyyy") }}
              </p>
            </div>
          </div>
          <ul class="listAvatar">
            <li class="itemAvatar">
              <img
                class="imgAvatar"
                :src="getInforUserById(task.worker).avatar"
                alt=""
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="boxContentListTask">
      <div
        class="boxHeaderItem d-flex justify-content-between align-item-center"
      >
        <h4 class="mb-3">Đã xong</h4>
        <p class="textCount">({{ taskTrue.length }})</p>
      </div>
      <ul class="listItems">
        <li
          class="item d-flex align-items-center justify-content-between"
          v-for="task in taskTrue"
          :key="task._id"
          @click="onClickItem(task)"
        >
          <div class="boxRight d-flex align-items-center">
            <fa :icon="['fas', 'circle']" class="iconCheck" />
            <div class="contentInner">
              <del class="textItem">{{ task.name }}</del>
              <del class="timeDealine" v-if="task.dueDate">
                {{ formatDateBasic(task.dueDate, "DD-MM-yyyy") }}
              </del>
            </div>
          </div>
          <ul class="listAvatar">
            <li class="itemAvatar">
              <img
                class="imgAvatar"
                :src="getInforUserById(task.worker).avatar"
                alt=""
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <HandleTaskVue
    v-if="showHandleTask"
    :showHandleTask="showHandleTask"
    :dataTask="dataTask"
    :action="action"
    @onClose="onClose"
    @onHandleTask="onHandleTask"
    :memberWork="inforWork.members"
    :nameWork="inforWork.name"
  />
</template>

<script>
import { mapGetters } from "vuex";
import HandleTaskVue from "./HandleTask.vue";
import { TaskService } from "@/services/TaskService";
import formatDate from "@/utils/formatDate";

export default {
  name: "MainContentTodoList",
  props: ["nameTabChoose", "inforWork"],
  components: { HandleTaskVue },
  data() {
    return {
      dataTask: {
        idTask: "",
        name: "",
        description: "",
        completed: null,
        dueDate: "",
        worker: "",
      },
      action: "add",
      showHandleTask: false,
      taskTrue: [],
      taskFalse: [],
      delay: 700,
      clicks: 0,
      timer: null,
    };
  },
  methods: {
    onClickItem(task) {
      this.clicks++;
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          console.log("Click 1 lan");
          this.clicks = 0;
        }, this.delay);
      } else {
        clearTimeout(this.timer);

        this.onShowHandleTask(task, "edit");

        this.clicks = 0;
      }
    },

    async onHandleTask() {
      try {
        if (this.action == "add") {
          const dataRef = await TaskService.createTask({
            idListTask: this.inforWork._id,
            name: this.dataTask.name,
            description: this.dataTask.description,
            dueDate: this.dataTask.dueDate,
            worker: this.dataTask.worker,
          });
          if (dataRef.status) {
            this.taskFalse.push(dataRef.data);
          }
        } else if (this.action == "edit") {
          const dataRef = await TaskService.updateTask(this.dataTask);
          if (dataRef.status) {
            let indexOld = null;

            console.log(dataRef.data);

            if (dataRef.data.completed) {
              console.log("vao true");
              indexOld = this.taskTrue.findIndex(
                (task) => task._id == dataRef.data.idTask
              );
              this.taskTrue[indexOld] = dataRef.data;
            } else {
              indexOld = this.taskFalse.findIndex(
                (task) => task._id == dataRef.data.idTask
              );

              this.taskFalse[indexOld] = dataRef.data;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      await this.onClose();
    },
    onShowHandleTask(task, action) {
      if (task) {
        this.dataTask.idTask = task._id;
        this.dataTask.completed = task.completed;
        this.dataTask.description = task.description;
        if (task.dueDate) {
          this.dataTask.dueDate = task.dueDate;
        }
        this.dataTask.name = task.name;
        this.dataTask.worker = task.worker;
      }

      this.action = action;

      this.showHandleTask = true;
    },

    onClose() {
      this.dataTask.completed = null;
      this.dataTask.idTask = "";
      this.dataTask.description = "";
      this.dataTask.name = "";
      this.dataTask.name = "";
      this.dataTask.worker = "";
      this.showHandleTask = false;
    },

    getInforUserById(id) {
      if (id == this.inforMe._id) {
        return this.inforMe;
      } else {
        const inforUser = this.friends.filter((friend) => friend._id == id);
        return inforUser[0];
      }
    },

    async onGetTask(idWork) {
      try {
        Promise.all([
          TaskService.getTaskWithIdworkAndStatus(idWork, true),
          TaskService.getTaskWithIdworkAndStatus(idWork, false),
        ])
          .then(([taskTrue, taskFalse]) => {
            this.taskTrue = taskTrue.data;
            this.taskFalse = taskFalse.data;
          })
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    },

    formatDateBasic: formatDate.basicFormat,
  },
  computed: {
    ...mapGetters({ friends: "getListFriends", inforMe: "getInforMe" }),
  },
  watch: {
    inforWork(newVal) {
      this.onGetTask(newVal._id);
    },
  },
};
</script>

<style></style>
