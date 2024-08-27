export default {
  async registerCoach(context: any, data: any) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };

    const token = context.rootState.auth.token;

    const respponse = await fetch(
      `https://udemy-vue-firebase-sites-b9aba-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    const responseData = await respponse.json();

    if (!respponse.ok) {
      console.log("lỗi");
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context: any, payload: any) {

    if(!payload.forceRefresh && !context.getters.shouldUpdate){
      return;
    }

    const response = await fetch(
      "https://udemy-vue-firebase-sites-b9aba-default-rtdb.firebaseio.com/coaches.json"
    );

    const responseData = await response.json();

    if (!response.ok) {
      // context.commit("setCoaches", []);
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      
      coaches.push({
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      });
    }
    
    context.commit("setCoaches", coaches);
    context.commit("setFetchTimesTamp");
  },
};
