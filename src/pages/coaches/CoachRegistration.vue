<template>
  <div>
    <section>
      <base-card>
        <h2>Register as a coach now !</h2>
        <coach-form-vue @save-data="saveData"></coach-form-vue>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachFormVue from "@/components/coaches/CoachForm.vue";
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {
    CoachFormVue,
    BaseCard,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("registerCoach", data);
      this.$router.replace("/coaches");
    },
  },
  computed: {},
};
</script>