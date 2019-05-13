<template>
  <div class="home">
    <div v-html="resBody"></div>
  </div>
</template>

<script>
import finder from '@/finder';

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      resBody: '',
    };
  },
  async mounted() {
    this.resBody = await finder('CSCI', '3');
  },

};
</script>
