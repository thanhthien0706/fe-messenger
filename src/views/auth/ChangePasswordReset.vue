<template>
  <div class="container">
    <form class="formCustom" @submit.prevent>
      <div class="form-group">
        <label for="oldPassword">Old password</label>
        <input
          type="password"
          class="form-control"
          id="oldPassword"
          placeholder="Password"
          v-model="oldPassword"
        />
      </div>
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
          (this.oldPassword == '' &&
            this.newPassword == '' &&
            this.confirmPassword == '')
        "
        @click="handleChangePassword"
      >
        Đổi mật khẩu
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordReset",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      isDisabled: true,
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

    async handleChangePassword() {},
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
