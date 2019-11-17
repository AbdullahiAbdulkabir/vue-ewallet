<template>
  <div id="app">
   <Nav/>
     <router-view/>
    
  </div>
</template>

<script>

import Nav from './components/Nav'
import AuthLogin from './components/AuthLogin'
import Home from './components/Home'
import router from './router.js'
export default {
  name: 'app',
  data () {
    return {
      msg: 'E-wallet'
    }
  },
  components: {AuthLogin,Home, Nav},
  router
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  margin-top: 60px;

}

h1, h2 {
  font-weight: normal;
  font-family: Avenir;
    color: #fff;
    border-bottom: 3px solid #2e94a7;
    width: 120px;
    font-size: 29px;
}

</style>
