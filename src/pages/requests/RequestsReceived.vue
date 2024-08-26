<template>
  <section>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequest && !isLoading">
        <request-items-vue
          v-for="req in receivedRequest"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        />
      </ul>
      <h3 v-else>You haven't received any requests yet !</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItemsVue from "@/components/request/RequestItems.vue";

export default {
  components: {
    RequestItemsVue,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequest() {
      console.log(
        'this.$store.getters["requests/requests"]',
        this.$store.getters["requests/requests"]
      );
      return this.$store.getters["requests/requests"];
    },
    hasRequest() {
      return this.$store.getters["requests/hasRequest"];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("requests/fetchRequests");
      } catch (e) {
        this.error = e.message || "Something went wrong !!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>