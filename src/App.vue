<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <button @click="generateCookie">Сгенерировать куки</button>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted(){
    //Если куки не сгенерировано, то генерим
    if(document.cookie=="") this.generateCookie();
  },

  methods:{
    generateCookie(){
      document.cookie=Math.random();
    }
  }
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

#nav > a,
#nav > button{
  text-decoration: none;
  color: white;
  font-size: 20px;
  padding: 20px 20px;
  background: black;
  border: black;
}

#nav > a:hover,
#nav > a:focus,
#nav > button:hover,
#nav > button:focus{
  color:#c3c3c3;
  cursor: pointer;
}
</style>
