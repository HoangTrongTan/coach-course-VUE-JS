export default {
//   login() {},
  async signup(context: any, payload: any) {
    
    const response = await fetch(
      "://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOU9o5jpXzQsjMYzeVoMWe89SfXdsDRjE",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    console.log('response', response);
    
    const responseData = await response.json();

    if(!response.ok){
        console.log('responseData', responseData);
        throw new Error(responseData.error || 'Failed to authenticate.');
    }

    console.log('responseData', responseData);
    
    context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
    })
  },
};
