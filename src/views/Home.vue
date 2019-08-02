<template>
  <main>
    <h1>WWU Classfinder Replacement</h1>
    <form
      action="javascript:void(0);"
      name="main">
      <label>Course ID
        <input
          v-model="Subject"
          type="text"
          list="codes"
          placeholder="CSCI"
          required>
        <datalist id="codes">
          <option
            v-for="code in classCodes"
            :key="code">
            {{ code }}
          </option>
        </datalist>
      </label>
      <label> Term
        <select
          v-model="Term"
          required>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
        </select>
      </label>
      <button @click="setParams()">Search</button>
    </form>
    <Donut v-if="requestMade"/>
    <span v-else-if="resData === undefined">
      <h3>There are no classes that match that search</h3>
    </span>
    <section v-else-if="resBody">
      <Class
        v-for="item in resData"
        :key="item.CRN"
        :data="item"/>
    </section>
  </main>
</template>
<script>
// import components
import Donut from '@/components/Donut.vue';
import Class from '@/components/Class.vue';
import finder from '@/finder';
// import class codes
import codes from '@/config/codes.json';

export default {
  name: 'Home',
  components: {
    Class,
    Donut,
  },
  data() {
    return {
      Subject: '',
      Term: '',
      resData: {},
      resBody: '',
      requestMade: false,
      classCodes: codes.codes,
    };
  },
  mounted() {
    // this is needed to prevent firefox from not auto selecting the correct select tag
    document.forms.main.reset();

    // if route params are set, use those instead
    if (this.$route.params.term && this.$route.params.subject) {
      this.Term = this.$route.params.term;
      this.Subject = this.$route.params.subject;
      this.search();
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
        this.resBody = response.body;
        this.requestMade = false;
      }
    },
  },
};
</script>

<style scoped>
section {
  /* width: 80%; */
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 20px;
    line-height: 20px;
  }
  section {
    width: calc(100% - 32px);
  }

}
</style>
