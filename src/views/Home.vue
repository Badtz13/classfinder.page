<template>
  <main>
    <h1>WWU Classfinder Replacement</h1>
    <form
      action="javascript:void(0);"
      name="main">
      <label>
        Course ID
        <input
          v-model="Subject"
          type="text"
          placeholder="CSCI">
      </label>
      <label>
        Term
        <select v-model="Term">
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
        </select>
      </label>
      <button @click="setParams()">Search</button>
    </form>
    <Donut v-if="requestMade"/>
    <span v-else-if="filteredData === undefined">
      <h3>There are no classes that match that search</h3>
    </span>
    <section v-else-if="resBody">
      <div class="class-container">
        <Class
          v-for="item in filteredData"
          :key="item.CRN"
          :data="item"
          :term="Term"/>
      </div>
      <aside>
        <Filters :response="resData"/>
      </aside>
    </section>
  </main>
</template>
<script>
// import components
import Filters from '@/components/Filters.vue';
import Donut from '@/components/Donut.vue';
import Class from '@/components/Class.vue';
// import script for finding classes
import finder from '@/finder';

export default {
  name: 'Home',
  components: {
    Filters,
    Class,
    Donut,
  },
  data() {
    return {
      Subject: '',
      Term: 'Fall',
      resData: {},
      filteredData: {},
      resBody: '',
      requestMade: false,
    };
  },
  mounted() {
    // if route params are set, use those instead
    if (this.$route.params.term && this.$route.params.subject) {
      this.Term = this.$route.params.term;
      this.Subject = this.$route.params.subject;
      this.search();
      // this is needed to prevent firefox from not auto selecting the correct select tag
      document.forms.main.reset();
    }
  },
  methods: {
    setParams() { // sets url parameters
      if (this.Term && this.Subject) {
        this.$router.push({ name: 'home', params: { term: this.Term, subject: this.Subject.toUpperCase() } });
        this.search();
      }
    },
    async search() { // searches for classes
      // check to make sure form has correct elements
      if (this.Term && this.Subject) {
        this.resData = '';
        this.requestMade = true;
        const terms = {
          Winter: 1,
          Spring: 2,
          Summer: 3,
          Fall: 4,
        };
        // call the parser with the form data
        const response = await finder(this.Subject.toUpperCase(), terms[this.Term]);
        // store data to stop loading animation/show error if empty
        this.resData = response.labeledChunks;
        this.filteredData = this.resData;
        this.resBody = response.body;
        this.requestMade = false;
      }
    },
    filterData(newData) {
      this.filteredData = newData;
    },
  },
};
</script>

<style scoped>
section {
  width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 80% auto;
}
.class-container {
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

aside {
  margin: 0px 16px;
}

button, select,input {
  transition: border .25s ease;
}

button {
  border: 2px solid lightgrey;
  background: white;
}

button:hover {
  border: 2px solid darkgrey;
  cursor: pointer;
}

button:active {
  border: 2px solid var(--primary);
}

input,
select {
  border: none;
  margin: 10px;
  border-bottom: 2px solid lightgray;
}

input {
  text-transform: uppercase;
}

input:hover,select:hover {
    border-bottom: 2px solid darkgray;
}

input:focus,
select:focus {
  border-bottom: 2px solid var(--primary);
}

@media only screen and (max-width: 1232px) {
  h1 {
    font-size: 20px;
    line-height: 20px;
  }
  section {
    width: calc(100% - 32px);
    grid-template-columns: 100%;
  }
  aside {
    display: none;
  }

}
</style>
