<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
:root {
  --primary: orchid;
  --primary-text: #fff;
  --light-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
  --hover-shadow: 2px 6px 30px rgba(0, 0, 0, 0.3);
}
* {
  box-sizing: border-box;
  font-family: "PT Sans", sans-serif;
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
