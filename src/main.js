
import Vue from 'vue'
import App from './App.vue'
import Router from './router.js'


  // Your web app's Firebase configuration
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
  Router,
  render: h => h(App)
})


// new Vue({
// 		el: '#start',
// 		data: {
// 			message: "Hello World"
			
// 		},
// 		mounted(){
// 			// axios.get('http://localhost:8000/skills').then(response=> this.skills=response.data)
// 		}
// 	})