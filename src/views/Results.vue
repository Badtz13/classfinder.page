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
  <div v-else class="donut"></div>
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

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: block;
  margin: 50px auto;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
</style>
