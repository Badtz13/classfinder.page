<template>
  <main>
    <h1>Home</h1>
    <h3>Search for a class</h3>
    <form action="javascript:void(0);" name="main">
      <input type="text" v-model="Subject" placeholder="CSCI" required>
      <select v-model="Term" required>
        <option value="Winter">Winter</option>
        <option value="Spring">Spring</option>
        <option value="Summer">Summer</option>
        <option value="Fall" selected>Fall</option>
      </select>
      <button @click="setParams()">Search</button>
    </form>
    <Donut v-if="this.requestMade"/>
    <span v-else-if="this.resData === undefined">
      <h3>There are no classes that match that search</h3>
    </span>
    <section v-else-if="this.resBody">
      <Class v-for="item in this.resData" :key="item.CRN" :data="item"></Class>
    </section>
  </main>
</template>
<script>
import Donut from '@/components/Donut.vue';
import Class from '@/components/Class.vue';
import finder from '@/finder';

export default {
  name: 'Home',
  components: {
    Class,
    Donut,
  },
  data() {
    return {
      Subject: '',
      Term: '',
      resData: {},
      resBody: '',
      requestMade: false,
    };
  },
  methods: {
    setParams() {
      if (this.Term && this.Subject) {
        this.$router.push({ name: 'home', params: { term: this.Term, subject: this.Subject } });
        this.search();
      }
    },
    async search() {
      // check to make sure form has correct elements
      if (this.Term && this.Subject) {
        this.resData = '';
        this.requestMade = true;
        const terms = {
          Winter: 1,
          Spring: 2,
          Summer: 3,
          Fall: 4,
        };
        // call the parser with the form data
        const response = await finder(this.Subject, terms[this.Term]);
        // store data to stop loading animation/show error if empty
        this.resData = response.labeledChunks;
        this.resBody = response.body;
        this.requestMade = false;
      }
    },
  },
  mounted() {
    // this is needed to prevent firefox from not auto selecting the correct select tag
    document.forms.main.reset();

    // if route params are set, use those instead
    if (this.$route.params.term && this.$route.params.subject) {
      this.Term = this.$route.params.term;
      this.Subject = this.$route.params.subject;
      this.search();
    }
  },
};
</script>

<style scoped>
section {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media only screen and (max-width: 600px) {
  section {
    width: calc(100% - 32px);
  }
}
</style>
