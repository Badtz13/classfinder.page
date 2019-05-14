<template>
  <div>
    <h3>Search for a class</h3>
    <input type="text" v-model="Subject" placeholder="CSCI" required>
    <select v-model="Term" autocomplete="off" required>
      <option value="Winter">Winter</option>
      <option value="Spring">Spring</option>
      <option value="Summer">Summer</option>
      <option value="Fall" selected>Fall</option>
    </select>
    <button @click="search()">Search</button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
  },
  data() {
    return {
      Subject: '',
      Term: '',
    };
  },
  methods: {
    search() {
      if (this.Term && this.Subject) {
        this.$router.push({ name: 'results', params: { term: this.Term, subject: this.Subject } });
      }
    },
  },
};
</script>

<style scoped>

div {
  width: 400px;
  height: 120px;
  margin: auto;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
}
h3 {
  padding-top: 26px;
}

</style>
