<template>
  <div>
    <base-card>
      <base-card class="title">
        <h3>Reactivity in action</h3>
      </base-card>

      <base-card class="result-box">
        <input
          type="text"
          placeholder="phát hiện ký tự đặc biệt"
          v-model="name"
        />
        <base-card class="btn-box">
          <button @click="AddNumber(5)">Add 5</button>
          <button @click="AddNumber(1)">Add 1</button>
        </base-card>
        <h3 class="label-result">Result: {{ result }}</h3>
        <h3 class="label-result">Detected special character: {{ text }}</h3>
      </base-card>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";
export default {
  components: { BaseCard },
  data() {
    return {
      number: 0, // dùng watch và hàm có thể state trong app, hoặc function trong app,
      name: "",
      regex: /[^a-zA-Z0-9\s.,]/,
      regexSearch: /[^a-zA-Z0-9\s]/g,
      text: "",
    };
  },
  methods: {
    AddNumber(value) {
      this.number += value;
    },
  },
  computed: {
    result() {
      if (this.number < 37) {
        return "Not there yet!";
      } else if (this.number === 37) {
        return this.number;
      } else {
        return "Too much!";
      }
    },
  },
  watch: {
    result() {
      setTimeout(() => {
        this.number = 0;
      }, 5000);
    },
    name(value) {
      console.log("vào vào");
      const result = this.regex.test(value);
      if (result) {
        this.text = "Detected character is: " + value.match(this.regexSearch);
      } else {
        this.text = "not special character founded in there";
      }
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
}
input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}
.btn-box {
  text-align: center;
}
.btn-box button {
  display: inline-block;
  cursor: pointer;
  background: red;
  color: aliceblue;
  outline: none;
  border: none;
}
h3 {
  text-align: center;
}
</style>