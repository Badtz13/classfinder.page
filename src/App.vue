<template>
  <div id="app">
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
      <a
        class="report"
        href="mailto:badtzmaru139@gmail.com?subject=Classfinder issue">
        Report an issue
      </a>
    </nav>
    <router-view/>
  </div>
</template>

<style>

:root {
  --primary: #0083d6;
  --light-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
  --hover-shadow: 2px 6px 30px rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
  font-family: 'Noto Sans', "Helvetica", "Arial", sans-serif;
  font-weight: normal;
}

h1 {
  color: var(--primary);
}

html,
body,
#app {
  margin: 0px;
  padding: 0px;
  width: 100%;
}
#app {
  text-align: center;
}
</style>

<style scoped>
a {
  text-decoration: underline;
  color: var(--primary);
}
nav {
  width: 500px;
  margin: auto;
  display:inline-block;
}
nav>a {
  padding: 16px;
  line-height: 2;
}

</style>
