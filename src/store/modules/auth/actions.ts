let timer: any;
export default {
  async login(context: any, payload: any) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context: any, payload: any) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  logout(context: any) {
    clearTimeout(timer);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },
  tryLogin(context: any) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +(tokenExpiration || 0) - new Date().getTime();
    
    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn)

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
      });
    }
  },
  async auth(context: any, payload: any) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOU9o5jpXzQsjMYzeVoMWe89SfXdsDRjE";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOU9o5jpXzQsjMYzeVoMWe89SfXdsDRjE";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Failed to authenticate.");
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", String(expirationDate));

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  autoLogout(context: any){
    context.dispatch('logout');
    context.commit('setAutoLoggout')
  }
};
