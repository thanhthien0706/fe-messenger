<template>
  <div class="container">
    <form class="formCustom" @submit.prevent v-if="!isSuccessed">
      <!-- <div class="form-group">
        <label for="oldPassword">Old password</label>
        <input
          type="password"
          class="form-control"
          id="oldPassword"
          placeholder="Password"
          v-model="oldPassword"
        />
      </div> -->
      <div class="form-group">
        <label for="newPassword">New password</label>
        <input
          type="password"
          class="form-control"
          id="newPassword"
          placeholder="Password"
          v-model="newPassword"
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm password</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="Password"
          v-model="confirmPassword"
          @input="onDisabled"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary text-center"
        :disabled="
          isDisabled ||
          (this.newPassword == '' && this.confirmPassword == '') ||
          isPending
        "
        @click="handleChangePassword"
      >
        {{ isPending ? "Đang xử lý..." : "Đổi mật khẩu" }}
      </button>
    </form>
    <p v-else class="text-center">Đổi mật khẩu thành công</p>
  </div>
</template>

<script>
import { AuthenService, isPending } from "@/services/AuthenService";

export default {
  name: "ChangePasswordReset",
  setup() {
    return { isPending };
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      isDisabled: true,
      isSuccessed: false,
    };
  },
  methods: {
    onDisabled() {
      const result = this.confirmPassword.localeCompare(this.newPassword);
      if (result == 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },

    async handleChangePassword() {
      if (this.newPassword != "") {
        const token = this.$route.query.token;
        try {
          // const formData = new FormData();
          // formData.append("oldPassword", this.oldPassword);
          // formData.append("token", token);
          // formData.append("newPassword", this.newPassword);

          const ref = await AuthenService.savePassword({
            token: token,
            newPassword: this.newPassword,
          });

          if (ref.status) {
            this.isSuccessed = true;
            setTimeout(() => {
              this.$router.push({ name: "signin-page" });
            }, 3000);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
};
</script>

<style src="@/assets\css\template.min.css"></style>
<style lang="scss" scoped>
.formCustom {
  max-width: 100%;
  width: 50%;
  margin: 0 auto;
}
</style>
