<template>
  <div class="home" >
  <h3><b> Welcome, {{name}}</b> </h3>
      <h3><b>Dashboard</b></h3>
     <div>
      <router-link to="/">Home </router-link>
      <router-link to="/send">Send </router-link>
      <router-link to="/withdraw">withdraw </router-link>
    <button class="btn btn-danger" @click="logout">logout</button>
    </div>
   <br/><br/>
   
    <div class="col-md-12 acct">
      <div class="panel panel-primary">
        <div class="panel panel-heading">Send Fund</div>
        <div class="panel-body">

        <form  class="" @submit="send" >
          <div class="col-md-6">
              <div class="form-group">
                  <label for="exampleInputPassword1">Receiver Contacts</label>
                  <input type="text" class="form-control" v-model="contact" placeholder="e.g 254702244756">
              </div>
              </div>
              <div class="col-md-6">
              <div class="form-group">
                  <label for="exampleInputFile">Amount</label>
                  <input type="text" class="form-control" v-model="amount" placeholder="amount to send">
              </div>
              </div>
              <div class="form-group">
                  <label for="exampleInputFile">Description</label>
                  <textarea class="form-control" v-model="description" id="description" placeholder="short description"></textarea>
              
              </div>
              <div class="form-group">
              <button type="submit" class="btn btn-primary">SEND MONEY</button>
              </div>

    </form>

        </div>
      </div>
    </div> 
    </div>
    

    
  </div>
</template>

<script>

import AuthLogin from './AuthLogin'

export default {
  name: 'Send',
  data () {
    return {
    name:'',
    contact: '',
    description: '',
    type: 'send',
    amount: '',
    initb:''
    }
  },
  components: {AuthLogin},
  methods: {
  send(e){
    e.preventDefault()
    let init = this.initb
    let am= this.amount
    let rout = this.$router
    let stor = {
          "amount": this.amount,
          "contact": this.contact,
          "description": this.description,
          "type": this.type
          }
    var FirebaseRef = firebase.database().ref()
    firebase.auth().onAuthStateChanged((user) => {
    
    if (init>=am) {
     let bal = init-am
      FirebaseRef.child('transactions').child(user.uid).set(stor)
      firebase.database().ref('accounts/'+user.uid+'/balance').set(bal)
      alert("sent")
      rout.replace('/')
    }else{
      alert("insufficient balance")
    }
    })
    
  },
   logout(){
    let rout = this.$router
        firebase.auth().signOut().then(function() {
      // Sign-out successful.
        //console.log('logout...............')
            rout.replace('/auth')
        }).catch(function(error) {
          // An error happened.
        });
    }

  },
  mounted(){
    const Self = this
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      //Return users name
      var refere = firebase.database().ref('clients/'+user.uid);
      refere.on('value', function(snapshot) {
      Self.name = snapshot.val().Name
      
        });
      //return account balance
      var reb = firebase.database().ref('accounts/'+user.uid);
      reb.on('value', function(snapshot) {
      Self.initb = snapshot.val().balance 
        });
    }
      
   
      console.log(this.initb)
    })
  }
 
}


</script>

<style>

.home .acct,.tran{
  color:black;

}
.home .acct .panel-body{
  font-size: 28px;
  font-weight: bold;
}



</style>
