<template>
  <div id="app">
    <!-- <bgCanvas></bgCanvas> -->
    <navbar v-if="isIntroSkipped"></navbar>
    <intro v-if="!isIntroSkipped"></intro>
    <router-view v-if="isIntroSkipped"></router-view>
    <loader v-bind:isLoading="isLoading"></loader>
  </div>
</template>

<script>
  import NavBar from './components/Nav'
  import BGCanvas from './components/BGCanvas'
  import Loader from './components/Loader'
  import Intro from './components/Intro'

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
      navbar: NavBar,
      Loader,
      bgCanvas: BGCanvas
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
    height: 100vh
    overflow-x: scroll
    background: $bg-color
    margin: 0
  
  #app 
    font-family: 'antonregular', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: $bg-color

  .container
    max-width: 1280px
    margin: 0 auto

</style>
