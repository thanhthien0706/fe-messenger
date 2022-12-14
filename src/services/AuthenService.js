import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);
const isPendingForgotPassword = ref(null);

const mainUrl = "/auth";

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
    localStorage.setItem("userToken", "");
    this.initAuthHeader();
  },

  async signUpUser(formData) {
    isPending.value = true;
    try {
      const dataRef = await axios.post(`${mainUrl}/signup`, formData);

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
      const dataRef = await axios.post(`${mainUrl}/signin`, formData);

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

  async forgotPassword(email) {
    isPendingForgotPassword.value = true;
    try {
      const dataRef = await axios.post(
        `${mainUrl}/forgot-password?email=${email}`
      );
      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPendingForgotPassword.value = false;
    }
  },

  async resetPassword(email) {
    isPending.value = true;
    try {
      const dataRef = await axios.post(
        `${mainUrl}/reset-password?email=${email}`
      );
      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },

  async changePassword(token) {
    try {
      const dataRef = await axios.get(
        `${mainUrl}/changePassword?token=${token}`
      );
      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async savePassword(formData) {
    isPending.value = true;
    try {
      const dataRef = await axios.post(`${mainUrl}/savePassword`, formData);
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

export { AuthenService, isPending, isPendingForgotPassword };
