<template>
  <main>
    <h1>{{this.$route.params.subject}} in {{this.$route.params.term}} term</h1>
    <Class v-for="item in this.$route.params.data" :key="item.CRN" :data="item"></Class>
  </main>
</template>

<script>

import Class from '@/components/Class.vue';

export default {
  name: 'results',
  components: {
    Class,
  },
};
</script>

<style scoped>
main {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media only screen and (max-width: 600px) {
  main {
    width: calc(100% - 32px);
  }
}
</style>
