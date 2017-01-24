<template>
  <transition
    v-on:enter="enter">
    <div id="intro" ref="intro">
      <div class="logo" ref="logoIntro"></div>
      <!-- <img src="../assets/images/logo-2x.png" alt="Stephen richard front-end developer"> -->

      <div class="intro-site-opener">
        <div class="intro-circles" ref="introCircles">
          <div class="target-circle" ref="targetCircle">
            <span class="target-confirmed" ref="targetConfirmed"></span>
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
          <div class="top-circle" ref="topCircle">
            <span class="circle circle-main"></span>
            <span class="circle circle-blink"></span>
          </div>
        </div>
        <div class="intro-desc" ref="introDesc">
          <p>Drag and drop to enter website</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { TweenLite, Power4, TimelineLite, Draggable, SteppedEase } from 'gsap'
  import bodyMovin from 'bodymovin'
  import dataAnimation from '../assets/data-animation-logo.json'

  export default {
    name: 'intro',
    beforeMount () {
    },
    mounted () {
      var that = this
      var overlapThreshold = '70%'
      var dropArea = this.$refs.targetCircle

      Draggable.create(this.$refs.topCircle, {
        type: 'x',
        bounds: that.$refs.introCircles,
        edgeResistance: 1,
        dragResistance: 0.2,
        lockAxis: true,
        onDrag: function (e) {
          if (this.hitTest(dropArea, overlapThreshold)) {
            if (!this.target.classList.contains('dropped')) {
              this.target.className += ' dropped'
            }
          } else {
            this.target.className = 'top-circle'
          }
        },
        onDragEnd: function (e) {
          if (!this.target.classList.contains('dropped')) {
            TweenLite.to(this.target, 1, {
              x: -10,
              ease: Power4.easeOut
            })

            that.$refs.targetCircle.className = 'target-circle'
          } else {
            that.$refs.targetCircle.className += ' dropped'

            var tl = new TimelineLite()
            tl.set(that.$refs.targetConfirmed, {width: 10, height: 10, opacity: 0})
              .to(that.$refs.targetConfirmed, 0.4, {width: 80, height: 80, opacity: 0.7})
              .to(that.$refs.targetConfirmed, 0.5, {
                width: 100,
                height: 100,
                opacity: 0,
                ease: Power4.easeOut,
                onComplete: function () {
                  that.$store.commit('SET_INTRO_SKIPPED', true)
                }
              })
          }
        }
      })

      // GSAP ANIMATIONS
      var timelineIntro = new TimelineLite()
      timelineIntro
        // .to(this.$refs.logoIntro, 3, {
        //   repeat: 0,
        //   backgroundPosition: '-22880px',
        //   ease: SteppedEase.config(104) })
        .add(function () {
          bodyMovin.loadAnimation({
            container: that.$refs.logoIntro, // the dom element
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: dataAnimation // the animation data
          })
          bodyMovin.setSpeed(1.2)
        })
        .add('endLogo', 3.2)
        // .add(function () { that.$store.commit('BACKGROUND_VIDEO_STATE', true) })
        .to(this.$refs.introCircles, 0.6, { y: 0, opacity: 1 }, 'endLogo')
        .to(this.$refs.introDesc, 0.4, { y: 0, opacity: 1, delay: 0.4 }, 'endLogo')
    },
    methods: {
      // Entering
      enter: function (el, done) {
        console.log('i entered')
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
      // background-image: url('../assets/images/anim-logo.png')
      background-position: left center
      // animation: playAnimation 3s steps($steps) 1s forwards

      img
        width: 50%
        height: auto 
    
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
        padding: 10px 10px 8px 0px
        box-sizing: initial
        border-radius: 50%
        z-index: 4
        
        .circle
          position: absolute
          width: 21px
          height: 21px
          left: 0
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

        .dot
          display: inline-block
          vertical-align: middle
          background-color: $grey-intro
          width: calc((160px / 15) - 4px)
          height: 1px
          border-radius: 10px
          outline: none

      .target-circle
        position: relative
        display: block
        width: 34px
        height: 34px
        border-radius: 50%
        border: 1px dashed $white

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
