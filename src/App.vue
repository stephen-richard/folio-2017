<template>
  <div id="app">
    <!-- <bgCanvas></bgCanvas> -->
    <burgerMenu v-if="isIntroSkipped"></burgerMenu>
    <navbar v-if="isIntroSkipped"></navbar>
    <intro v-if="!isIntroSkipped"></intro>
    <router-view v-if="isIntroSkipped"></router-view>
    <footerElement></footer>

    <loader v-bind:isLoading="isLoading"></loader>
  </div>
</template>

<script>
  import NavBar from './components/Nav'
  import BGCanvas from './components/BGCanvas'
  import Loader from './components/Loader'
  import Intro from './components/Intro'
  import BurgerMenu from './components/BurgerMenu'
  import Footer from './components/FooterElement'

  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapGetters([
        'isLoading',
        'isIntroSkipped'
      ])
    },
    components: {
      Intro,
      burgerMenu: BurgerMenu,
      navbar: NavBar,
      Loader,
      bgCanvas: BGCanvas,
      footerElement: Footer
    },
    mounted () {
      console.log('App mounted')
    },
    beforeMount () {
      // this.$store.commit('SET_IS_LOADING', true)
    }
  }
</script>

<style lang="sass">
  @import './stylesheets/main'
  
  body
    width: 100%
    overflow-x: scroll
    margin: 0
  
  #app 
    width: 100%
    height: 100%
    // font-family: 'antonregular', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    background-color: $bg-color

  .container
    max-width: 1280px
    margin: 0 auto

  a
    text-decoration: none
    color: $white

</style>
