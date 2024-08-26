<template>
  <base-card>
    <h2>Find Your coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Front end</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Back end</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="carrer" checked @change="setFilter" />
      <label for="carrer">Carrer</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        carrer: true,
      },
    };
  },
  methods: {
    setFilter(e) {
      const inputId = e.target.id;
      const isActive = e.target.checked;

      const updatedFilter = {
        ...this.filters,
        [inputId]: isActive,
      };

      this.filters = updatedFilter;
      this.$emit("change-filter", updatedFilter);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>