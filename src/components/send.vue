<template>
  <div class="home" >
  <h3><b> Welcome, {{name}}</b> </h3>
      <h3><b>Dashboard</b></h3>
     <div>
      <router-link to="/">Home </router-link>
      <router-link to="/deposit">Deposit </router-link>
      <router-link to="/withdraw">withdraw </router-link>
    <button class="btn btn-danger" @click="logout">logout</button>
    </div>
   <br/><br/>
   
    <div class="col-md-12 acct">
      <div class="panel panel-primary">
        <div class="panel panel-heading">Deposit Fund</div>
        <div class="panel-body">

        <form  class="" @submit="send" >
          <!-- <div class="col-md-6"> -->
              <!-- <div class="form-group">
                  <label for="exampleInputPassword1">Receiver Contacts</label>
                  <input type="text" class="form-control" v-model="contact" placeholder="e.g 254702244756">
              </div> -->
              <!-- </div> -->
              <div class="col-md-6">
              <div class="form-group">
                  <label for="exampleInputFile">Amount</label>
                  <input type="text" class="form-control" v-model="amount" placeholder="amount to deposit">
              </div>
              </div>
              <div class="form-group">
                  <label for="exampleInputFile">Description</label>
                  <textarea class="form-control" v-model="description" id="description" placeholder="short description"></textarea>
              
              </div>
              <div class="form-group">
              <button type="submit" class="btn btn-primary">DEPOSIT MONEY</button>
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
    description: '',
    type: 'Deposit',
    amount: '',
    initb:'',
    time: 'ServerValue.TIMESTAMP'
    }
  },
  components: {AuthLogin},
  methods: {
  send(e){
    const Self = this
    let i = 0
    e.preventDefault()
    let rout = this.$router
  
    var FirebaseRef = firebase.database().ref()
    firebase.auth().onAuthStateChanged((user) => {
     let bal = parseInt(Self.initb)+parseInt(Self.amount)
     i=i+=1
      FirebaseRef.child('transactions').child(user.uid).set( {
            "trans_id": Math.floor((Math.random()*10000000)+i),
          "amount": Self.amount,    
          "description": Self.description,
          "type": Self.type,
          "time_performed": firebase.database.ServerValue.TIMESTAMP

          })
      firebase.database().ref('accounts/'+user.uid+'/balance').set(bal)
      
      // console.log(typeof(bal))
      alert("Deposited")
      rout.replace('/')
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
</style>
