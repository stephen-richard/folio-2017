<template>
  <div id="app">
    <!-- <bgCanvas></bgCanvas> -->
    
    <burgerMenu v-if="isIntroSkipped"></burgerMenu>
    <navbar v-if="isIntroSkipped"></navbar>
    <intro v-if="!isIntroSkipped"></intro>
    <router-view v-if="isIntroSkipped"></router-view>
    <footerElement v-if="isIntroSkipped" v-show="getPage != 'detail'"></footerElement>

    <div class="video-intro-mask" ref="videoMask"></div>
    <video v-show="getPage != 'detail'" id="video-bg" autoplay loop>
      <source src="./static/video/background.mp4" type="video/mp4">
      <source src="./static/video/background.webm" type="video/webm">
    </video>

    <loader v-bind:isLoading="isLoading"></loader>
    
    <mobile></mobile>
  </div>
</template>

<script>
  import NavBar from './components/Nav'
  import BGCanvas from './components/BGCanvas'
  import Loader from './components/Loader'
  import Intro from './components/Intro'
  import BurgerMenu from './components/BurgerMenu'
  import Footer from './components/FooterElement'
  import Mobile from './components/MobileVersion'
  import { TweenMax } from 'gsap'

  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        'mobileBreakpoint': 700
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentWork',
        'getWorkCount',
        'isLoading',
        'isIntroSkipped',
        'getPage',
        'shouldPlay',
        'isMobile'
      ])
    },
    components: {
      Intro,
      burgerMenu: BurgerMenu,
      navbar: NavBar,
      Loader,
      bgCanvas: BGCanvas,
      footerElement: Footer,
      Mobile
    },
    mounted () {
      var that = this
      // Handle arrow navigation
      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 37) {
          that.goPrev()
        }

        if (e.keyCode === 39) {
          that.goNext()
        }
      }, false)

      // GSAP ANIMATIONS
      if (!this.isMobile) {
        console.log('remove mask opacity')
        TweenMax.set(this.$refs.videoMask, { opacity: 1 })
        TweenMax.to(this.$refs.videoMask, 3, { opacity: 0, zIndex: 1, delay: 1 })
      }
    },
    methods: {
      goNext () {
        this.goTo('next')
      },
      goPrev () {
        this.goTo('prev')
      },
      goTo (direction) {
        // If menu is open close it
        if (this.isMenuOpen) {
          this.$store.commit('SET_IS_MENU_OPEN', false)
        }

        // NEXT
        if (direction === 'next') {
          if (this.getCurrentWork + 1 < this.getWorkCount) {
            // Switch next project if it's not the last one
            this.$store.commit('CHANGE_CURRENT_WORK', this.getCurrentWork + 1)
          } else {
            // If it's the last project reset to the first one
            this.$store.commit('CHANGE_CURRENT_WORK', 0)
          }
        }

        // PREV
        if (direction === 'prev') {
          if (this.getCurrentWork - 1 >= 0) {
            // Switch to left previous work
            this.$store.commit('CHANGE_CURRENT_WORK', this.getCurrentWork - 1)
          }
        }

        console.log('Switched to work: ' + this.getCurrentWork)
      }
    }
  }
</script>

<style lang="sass">
  @import './stylesheets/main'
  
  *
    box-sizing: border-box
  body
    width: 100%
    overflow-x: scroll
    margin: 0
  
  #app 
    width: 100%
    height: 100%
    font-family: 'plantagenet', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    background-color: $bg-color

  .page
    @media (max-width: 768px)
      display: none

  .video-intro-mask
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: $bg-color
    z-index: 2

  #video-bg
    position: fixed
    top: 50%
    left: 50%
    min-width: 100%
    min-height: 100%
    width: auto
    height: auto
    transform: translateX(-50%) translateY(-50%)
    background-image: url("./assets/images/background-poster.png")
    background-size: cover
    background-repeat: no-repeat
    // background-position: center center
    z-index: 1

  .container
    max-width: 1280px
    margin: 0 auto

  a
    text-decoration: none
    color: $white
    line-height: 21px

    &.link
      position: relative
      overflow: hidden
      color: transparent
      
      &:hover,
      &.router-link-active

        &:before
          animation: slideAndFade .5s .1s
        
        span
          animation: linkSlideEffect .6s
      
      &:before
        position: absolute
        content: ''
        left: 0
        top: 0
        width: 100%
        height: 100%
        transform: translateX(calc(-100% - 1px))
        opacity: 0.7
        background-color: $white

      span
        position: absolute
        display: inline-block
        left: 0px
        color: $white
        // transition: transform .3s ease
  
  .underline
    text-decoration: underline


  @keyframes linkSlideEffect
    0%
      transform: translateY(0)
    49%
      transform: translateY(120%)
    50%
      transform: translateY(-120%)
    100%
      transform: translateY(0)

  @keyframes slideAndFade
    0%
      transform: translateX(calc(-100% - 1px))
    100%
      transform: translateX(101%)

</style>
