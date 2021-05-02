<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display:flex;
  height: 50px;
  background-color: black;
}

#nav > a{
  text-decoration: none;
  color:white;
  font-size: 20px;
  padding: 20px 20px;
}

#nav > a:hover,
#nav > a:focus{
  color:#c3c3c3;
}
</style>
