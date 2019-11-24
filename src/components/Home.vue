<template>
  <div class="home" >
  <h3><b> Welcome, {{name}}</b> </h3>
      <h3><b>Dashboard</b></h3>
    <div>
      <router-link to="/">Home </router-link>
      <router-link to="/deposit">Deposit </router-link>
      <router-link to="/withdraw">Send </router-link>
    <button class="btn btn-danger" @click="logout">logout</button>
    </div>
   <br/><br/>
   <div class="col-md-8 tran">
      <div class="panel panel-primary">
        <div class="panel panel-heading">Recent Transaction</div>
        <div class="panel-body">
         <table class="table table-hover">
         <thead id="tabhead">
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Contact</th>
          </thead>
        <tbody>
          <tr v-for="tran in transa">
            <td>{{tran.trans_id}}</td>
            <td>{{tran.time}}</td>
            <td>{{tran.type}}</td>
            <td>{{tran.amount}}</td>
            <td>{{tran.contact}}</td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div> 
    <div class="col-md-4 acct">
      <div class="panel panel-primary">
        <div class="panel panel-heading">Account Balance:</div>
        <div class="panel-body">${{balance}}
        </div>
      </div>
    </div> 
      
    <button class="btn btn-primary" >Get started</button>
    </div>
    

    
  </div>
</template>

<script>

import AuthLogin from './AuthLogin'
export default {
  name: 'Home',
  data () {
    return {
    name: '',
    msg: 'E-wallet',
    balance: '',
    transa: []
    }
  },
  components: {AuthLogin},
  methods: {
   logout(){
    let rout = this.$router
        firebase.auth().signOut().then(function() {
      // Sign-out successful.
        //console.log('logout................')
            rout.replace('/auth')
        }).catch(function(error) {
          // An error happened.
        });
    }

  },
  mounted(){
    const Self = this
    firebase.auth().onAuthStateChanged((user) => {
     let trans = {}
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
        Self.balance = snapshot.val().balance 
        });
        //return transaction
      var retr = firebase.database().ref('transactions/'+user.uid);
      retr.on('value', function(snapshot) {
      trans = snapshot.val() 
        });
    } else {
      console.log("not logged in")
      // User not logged in or has just logged out.
    }
       //trans = { "type":trans.type, "amount":trans.amount, "contact":trans.contact}
      //this.balance=bal
      this.transa.push({ "type":trans.type, "amount":trans.amount, "contact":trans.contact, "time": trans.time_performed, "trans_id": trans.trans_id})
      //this.name=name
          
  });

  
       
  }
 
}


</script>

<style>


</style>
