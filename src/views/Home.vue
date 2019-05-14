<template>
  <div class="home">
    <!-- <div v-html="resBody"></div> -->
    <Class v-for="item in resData" :key="item.CRN" :data="item"></Class>
  </div>
</template>

<script>
import finder from '@/finder';
import Class from '@/components/Class.vue';

export default {
  name: 'home',
  components: {
    Class,
  },
  data() {
    return {
      resBody: '',
      resData: {},
    };
  },
  async mounted() {
    const response = await finder('ART', '3');
    this.resBody = response.body;
    this.resData = response.labeledChunks;
  },

};
</script>

<style scoped>

.home {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
