import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index";
import requestModule from './modules/requests/index';
import authModule from './modules/auth/index';

export default createStore({
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    coaches: coachesModule,
    requests: requestModule,
    auth: authModule
  },
});
