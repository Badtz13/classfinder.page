<template>
  <div class="results">
    <!-- <div v-html="resBody"></div> -->
    <h1>Showing results for</h1>
    <h3>{{this.$route.params.subject}} in {{this.termName}} term</h3>
    <Class v-for="item in resData" :key="item.CRN" :data="item"></Class>
  </div>
</template>

<script>
import finder from '@/finder';
import Class from '@/components/Class.vue';

export default {
  name: 'results',
  components: {
    Class,
  },
  data() {
    return {
      resBody: '',
      resData: {},
      termName: '',
    };
  },
  async mounted() {
    const terms = {
      Winter: 1,
      Spring: 2,
      Summer: 3,
      Fall: 4,
    };
    this.termName = this.$route.params.term;
    const response = await finder(this.$route.params.subject, terms[this.termName]);
    this.resBody = response.body;
    this.resData = response.labeledChunks;
  },

};
</script>

<style scoped>
.results {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
