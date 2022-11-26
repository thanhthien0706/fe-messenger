<template>
  <div class="container">
    <form class="formCustom" @submit.prevent>
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
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary text-center"
        :disabled="
          isDisabled || (this.newPassword == '' && this.confirmPassword == '')
        "
      >
        <!-- @click="handleChangePassword" -->
        <!-- {{ isPending ? "Đang xử lý..." : "Đổi mật khẩu" }} -->
      </button>
    </form>
    <!-- <p v-else class="text-center">Đổi mật khẩu thành công</p> -->
  </div>
</template>

<script>
export default {
  name: "ChangePasswordReset",
  setup() {},
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      isDisabled: true,
      isSuccessed: false,
    };
  },
  methods: {},
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
