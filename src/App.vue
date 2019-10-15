<template>
  <div id="app">
    <h2>WWU Classfinder Replacement</h2>
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>

:root {
  --primary: #38B2AC;


  --light-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
  --hover-shadow: 2px 6px 30px rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
  font-family: 'Noto Sans', "Helvetica", "Arial", sans-serif;
  font-weight: normal;
}

h2 {
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
nav {
  width: 500px;
  margin: auto;
  display:block;
  padding-bottom: 16px;
}

nav>a {
color: var(--primary);
text-decoration: none;
display: inline-block;
text-decoration: none;
line-height: 2;
margin: 0px 8px;
font-size: 16px;
}

.router-link-active,
.router-link-exact-active {

  border-bottom: 2px solid var(--primary);
}

</style>
