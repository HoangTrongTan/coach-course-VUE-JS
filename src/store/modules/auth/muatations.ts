export default {
    setUser(state: any, payload: any){
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
    },
    setAutoLoggout(state: any){
        state.didAutoLogout = true;
    }
}