<template>
  <div class="class">
    <h3>{{ data.Name }}</h3>
    {{data.CRN}}
  </div>
</template>

<script>
export default {
  name: 'Class',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.class {
  margin: 30px auto;
  width: 600px;
  height: 200px;
  display: grid;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
}
</style>
