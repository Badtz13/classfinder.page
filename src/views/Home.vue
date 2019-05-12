<template>
  <div class="home">
    <div v-html="resBody"></div>
  </div>
</template>

<script>
import fetch from 'node-fetch';

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      resBody: '',
    };
  },
  mounted() {
    const self = this;
    const term = '201930';
    const subject = 'CSCI';
    const data = `sel_subj=dummy&sel_subj=dummy&sel_gur=dummy&sel_gur=dummy&sel_attr=dummy&sel_site=dummy&sel_day=dummy&sel_open=dummy&sel_crn=&term=${term}&sel_gur=All&sel_attr=All&sel_site=All&sel_subj=${subject}&sel_inst=ANY&sel_crse=&begin_hh=0&begin_mi=A&end_hh=0&end_mi=A&sel_cdts=%25`;

    const myRequest = new Request('https://cors-anywhere.herokuapp.com/https://admin.wwu.edu/pls/wwis/wwsktime.ListClass', {
      method: 'POST',
      body: data,
    });

    fetch(myRequest).then(response => response.text())
      .then((text) => {
        console.log(text);
        self.resBody = text;
      });
  },

};
</script>
