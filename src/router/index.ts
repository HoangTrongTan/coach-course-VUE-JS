import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import CoachDetail from '../pages/coaches/CoachDetail.vue';
import CoachesList   from '../pages/coaches/CoachesList.vue';
import CoachRegistation from '../pages/coaches/CoachRegistration.vue';
import userAuth from '../pages/auth/UserAuth.vue';

import ContactCoach from '../pages/requests/ContactCoach.vue';
import RequestsReceived from '../pages/requests/RequestsReceived.vue';

import NotFound from '../pages/NotFound.vue';

import ReactivityInAction from '../pages/Reactivity/ReactivityInAction.vue';


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
    path: '/coaches/:id',
    props: true,
    children: [
      { path: 'contact', component: ContactCoach }
    ]
  },
  { path: '/register', component: CoachRegistation, },
  { path: '/requests', component: RequestsReceived, },
  { path: '/computed-watch-vue', component: ReactivityInAction },
  { path: '/auth', component: userAuth },
  { path: '/:notFound(.*)', component: NotFound, },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
