import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

var firebaseConfig = {
    apiKey: "AIzaSyDOrFe-pJXVs-TbKuR0AvYXhW2UW14YYw0",
    authDomain: "e-wallet-8e021.firebaseapp.com",
    databaseURL: "https://e-wallet-8e021.firebaseio.com",
    projectId: "e-wallet-8e021",
    storageBucket: "e-wallet-8e021.appspot.com",
    messagingSenderId: "58412072729",
    appId: "1:58412072729:web:eebb0368dd0cf71d110f88"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

new Vue({
  el: '#app',
  router,
  render: h => h(App),

})
