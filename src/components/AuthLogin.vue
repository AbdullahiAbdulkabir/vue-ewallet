<template>
  <div class="col-md-11" >
  <form  class="form-inline" @submit="login" >
  <h3>Sign in</h3>
      <input  class="form-control" type="text" v-model="email"  placeholder="email" name="title" required>
      <input  class="form-control" type="password" v-model="password" placeholder="password" name="title" required>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <span>Not yet SignUp? <router-link to="/signup">Sign Up</router-link></span>


    
  </div>
</template>

<script>


export default{
	name: 'AuthLogin',
  data() {
    return {
    username: '',
      email: '',
      password: ''
      
    }
  },
  methods: {

    login(e){
    let rout = this.$router
    e.preventDefault()
      if(this.email!='' &&this.password!=''){
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function(user) {
        let username = user.email
            alert("login successful")
            rout.replace('/')
          }, function(err) {
              alert("Ops login failed"+ err.message)
          })
      }

    } 
  }
}

</script>
<style >
.form-inline input{
  background-color: #363a3d;
  border-color: #2e94a7;
  color:white;
  padding: 24px; 
}
.form-inline button {
	background-color: #242829;
    border-color: #2e94a7;
}
.form-inline button: hover {
	background-color: #2e94a7;
    
}
.signin{
  display:none;
}

</style>