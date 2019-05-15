<template>
  <div class="results" v-if="this.resBody">
    <!-- <div v-html="resBody"></div> -->
    <div v-if="this.resData === undefined">
      <h3>No results found</h3>
    </div>
    <div v-else>
      <h1>Showing results for</h1>
      <h3>{{this.$route.params.subject}} in {{this.termName}} term</h3>
      <Class v-for="item in resData" :key="item.CRN" :data="item"></Class>
    </div>
  </div>
  <Donut v-else/>
</template>

<script>
import finder from '@/finder';
import Class from '@/components/Class.vue';
import Donut from '@/components/Donut.vue';

export default {
  name: 'results',
  components: {
    Class,
    Donut,
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
    const response = await finder(
      this.$route.params.subject,
      terms[this.termName],
    );
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
