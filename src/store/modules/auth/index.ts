import mutations from "./muatations";
import getters from "./getters";
import actions from "./actions";

export default {
  state() {
    return {
      userId: "c3",
      token: null,
      didAutoLogout: false
    };
  },
  mutations,
  actions,
  getters
};
