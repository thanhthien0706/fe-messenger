<!-- eslint-disable vue/no-mutating-props -->

<template>
  <div class="boxHandleTask" v-if="showHandleTask" @click.self="onClose">
    <div class="boxInnercontent">
      <h3>
        {{
          action == "add" ? "Thêm việc - " + nameWork : "Sửa Việc - " + nameWork
        }}
      </h3>

      <form @submit.prevent class="formTask">
        <div class="form-group">
          <label for="inputNameTask">Tên việc</label>
          <input
            type="text"
            class="form-control"
            id="inputNameTask"
            v-model="dataTask.name"
          />
        </div>

        <div class="form-group">
          <label for="inputWorkerTask">Giao cho</label>
          <select
            class="form-control"
            id="inputWorkerTask"
            v-model="dataTask.worker"
          >
            <option
              v-for="user in memberWork"
              :key="user"
              :value="getInforUserById(user)._id"
              :selected="dataTask.worker == user"
            >
              {{ getInforUserById(user).local.fullname }} -
              {{ getInforUserById(user).username }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="inputDescriptionTask">Mô tả</label>
          <textarea
            class="form-control"
            id="inputDescriptionTask"
            v-model="dataTask.description"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="inputDueDateTask">Thời gian</label>
          <input
            type="date"
            class="form-control"
            id="inputDueDateTask"
            v-model="dataTask.dueDate"
          />
          <!-- v-model="dataTask.dueDate" -->
        </div>

        <div class="form-group text-center">
          <button
            type="submit"
            class="btn btn-primary"
            @click="onEmitHandleTask"
          >
            {{ action == "add" ? "Thêm" : "Sửa" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageHandleTask",
  props: ["showHandleTask", "dataTask", "action", "memberWork", "nameWork"],
  data() {
    return {};
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },

    onEmitHandleTask() {
      this.$emit("onHandleTask");
    },

    getInforUserById(id) {
      if (id == this.inforMe._id) {
        return this.inforMe;
      } else {
        const inforUser = this.friends.filter((friend) => friend._id == id);
        return inforUser[0];
      }
    },
  },

  computed: {
    ...mapGetters({ friends: "getListFriends", inforMe: "getInforMe" }),
  },
};
</script>
