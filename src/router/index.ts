import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import CoachDetail from "../pages/coaches/CoachDetail.vue";
const CoachDetail = defineAsyncComponent(
  () => import("../pages/coaches/CoachDetail.vue")
);
// import CoachesList from "../pages/coaches/CoachesList.vue";
const CoachesList = defineAsyncComponent(
  () => import("../pages/coaches/CoachesList.vue")
);
// import CoachRegistation from "../pages/coaches/CoachRegistration.vue";
const CoachRegistation = defineAsyncComponent(
  () => import("../pages/coaches/CoachRegistration.vue")
);
// import userAuth from "../pages/auth/UserAuth.vue";
const userAuth = defineAsyncComponent(
  () => import("../pages/auth/UserAuth.vue")
);
// import ContactCoach from "../pages/requests/ContactCoach.vue";
const ContactCoach = defineAsyncComponent(
  () => import("../pages/requests/ContactCoach.vue")
);
// import RequestsReceived from "../pages/requests/RequestsReceived.vue";
const RequestsReceived = defineAsyncComponent(
  () => import("../pages/requests/RequestsReceived.vue")
);

// import NotFound from "../pages/NotFound.vue";
const NotFound = defineAsyncComponent(() => import("../pages/NotFound.vue"));

// import ReactivityInAction from "../pages/Reactivity/ReactivityInAction.vue";
const ReactivityInAction = defineAsyncComponent(
  () => import("../pages/Reactivity/ReactivityInAction.vue")
);

import store from "@/store";
import { defineAsyncComponent } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/coaches",
  },
  {
    path: "/coaches",
    component: CoachesList,
  },
  {
    component: CoachDetail,
    path: "/coaches/:id",
    props: true,
    children: [{ path: "contact", component: ContactCoach }],
  },
  { path: "/register", component: CoachRegistation },
  {
    path: "/requests",
    component: RequestsReceived,
    meta: { requiresAuth: true },
  },
  {
    path: "/computed-watch-vue",
    component: ReactivityInAction,
    meta: { requiresAuth: true },
  },
  { path: "/auth", component: userAuth, meta: { requiresUnAuth: true } },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
