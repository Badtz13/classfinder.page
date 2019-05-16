<template>
  <main>
    <h1>Home</h1>
    <Search/>
  </main>
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
