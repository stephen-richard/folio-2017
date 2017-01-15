import * as types from '../mutations-types'

const state = {
  work: 0,
  workCount: 0,
  prevWork: 0,
  nextWork: 0
}

const getters = {
  getCurrentWork: state => {
    return state.work
  },
  getWorkCount: state => {
    return state.workCount
  },
  getPrevWork: state => {
    return state.work - 1
  },
  getNextWork: state => {
    return state.work + 1
  },
  hasPrevWork: state => {
    return state.work - 1 > -1
  },
  hasNextWork: state => {
    return state.work + 1 < state.workCount
  }
}

const mutations = {
  [types.CHANGE_CURRENT_WORK] (state, workId) {
    state.work = workId
  },
  [types.SET_WORK_COUNT] (state, workNb) {
    state.workCount = workNb
  }
}

export default {
  state,
  getters,
  mutations
}
