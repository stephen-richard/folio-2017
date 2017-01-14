import * as types from '../mutations-types'

const state = {
  loading: false,
  introSkipped: true
}

const getters = {
  isLoading: state => {
    return state.loading
  },
  isIntroSkipped: state => {
    return state.introSkipped
  }
}

const mutations = {
  [types.SET_IS_LOADING] (state, loadingState) {
    state.loading = loadingState
  },
  [types.SET_INTRO_SKIPPED] (state, introState) {
    state.introSkipped = introState
  }
}

export default {
  state,
  getters,
  mutations
}
