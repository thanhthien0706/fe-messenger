import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/dang-ki",
    name: "signup-page",
    meta: {
      title: "Đăng kí",
    },
    component: () => import("@/views/auth/SignupView.vue"),
  },
  {
    path: "/dang-nhap",
    name: "signin-page",
    meta: {
      title: "Đăng nhập",
    },
    component: () => import("@/views/auth/SignInView.vue"),
  },
  {
    path: "/ban-be",
    name: "friends-page",
    meta: {
      title: "Ban be",
    },
    component: () => import("@/views/FriendsView.vue"),
  },
  {
    path: "/",
    name: "home-page",
    meta: {
      title: "Trang chu - Tin nhan",
    },
    component: () => import("@/views/HomeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "Us love";
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
