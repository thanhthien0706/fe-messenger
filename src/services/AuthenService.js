import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const mailUrl = "/auth";

const AuthenService = {
  // set token in header
  initAuthHeader() {
    const token = localStorage.getItem("userToken");
    if (token && token !== "") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },

  // reset token
  resetAuthHeader() {
    localStorage.setItem("loveUseToken", "");
    this.initAuthHeader();
  },

  async signUpUser(formData) {
    isPending.value = true;
    try {
      const dataRef = await axios.post(`${mailUrl}/signup`, formData);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },

  async signInUser(formData) {
    isPending.value = true;
    try {
      const dataRef = await axios.post(`${mailUrl}/signin`, formData);

      if (
        dataRef.data.status &&
        dataRef.data.data != null &&
        dataRef.data.data != ""
      ) {
        this.initAuthHeader();
      }
      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },

  // LOGOUT
  logoutAccount() {
    localStorage.removeItem("userToken");
  },
};

export { AuthenService, isPending };
