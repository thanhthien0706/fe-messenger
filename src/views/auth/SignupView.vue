<template>
  <div class="layout">
    <div class="container d-flex flex-column">
      <div
        class="row align-items-center justify-content-center no-gutters min-vh-100"
      >
        <div class="col-12 col-md-5 col-lg-4 py-8 py-md-11">
          <!-- Heading -->
          <h1 class="font-bold text-center">Đăng kí</h1>

          <!-- Text -->
          <p class="text-center mb-6">Chào mừng bạn tới kênh chat</p>

          <!-- Form -->
          <form class="mb-6" @submit.prevent>
            <!-- Fullname -->
            <div class="form-group">
              <label for="fullname" class="sr-only">Họ tên</label>
              <input
                type="text"
                class="form-control form-control-lg"
                id="fullname"
                placeholder="Nhập họ tên"
                v-model="dataUser.fullname"
              />
            </div>

            <!-- Username -->
            <div class="form-group">
              <label for="username" class="sr-only">Tên người dùng</label>
              <input
                type="text"
                class="form-control form-control-lg"
                id="username"
                placeholder="Nhập tên người dùng"
                v-model="dataUser.username"
              />
            </div>

            <!-- Email -->
            <div class="form-group">
              <label for="email" class="sr-only">Email Address</label>
              <input
                type="email"
                class="form-control form-control-lg"
                id="email"
                placeholder="Nhập email"
                v-model="dataUser.email"
              />
            </div>

            <!-- Phone -->
            <div class="form-group">
              <label for="phone" class="sr-only">Số điện thoại</label>
              <input
                type="number"
                class="form-control form-control-lg"
                id="phone"
                placeholder="Nhập số điện thoại"
                v-model="dataUser.phone"
              />
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="password" class="sr-only">Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                id="password"
                placeholder="Nhập mật khẩu"
                v-model="dataUser.password"
              />
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
              <label for="password" class="sr-only">Confirm Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                id="password"
                placeholder="Nhập lại mật khẩu"
                v-model="confirmPassword"
                @input="onHandleComparePassword"
              />
            </div>

            <!-- Submit -->
            <button
              class="btn btn-lg btn-block btn-primary"
              :disabled="isDisabled || isPending"
              @click="onHandleSignup"
            >
              Đăng kí
            </button>
          </form>

          <!-- Text -->
          <p class="text-center">
            Bạn đã có tài khoản?
            <router-link to="/dang-nhap">Đăng nhập</router-link>.
          </p>
        </div>
      </div>
      <!-- / .row -->
    </div>
  </div>
  <!-- .layout -->
</template>

<script>
import { isPending, AuthenService } from "@/services/AuthenService";

export default {
  name: "SignupView",
  setup() {
    return { isPending };
  },
  data() {
    return {
      dataUser: {
        username: "",
        fullname: "",
        email: "",
        phone: "",
        password: "",
      },
      confirmPassword: "",
      isDisabled: true,
    };
  },

  methods: {
    onHandleComparePassword() {
      if (this.confirmPassword === this.dataUser.password) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },

    async onHandleSignup() {
      if (
        this.dataUser.username != "" &&
        this.dataUser.fullname != "" &&
        this.dataUser.email != "" &&
        this.dataUser.phone != "" &&
        this.dataUser.password != ""
      ) {
        try {
          const formData = {
            username: this.dataUser.username,
            fullname: this.dataUser.fullname,
            email: this.dataUser.email,
            phone: this.dataUser.phone.toString(),
            password: this.dataUser.password,
          };
          const dataRef = await AuthenService.signUpUser(formData);

          if (dataRef.status) {
            const dataRefUser = await AuthenService.signInUser({
              email: this.dataUser.email,
              password: this.dataUser.password,
            });

            if (dataRefUser.status) {
              localStorage.setItem("userToken", dataRefUser.data);
              AuthenService.initAuthHeader();
              await this.$store.dispatch("getMe");
              this.$router.push("/");
            }
            throw new Error("Signin False");
          } else {
            throw new Error("Signup False");
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
