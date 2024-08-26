<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <h2>Interested? Reach out now</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </base-card>
      <router-view></router-view>
    </section>
    <section>
      <base-card>
        <base-bage
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-bage>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    contactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    console.log("this.$store.getters.coaches", this.$store.getters.coaches);
    this.selectedCoach = this.$store.getters.coaches?.find(
      (coach) => coach.id === this.id
    );
  },
};
</script>