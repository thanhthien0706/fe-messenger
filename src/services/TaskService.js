import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const mainUrl = "/task";

const TaskService = {
  async createListTask(formData) {
    isPending.value = true;
    try {
      const dataRef = await axios.post(`${mainUrl}/list-task-create`, formData);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },

  async getListTask(type) {
    try {
      const dataRef = await axios.get(`${mainUrl}/me?type=${type}`);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getTaskWithIdworkAndStatus(idWork, status) {
    try {
      const dataRef = await axios.get(`${mainUrl}/one/${idWork}/${status}`);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async createTask(formTask) {
    try {
      const dataRef = await axios.post(`${mainUrl}/task-create`, formTask);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateTask(updateTask) {
    try {
      const dataRef = await axios.put(
        `${mainUrl}/update/${updateTask.idTask}`,
        updateTask
      );

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateCompletedTask(idTask, completed) {
    try {
      const dataRef = await axios.get(
        `${mainUrl}/confirm/${idTask}/${completed}`
      );

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export { TaskService, isPending };
