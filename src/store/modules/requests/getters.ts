export default {
  requests(state: any, _: any, _2: any, rootGetters: any) {
    const coachId = rootGetters.userId;
    return state.requests.filter((req: any) => req.coachId === coachId);    
  },
  hasRequest(state: any, getters: any) {
    return getters.requests && getters.requests.length > 0;
  },
};
