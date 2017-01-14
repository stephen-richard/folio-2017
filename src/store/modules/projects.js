import * as types from '../mutations-types'

const state = {
  work: 0
}

const getters = {
  currentWork: state => state.work
}

const mutations = {
  [types.CHANGE_CURRENT_WORK] (state, { workId }) {
    state.work = workId
  }
}

export default {
  state,
  getters,
  mutations
}
