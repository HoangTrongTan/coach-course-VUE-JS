<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleClose"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter-vue @change-filter="setFilter"></coach-filter-vue>
    </section>
    <section>
      <base-card>
        <div>
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isCoach" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <li v-for="coach in filteredCoaches" :key="coach.id">
            <coach-item
              :firstName="coach.firstName"
              :areas="coach.areas"
              :id="coach.id"
              :lastName="coach.lastName"
              :rate="coach.hourlyRate"
            />
          </li>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilterVue from "@/components/coaches/CoachFilter.vue";

export default {
  components: { CoachItem, CoachFilterVue },
  data() {
    return {
      isLoading: false,
      error: "",
      activeFilters: {
        frontend: true,
        backend: true,
        carrer: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters.isCoach;
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coaches"];
      console.log("coaches", coaches);
      const rel = coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.carrer && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });

      console.log("result : ", rel);
      return rel;
    },
    hasCoaches() {
      return this.$store.getters["hasCoaches"];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilter(updatedFilter) {
      this.activeFilters = updatedFilter;
    },
    async loadCoaches(resfresh = false) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("loadCoaches", { forceRefresh: resfresh });
        this.isLoading = false;
      } catch (e) {
        this.error = e.message || "Something went wrong !";
      }
      this.isLoading = false;
    },
    handleClose() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>