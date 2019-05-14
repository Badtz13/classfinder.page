<template>
  <div class="home">
    <h1>Home</h1>
    <!-- <router-link to="/results/Summer/CSCI">Results</router-link> -->
    <Search/>
  </div>
</template>
<script>
import Search from '@/components/Search.vue';

export default {
  name: 'Home',
  components: {
    Search,
  },
  props: {
  },
};
</script>
