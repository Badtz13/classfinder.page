<template>
  <section>
    <h3>Search for a class</h3>
    <form action="javascript:void(0);" name="main">
      <input type="text" v-model="Subject" placeholder="CSCI" required>
      <select v-model="Term" required>
        <option value="Winter">Winter</option>
        <option value="Spring">Spring</option>
        <option value="Summer">Summer</option>
        <option value="Fall" selected>Fall</option>
      </select>
      <button @click="search()">Search</button>
    </form>
    <span v-if="this.resData === undefined">
      <h3>There are no classes that match that search</h3>
    </span>
    <Donut v-else-if="this.requestMade"/>
  </section>
</template>

<script>
import Donut from '@/components/Donut.vue';
import finder from '@/finder';

export default {
  name: 'Search',
  components: {
    Donut,
  },
  props: {},
  data() {
    return {
      Subject: '',
      Term: '',
      resData: {},
      requestMade: false,
    };
  },
  methods: {
    async search() {
      if (this.Term && this.Subject) {
        this.resData = '';
        this.requestMade = true;
        const terms = {
          Winter: 1,
          Spring: 2,
          Summer: 3,
          Fall: 4,
        };
        const response = await finder(
          this.Subject,
          terms[this.Term],
        );
        this.resData = response.labeledChunks;
        this.requestMade = false;
        if (this.resData !== undefined) {
          this.$router.push({
            name: 'results',
            params: { term: this.Term, subject: this.Subject, data: response.labeledChunks },
          });
        }
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
section {
  width: 400px;
  height: 250px;
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
