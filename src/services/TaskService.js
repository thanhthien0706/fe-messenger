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
      const dataRef = await axios.get(`${mainUrl}/${idWork}/${status}`);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export { TaskService, isPending };
