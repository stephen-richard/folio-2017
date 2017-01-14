import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import projects from './modules/projects'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    global,
    projects
  }
})
