<template>
  <div id="container">
    <h2>Filter</h2>
    <form action="javascript:void(0);">
      <select
        v-model="selectedInstructor"
        autocomplete="off">
        <option value>Instructor:</option>
        <option
          v-for="instructor in instructors"
          :key="instructor"
          :value="instructor"
        >{{ instructor }}</option>
      </select>
      <label>
        <div id="open">Open Sections:</div>
        <input
          v-model="selectedOpen"
          type="checkbox" >
      </label>
      <select
        v-model="selectedCredits"
        autocomplete="off">
        <option value>Credits:</option>
        <option
          v-for="credit in credits"
          :key="credit"
          :value="credit">{{ credit }}</option>
      </select>
      <button @click="filter()">Go</button>
    </form>
  </div>
</template>


<script>
export default {
  name: 'Filters',
  props: {
    response: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      instructors: [],
      selectedInstructor: '',
      credits: [],
      selectedCredits: '',
      selectedOpen: false,
    };
  },
  mounted() {
    this.response.forEach((element) => {
      if (
        !this.instructors.includes(element.Instructor)
        && element.Instructor !== undefined
      ) {
        this.instructors.push(element.Instructor);
      }
      if (
        !this.credits.includes(element.Credits)
        && element.Credits !== undefined
      ) {
        this.credits.push(element.Credits);
      }
    });
    this.instructors.sort();
    this.credits.sort();
  },
  methods: {
    filter() {
      let filteredData = this.response;
      filteredData = filteredData.filter((item) => {
        if (
          this.selectedInstructor
          && item.Instructor !== this.selectedInstructor
        ) {
          return false;
        }
        if (this.selectedCredits && item.Credits !== this.selectedCredits) {
          return false;
        }
        if (
          this.selectedOpen
          && parseInt(item.Enrolled, 10) >= parseInt(item.Cap, 10)
        ) {
          return false;
        }
        return true;
      });
      this.$parent.filterData(filteredData);
    },
  },
};
</script>

<style scoped>

#container {
  box-shadow: var(--light-shadow);
  width: 100%;
  margin: 16px 0px;
  padding: 8px;
}

#course {
  display: grid;
  grid-template-columns: 140px auto;
}

h2 {
  font-size: 20px;
  line-height: 20px;
  margin: 0px;
  padding: 6px 8px;
  border-bottom: 1px solid var(--primary);
}

label {
  font-size: 14px;
}

input,
select {
  border: none;
  margin: 10px;
  border-bottom: 2px solid lightgray;
}

input {
  text-transform: uppercase;
  margin: 0px;
}

input:hover,
select:hover {
  border-bottom: 2px solid darkgray;
}

input:focus,
select:focus {
  border-bottom: 2px solid var(--primary);
}

label {
  display: grid;
  grid-template-columns: 90% 10%;
  padding-left: 3px;
}

form {
  display: grid;
  align-content: space-evenly;
  text-align: left;
}

form > * {
  margin: 8px 0px;
}
</style>
