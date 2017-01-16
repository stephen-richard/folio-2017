import * as types from '../mutations-types'

const state = {
  loading: false,
  introSkipped: false,
  page: '',
  menuOpen: false
}

const getters = {
  isLoading: state => {
    return state.loading
  },
  isIntroSkipped: state => {
    return state.introSkipped
  },
  getPage: state => {
    return state.page
  },
  isMenuOpen: state => {
    return state.menuOpen
  }
}

const mutations = {
  [types.SET_IS_LOADING] (state, loadingState) {
    state.loading = loadingState
  },
  [types.SET_INTRO_SKIPPED] (state, introState) {
    state.introSkipped = introState
  },
  [types.SET_PAGE] (state, page) {
    state.page = page
  },
  [types.SET_IS_MENU_OPEN] (state, menuState) {
    state.menuOpen = menuState
  }
}

export default {
  state,
  getters,
  mutations
}
