<!-- eslint-disable vue/no-mutating-props -->

<template>
  <div class="boxHandleTask" v-if="showHandleTask" @click.self="onClose">
    <div class="boxInnercontent">
      <h3>
        {{ action == "add" ? "Thêm Việc" : "Sửa Việc" }}
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
            <option>Thanh Thien</option>
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
        </div>

        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary">
            {{ action == "add" ? "Thêm" : "Sửa" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHandleTask",
  props: ["showHandleTask", "dataTask", "action"],
  methods: {
    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>
