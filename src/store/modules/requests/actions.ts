export default {
  async contactCoach(context: any, payload: any) {
    const newRequest: any = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://udemy-vue-firebase-sites-b9aba-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to send request."
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context: any) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://udemy-vue-firebase-sites-b9aba-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.error || "Failed to fetch requests");
    }

    const requests = [];
    for (const key in responseData) {
      requests.push({
        id: key,
        coachId: responseData[key].coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      });
    }

    context.commit("setRequests", requests);
  },
};
