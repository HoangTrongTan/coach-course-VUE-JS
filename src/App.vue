<template>
  <the-header />
  <router-view v-slot="slotProps">
    <transition mode="out-in" name="route">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLoggout(){
      return this.$store.getters.didAutoLoggout;
    }
  },
  created(){
    this.$store.dispatch('tryLogin')
  },
  watch: {
    didAutoLoggout(curValue, oldValue){
      if(curValue && curValue !== oldValue){
        this.$router.replace('/coaches')
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to, .route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>
