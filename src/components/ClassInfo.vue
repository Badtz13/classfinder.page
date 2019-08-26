<template>
  <div
    class="course-title"
    @mouseover="getInfo()">
    {{ course }}
    <caption>
      <p
        v-if="description"
        v-html="description" />
      <Donut v-else />
    </caption>
  </div>
</template>

<script>
import Donut from '@/components/Donut.vue';

export default {
  name: 'ClassInfo',
  components: {
    Donut,
  },
  props: {
    course: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      description: '',
    };
  },
  methods: {
    async getInfo() { // fetches class description from old classfinder backend
      if (!this.response) {
        const year = new Date();
        const terms = {
          Winter: 1,
          Spring: 2,
          Summer: 3,
          Fall: 4,
        };
        const courseArray = this.course.split(' ');
        const course = courseArray[0] + courseArray[1];
        const url = `https://admin.wwu.edu/pls/wwis/wwsktime.SelText?subj_crse=${year.getFullYear()}${terms[this.term]}0${course}`;

        const request = new Request(
          `https://cors-anywhere.herokuapp.com/${url}`,
          {
            method: 'POST',
            body: this.data,
          },
        );
        const unparsedDescription = await fetch(request).then(response => response.text());
        // eslint-disable-next-line prefer-destructuring
        this.description = unparsedDescription.split('<br />')[2];
      }
    },
  },
};
</script>

<style scoped>
.course-title {
  padding: 0px;
  display: inline;
}

.course-title:hover {
  cursor: default;
}

caption {
  display: none;
  position: absolute;
  background: white;
  box-shadow: var(--light-shadow);
  width: 350px;
}

div:hover > caption {
  display: block;
}

p {
  padding: 16px;
  margin: 0px;
  font-size: 14px;
  text-align: left;
}
</style>
