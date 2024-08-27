<template>
  <div>
    <base-dialog :show="!!error" title="An error occced" @close="handleClose">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="registering......" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
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
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    CoachFormVue,
    BaseCard,
    BaseDialog,
    BaseSpinner,
  },
  methods: {
    async saveData(data) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("registerCoach", data);
        this.$router.replace("/coaches");
      } catch (e) {
        this.error = e.message || "An Error when register !!";
      }
      this.isLoading = false;
    },
    handleClose() {
      this.error = null;
    },
  },
};
</script>