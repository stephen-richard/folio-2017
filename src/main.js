// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import Project from './components/Project'
import About from './components/About'
import store from './store'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    component: Home,
    beforeRouteEnter: (to, from, next) => {
      console.log('router enter')
    },
    beforeRouteLeave: (to, from, next) => {
      console.log(this.$route.path)
    }
  },
  { path: '/about', component: About },
  { path: '/:project_name', name: 'project', component: Project },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

// @TODO
// Get projects here to filter acceptable routes

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
