import { createRouter, createWebHistory } from "vue-router";
import { checkLogin, checkEntityResetPassword } from "@/middleware/BeginVerify";

const routes = [
  /**
   * @ROUTER_AUTHENTICATION
   */
  {
    path: "/quen-mat-khau",
    name: "reset-password-page",
    meta: {
      title: "Quên mật khẩu",
      middleware: checkEntityResetPassword,
    },
    component: () => import("@/views/auth/ChangePasswordReset"),
  },
  {
    path: "/dang-ki",
    name: "signup-page",
    meta: {
      title: "Đăng kí",
    },
    component: () => import("@/views/auth/SignupView"),
  },
  {
    path: "/dang-nhap",
    name: "signin-page",
    meta: {
      title: "Đăng nhập",
    },
    component: () => import("@/views/auth/SignInView"),
  },

  /**
   * @ROUTER_MAIN
   */
  {
    path: "/thong-bao",
    name: "notifi-page",
    meta: {
      title: "Thông báo",
      middleware: checkLogin,
    },
    component: () => import("@/views/NotifiView"),
  },
  // {
  //   path: "/ban-be",
  //   name: "friends-page",
  //   meta: {
  //     title: "Ban be",
  //     middleware: checkLogin,
  //   },
  //   component: () => import("@/views/FriendsView"),
  // },
  {
    path: "/",
    name: "home-page",
    meta: {
      title: "Trang chu - Tin nhan",
      middleware: checkLogin,
    },
    component: () => import("@/views/HomeView"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "Messenger";
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
