import * as types from '../mutations-types'

const state = {
  loading: false,
  placeholder: false,
  placeholderFullSize: false,
  introSkipped: false,
  page: '',
  menuOpen: false,
  videoIntroPlay: false,
  indicatorsHidden: true,
  mobile: false,
  projects: {}
}

const getters = {
  isLoading: state => {
    return state.loading
  },
  isPlaceholder: state => {
    return state.placeholder
  },
  isPlaceholderFullSize: state => {
    return state.placeholderFullSize
  },
  isIntroSkipped: state => {
    return state.introSkipped
  },
  getPage: state => {
    return state.page
  },
  isMenuOpen: state => {
    return state.menuOpen
  },
  shouldPlay: state => {
    return state.videoIntroPlay
  },
  isIndicatorHidden: state => {
    return state.indicatorsHidden
  },
  isMobile: state => {
    return state.mobile
  },
  getProjects: state => {
    return state.projects
  }
}

const mutations = {
  [types.SET_IS_LOADING] (state, loadingState) {
    state.loading = loadingState
  },
  [types.SET_PLACEHOLDER] (state, placeholderState) {
    state.placeholder = placeholderState
  },
  [types.SET_PLACEHOLDER_SIZE] (state, placeholderSizeState) {
    state.placeholderFullSize = placeholderSizeState
  },
  [types.SET_INTRO_SKIPPED] (state, introState) {
    state.introSkipped = introState
  },
  [types.SET_PAGE] (state, page) {
    state.page = page
  },
  [types.SET_IS_MENU_OPEN] (state, menuState) {
    state.menuOpen = menuState
  },
  [types.BACKGROUND_VIDEO_STATE] (state, videoState) {
    state.videoIntroPlay = videoState
  },
  [types.CHANGE_INDICATORS_STATE] (state, indicatorState) {
    state.indicatorsHidden = indicatorState
  },
  [types.SET_MOBILE_STATE] (state, mobileState) {
    state.mobile = mobileState
  },
  [types.SAVE_PROJECTS] (state, projectsState) {
    state.projects = projectsState
  }
}

export default {
  state,
  getters,
  mutations
}
