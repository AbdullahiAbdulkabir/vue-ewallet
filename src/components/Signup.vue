<template>
  <div class="col-md-11" >
  <form  class="form-inline" @submit="signup" >
        <h3>Sign Up</h3>
  
      <input  class="form-control" type="text" v-model="name"  placeholder="name"  required>
      <input  class="form-control" type="text" v-model="email"  placeholder="email"  required>
      <input  class="form-control" type="number" v-model="number"  placeholder="number"  required>
      <input  class="form-control" type="password" v-model="password" placeholder="password"  required>
      <button type="submit" class="btn btn-primary">Signup</button>

    </form>
      <span>Already SignUp? <router-link to="/auth">Login</router-link></span>

    
  </div>
</template>

<script>


export default{
  name: 'Signup',
  data() {
    return {
    
      name: '',
      email: '',
      number: '',
      password: ''
      
    }
  },
  methods: {

  signup(e){
 var FirebaseRef = firebase.database().ref()
      e.preventDefault()
      let name = this.name
      let num = this.number
      let rout = this.$router
      let stor = {
          "Name": this.name,
          "Email": this.email,
          "Phone": this.number
          }
      if(this.email!='' &&this.password!=''){
         firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(user) {
        
          alert("successful")
          FirebaseRef.child("clients").child(user.uid).set(stor)
          FirebaseRef.child("accounts").child(user.uid).set({ "balance":100, "Date_created": firebase.database.ServerValue.TIMESTAMP})
          rout.replace('/')
      }, 
      function(error) {
          alert("Ops!! "+ error.message)
          }
      )
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