<template>
  <div>
    <h3>Search for a class</h3>
    <form action="javascript:void(0);" name="main">
      <input type="text" v-model="Subject" placeholder="CSCI" required>
      <select v-model="Term" required>
        <option value="Winter">Winter</option>
        <option value="Spring">Spring</option>
        <option value="Summer">Summer</option>
        <option value="Fall" selected >Fall</option>
      </select>
      <button @click="search()">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {},
  data() {
    return {
      Subject: '',
      Term: '',
    };
  },
  methods: {
    search() {
      if (this.Term && this.Subject) {
        this.$router.push({
          name: 'results',
          params: { term: this.Term, subject: this.Subject },
        });
      }
    },
  },
  mounted() {
    // this is needed to prevent firefox from not auto selecting the correct select tag
    document.forms.main.reset();
  },
};
</script>

<style scoped>
div {
  width: 400px;
  height: 120px;
  margin: auto;
  box-shadow: var(--light-shadow);
}
h3 {
  padding-top: 26px;
}
input,
select {
  border: none;
  margin: 10px;
  border-bottom: 2px solid lightgray;
}
input:focus,
select:focus {
  border-bottom: 2px solid var(--primary);
}
</style>
