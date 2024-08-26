<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating......" fixed>
      <p>{{ error }}</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <base-card>
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" v-model="email" id="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" v-model.trim="password" id="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </base-card>
    </form>
  </div>
</template>

<script>
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
export default {
  components: { BaseDialog },
  data() {
    return {
      BaseSpinneremail: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === "login") {
          //...
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
      } catch (e) {
        this.error = e.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    },
    handleError(){
      this.error = null;
    }
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>