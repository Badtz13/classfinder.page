<template>
  <article class="class" :id="data.CRN">
    <div class="Course">{{data.Course}}</div>
    <div class="Name">{{data.Name}}</div>
    <div class="Instructor">{{data.Instructor}}</div>
    <div v-if="data.GUR" class="GUR">GUR: {{data.GUR}}</div>
    <div v-if="data.Enrolled == data.Cap" class="Enrolled red">
      {{data.Enrolled}}/{{data.Cap}} Enrolled
    </div>
    <div v-else class="Enrolled">{{data.Enrolled}}/{{data.Cap}} Enrolled</div>
    <div class="Credits">{{data.Credits}} Credits</div>
    <!-- <div class="Price"> {{data.Price}}</div> -->
    <div class="Room">{{data.Room}}</div>
    <div class="Time">{{data.Time}}</div>
    <div class="Dates">{{data.Dates}}</div>
    <div v-if="data.LabRoom" class="LabRoom">{{data.LabRoom}}</div>
    <div v-if="data.LabTime" class="LabTime">{{data.LabTime}}</div>
    <div class="Requirements">Requirements: {{data.Requirements}} {{data.Other}}</div>
  </article>
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
  grid-template-columns: .5fr 1.5fr 1fr;
  grid-template-areas:
    "Course Name Instructor"
    "GUR Enrolled Credits"
    "Room Time Dates"
    "LabRoom LabTime ."
    "Requirements Requirements Requirements";
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
  margin: 16px auto;
}

div {
  font-size: 16px;
  text-align: left;
  padding: 8px;
}

.Course,.Name,.Instructor {
  font-size: 20px;
  border-bottom: 1px solid lightseagreen;
}

.red{
  color: #F55;
}

.Course { grid-area: Course; }
.Name { grid-area: Name; }
.Instructor { grid-area: Instructor; }
.GUR { grid-area: GUR; }
.Enrolled { grid-area: Enrolled; }
.Credits { grid-area: Credits; }
.Room { grid-area: Room; }
.Time { grid-area: Time; }
.Dates { grid-area: Dates; }
.LabRoom { grid-area: LabRoom; }
.LabTime { grid-area: LabTime; }
.Requirements { grid-area: Requirements; }

</style>
