<template>
  <div class="layout">
    <div class="container d-flex flex-column">
      <div
        class="row align-items-center justify-content-center no-gutters min-vh-100"
      >
        <div class="col-12 col-md-5 col-lg-4 py-8 py-md-11">
          <!-- Heading -->
          <h1 class="font-bold text-center">Đăng nhâp</h1>

          <!-- Text -->
          <p class="text-center mb-6">Chào mừng bạn tới kênh chat</p>

          <!-- Form -->
          <form class="mb-6" @submit.prevent>
            <!-- Email -->
            <div class="form-group">
              <label for="emailInput" class="sr-only">Email</label>
              <input
                type="email"
                class="form-control form-control-lg"
                id="emailInput"
                placeholder="Enter email"
                v-model="dataUser.email"
              />
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="password" class="sr-only">Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                id="password"
                placeholder="Enter your password"
                v-model="dataUser.password"
              />
            </div>

            <!-- <div class="form-group d-flex justify-content-between">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  checked=""
                  id="checkbox-remember"
                />
                <label class="custom-control-label" for="checkbox-remember"
                  >Remember me</label
                >
              </div>
              <a href="password-reset.html"></a>
            </div> -->

            <!-- Submit -->
            <button
              class="btn btn-lg btn-block btn-primary"
              type="button"
              :disabled="dataUser.password == '' && dataUser.email == ''"
              @click="onHandleSignin"
            >
              Đăng nhập
            </button>
          </form>

          <div class="d-flex align-items-center justify-content-between">
            <!-- Text -->
            <a
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalForgotPassword"
              >Quên mật khẩu</a
            >

            <!-- Text -->
            <p class="text-center">
              Bạn chưa có tài khoản
              <router-link to="/dang-ki">Đăng kí</router-link>.
            </p>
          </div>

          <hr />
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="modalForgotPassword"
        tabindex="-1"
        aria-hidden="true"
        aria-labelledby="modalForgotPassword"
        data-bs-backdrop="static"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nhập email</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="email"
                class="form-control"
                placeholder="Nhập ở đây"
                v-model="emailReset"
              />
              <!-- <p v-else class="text-center">Kiểm tra hộp thư của bạn.</p> -->
            </div>
            <div class="modal-footer">
              <button
                type="button "
                class="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="forgotPassword"
              >
                {{ isPendingForgotPassword ? "Đang xử lý..." : "Xác nhận" }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- / .row -->
    </div>
  </div>
  <!-- .layout -->
</template>

<script>
import {
  AuthenService,
  isPendingForgotPassword,
} from "@/services/AuthenService";

export default {
  name: "SigninView",
  setup() {
    return { isPendingForgotPassword };
  },
  data() {
    return {
      dataUser: {
        email: "",
        password: "",
      },

      emailReset: "",
      isResetPassword: true,
    };
  },
  methods: {
    async onHandleSignin() {
      try {
        const dataRef = await AuthenService.signInUser({
          email: this.dataUser.email,
          password: this.dataUser.password,
        });

        if (dataRef.status) {
          localStorage.setItem("userToken", dataRef.data);
          AuthenService.initAuthHeader();
          await this.$store.dispatch("getMe");
          this.$router.push("/");
        } else {
          throw new Error("Signin Faild");
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    async forgotPassword() {
      try {
        if (this.emailReset != "" || this.isPendingForgotPassword) {
          const dataRef = await AuthenService.forgotPassword(this.emailReset);
          if (dataRef.status) {
            alert("Kiem tra hop thu cua ban");
          } else {
            throw new Error("Forgot Password Failed");
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  watch: {
    isResetPassword(newVal) {
      if (!newVal) {
        this.dataUser = {
          username: "",
          password: "",
        };
      }
    },
  },
};
</script>

<style src="@/assets\css\template.min.css"></style>
