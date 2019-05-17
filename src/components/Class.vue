<template>
  <article>
    <div class="colorbar" :style="{ backgroundColor: data.Color }"></div>
    <div class="quickbuttons"></div>
    <div class="Course">{{data.Course}}</div>
    <div class="Name">{{data.Name}}</div>
    <div class="Instructor">{{data.Instructor}}</div>
    <div v-if="data.GUR" class="GUR">GUR: {{data.GUR}}</div>
    <div v-if="data.Enrolled == data.Cap" class="Enrolled red">
      {{data.Enrolled}}/{{data.Cap}} Enrolled
    </div>
    <div v-else class="Enrolled">{{data.Enrolled}}/{{data.Cap}} Enrolled</div>
    <div class="Credits" v-if="data.Credits">
      {{data.Credits}} Credits
    </div>
    <div class="Credits" v-else>
      0 Credits
    </div>
    <!-- <div class="Price"> {{data.Price}}</div> -->
    <div class="Room">{{data.Room}}</div>
    <div class="Time">{{data.Time}}</div>
    <div class="Dates">{{data.Dates}}</div>
    <div v-if="data.LabRoom" class="LabRoom">{{data.LabRoom}}</div>
    <div v-if="data.LabTime" class="LabTime">{{data.LabTime}}</div>
    <div v-if="data.Requirements || data.Other" class="Requirements">
      Requirements: {{data.Requirements}} {{data.Other}}
    </div>
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
article {
  width: 100%;
  /* height: 200px; */
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns:8px .5fr 1.5fr 1fr 32px;
  grid-template-areas:
    "colorbar Course Name Instructor quickbuttons"
    "colorbar GUR Enrolled Credits quickbuttons"
    "colorbar Room Time Dates quickbuttons"
    "colorbar LabRoom LabTime . quickbuttons"
    "colorbar Requirements Requirements Requirements quickbuttons";
  box-shadow: var(--light-shadow);
  margin: 16px auto;
}

div {
  font-size: 16px;
  text-align: left;
  padding: 8px;
}

.colorbar,.quickbuttons{
  padding: 0px;
}

.Course, .Name, .Instructor {
  font-size: 20px;
  line-height: 20px;
  padding: 6px 8px;
  border-bottom: 1px solid var(--primary);
}

.red {
  color: #F55;
}

@media only screen and (max-width: 600px) {
  article {
    grid-template-columns:auto auto auto;
    grid-template-areas:
    "Course Name Instructor"
    "GUR Enrolled Credits"
    "Room Time Dates"
    "LabRoom LabTime ."
    "Requirements Requirements Requirements";
  }
  .quickbuttons,.colorbar {
    display: none;
  }
}

.colorbar {grid-area: colorbar; }
.quickbuttons {grid-area: quickbuttons; }
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
