<template>
  <transition
    v-on:enter="enter">
    <div id="intro" ref="intro">
      <div :class="{'logo': true, 'loaded': isLoaded}" ref="logoIntro"></div>
      <!-- <img src="../assets/images/logo-2x.png" alt="Stephen richard front-end developer"> -->

      <span 
        :class="{'loading-progress': true, 'loaded': isLoaded}"
        :style="`transform: translateX(${loadingPercentage});`"></span>

      <!-- <div class="intro-site-opener">
        <div class="intro-circles" ref="introCircles">
          <div class="top-circle" ref="topCircle">
            <span class="circle circle-main"></span>
            <span class="circle circle-blink"></span>
          </div>
          <div class="line">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="target-circle" ref="targetCircle">
            <span class="target-confirmed" ref="targetConfirmed"></span>
          </div>
        </div>
        <div class="intro-desc" ref="introDesc">
          <p>Drag and drop to enter website</p>
        </div>
      </div> -->
    </div>
  </transition>
</template>

<script>
  import { TweenLite, Power4, TimelineLite, Draggable, SteppedEase } from 'gsap'
  import assetsLoader from 'assets-loader'
  import bodyMovin from 'bodymovin'
  import dataAnimation from '../assets/data-animation-logo.json'

  export default {
    name: 'intro',
    data () {
      return {
        loader: null,
        anim: null,
        loadingPercentage: 0,
        isAnimComplete: false,
        isLoaded: false
      }
    },
    mounted () {
      var that = this

      this.anim = bodyMovin.loadAnimation({
        container: that.$refs.logoIntro, // the dom element
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: dataAnimation // the animation data
      })
      bodyMovin.setSpeed(1.2)

      this.loader = assetsLoader({
        assets: [
          'static/julien-home.png',
          'static/matthieu-home.png',
          'static/psg-home.jpg',
          'static/sorop-home.jpg',
          'static/edw-home.png',
          'static/skyyart-home.png',
          'static/geek-art-home.png',
          'static/2016-home.png',
          'static/video/background.mp4',
          'static/video/background.webm'
        ]
      })
      .on('error', function (error) {
        console.log(error)
      })
      .on('progress', function (progress) {
        that.loadingPercentage = (progress * 100).toFixed() + '%'
      })
      .on('complete', function (assets) {
        that.isLoaded = true
        setTimeout(() => {
          that.$store.commit('SET_INTRO_SKIPPED', true)
        }, 400)
      })
      .start()
    },
    beforeLeave () {
      this.loader.destroy()
      this.anim.destroy()
    },
    methods: {
      // Entering
      enter: function (el, done) {
        done()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  @import '../stylesheets/common/vars'

  $steps: 104

  #intro
    position: absolute
    width: 100%
    height: 100%
    z-index: 3

    .logo
      position: absolute
      top: 50%
      left: 50%
      transform: translate3d(-50%, -50%, 0)
      width: 220px
      height: 210px
      opacity: 1
      // background-image: url('../assets/images/anim-logo.png')
      background-position: left center
      // animation: playAnimation 3s steps($steps) 1s forwards
      transition: transform .4s ease-out, opacity .4s

      &.loaded
        transform: translate3d(-50%, 0, 0)
        opacity: 0

      img
        width: 50%
        height: auto

  .loading-progress
    position: absolute
    left: -100%
    bottom: 0
    width: 100vw
    height: 6px
    background-color: $white
    transform: translateX(0)
    transition: transform .3s ease

  .intro-site-opener
    position: absolute
    left: 50%
    bottom: 70px
    transform: translateX(-50%)

    .intro-circles
      position: relative
      display: flex
      align-items: center
      justify-content: flex-start
      opacity: 0
      transform: translateY(60px)

      .top-circle
        position: relative
        display: inline-block
        width: 21px
        height: 21px
        padding: 10px 10px 8px 10px
        box-sizing: initial
        border-radius: 50%
        cursor: grab
        z-index: 4

        .circle
          position: absolute
          width: 21px
          height: 21px
          left: 10px
          background-color: $white
          border-radius: 50%
          box-shadow: 0 0 20px 0 rgba($white-grey, 0.51);

          &.circle-main

          &.circle-blink
            background-color: transparent
            box-shadow: none
            border: 1px solid $white
            transform-origin: center center
            opacity: 0
            animation: grow-and-fade 2s cubic-bezier(0.165, 0.84, 0.44, 1) infinite


      .line
        position: relative
        width: 160px
        pointer-events: none
        outline: none
        z-index: 1

        .dot
          display: inline-block
          vertical-align: middle
          background-color: $grey-intro
          width: calc((160px / 15) - 4px)
          height: 1px
          border-radius: 10px
          pointer-events: none
          outline: none

      .target-circle
        position: relative
        display: block
        width: 34px
        height: 34px
        border-radius: 50%
        border: 1px dashed $white
        z-index: 4

        &.dropped
          .target-confirmed
            // animation: grow-and-fade 1.5s ease-in-out

        .target-confirmed
          position: absolute
          left: 50%
          top: 50%
          transform: translate3d(-50%, -50%, 0)
          width: 30px
          height: 30px
          border-radius: 50%
          border: 1px solid rgba($white, .6)
          opacity: 0

    .intro-desc
      position: relative
      margin-top: 20px
      color: $grey-intro
      font-size: 14px
      opacity: 0
      transform: translateY(30px)

  @media (max-width: 768px)
    #intro
      display: none

  @keyframes grow-and-fade
    0%
      transform: scale(1)
    60%
      opacity: 0.2
    100%
      transform: scale(2)
      opacity: 0

  @keyframes playAnimation
    0%
      background-position: 0px
    100%
      background-position: -220px * $steps

</style>
