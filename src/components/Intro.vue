<template>
  <transition
    v-on:enter="enter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave">
    <div id="intro" ref="intro">
      <div class="logo"><img src="../assets/images/logo-2x.png" alt="Stephen richard front-end developer"></div>
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
        <div class="intro-desc">
          <p>Drag and drop to enter website</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { TweenMax, Power4, TimelineLite } from 'gsap'
  import Draggable from '../../node_modules/gsap/src/minified/utils/Draggable.min.js'

  export default {
    name: 'intro',
    beforeMount () {
    },
    mounted () {
      var that = this
      var overlapThreshold = '90%'
      var dropArea = this.$refs.targetCircle

      Draggable.create(this.$refs.topCircle, {
        type: 'x',
        bound: that.$refs.introCircles,
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
            TweenMax.to(this.target, 1, {
              x: 0,
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
    },
    methods: {
      // Entering
      enter: function (el, done) {
        console.log('i entered')
        done()
      },
      // Leaving
      beforeLeave: function (el) {
        console.log('care ill leave')
      },
      leave: function (el, done) {
        console.log('im leaving cya folks !')
        done()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import '../stylesheets/common/vars'

  #intro

    .logo
      position: absolute
      top: 50%
      left: 50%
      transform: translate3d(-50%, -50%, 0)

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
        
        .top-circle
          position: relative
          display: inline-block
          width: 21px
          height: 21px
          background-color: $black
          border-radius: 50%
          z-index: 2
          
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
              

        .line
          position: relative
          width: 160px

          .dot
            display: inline-block
            vertical-align: middle
            background-color: $grey-intro
            width: calc((160px / 15) - 4px)
            height: 1px
            border-radius: 10px

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

  @keyframes grow-and-fade
    0%
      width: 30px
      height: 30px
    80% 
      opacity: 1
    100% 
      width: 120px
      height: 120px
      opacity: 0

</style>
