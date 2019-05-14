<template>
  <div class="class" :id="data.CRN">
    <div style="grid-area:Course">{{data.Course}}</div>
    <div style="grid-area:Name">{{data.Name}}</div>
    <div style="grid-area:Instructor">{{data.Instructor}}</div>
    <div style="grid-area:GUR">{{data.GUR}}</div>
    <div style="grid-area:Enrolled">{{data.Enrolled}}/{{data.Cap}}</div>
    <div style="grid-area:Credits">{{data.Credits}} </div>
    <!-- <div style="grid-area:Price"> {{data.Price}}</div> -->
    <div style="grid-area:Room">{{data.Room}}</div>
    <div style="grid-area:Time">{{data.Time}}</div>
    <div style="grid-area:Dates">{{data.Dates}}</div>
    <div v-if="data.LabRoom" style="grid-area:LabRoom">{{data.LabRoom}}</div>
    <div v-if="data.LabTime" style="grid-area:LabTime">{{data.LabTime}}</div>
    <div style="grid-area:Requirements">{{data.Requirements}} {{data.Other}}</div>
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
  width: 100%;
  /* height: 200px; */
  display: grid;
  grid-template-columns: auto 50% auto;
  grid-template-areas:
    "Course Name Instructor"
    "GUR Enrolled Credits"
    "Room Time Dates"
    "LabRoom LabTime ."
    "Requirements Requirements Requirements";
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
  margin: 16px auto;
}

.class > div {
  height: 32px;
  font-size: 16px;
  line-height: 2;
  text-align: left;
  padding: 0px 8px;
}

</style>
