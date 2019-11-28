import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home'
import AuthLogin from './components/AuthLogin'
import Signup from './components/Signup'
import Send from './components/Send'
import withdraw from './components/withdraw'
import Router from 'vue-router'

Vue.use(Router)


const router = new Router({
  mode:'history',
	routes: [
	{
		path: '/signup',
		component: Signup,
		name: 'Signup',
	},
	{
		path: '/auth',
		component: AuthLogin,
		name: 'AuthLogin',
	},
	{
		path: '/deposit',
		component: Send,
		name: 'Deposit',
		meta:{
			requireAuth:true
		}
	},
	{
		path: '/withdraw',
		component: withdraw,
		name: 'withdraw',
		meta:{
			requireAuth:true
		}
	},
	{
		path: '*',
		redirect: '/auth'
	},
	{
		path: '/',
		component: Home,
		name: 'Home',
		meta:{
			requireAuth:true
		}
	}
	]

  })

router.beforeEach((to, from, next) => {
  const currentUser =  firebase.auth().currentUser;
  const requireAuth = to.matched.some(record=>record.meta.requireAuth)
  if (requireAuth && !currentUser) next('auth')
  else if (!requireAuth && currentUser) next('')
  else next()
})

export default router
