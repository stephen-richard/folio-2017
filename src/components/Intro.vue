<template>
  <transition
    v-on:enter="enter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave">
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
        <div class="intro-desc">
          <p>Drag and drop to enter website</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { TweenMax, Power4, TimelineLite, Draggable } from 'gsap'
  import bodyMovin from 'bodymovin'

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
            TweenMax.to(this.target, 1, {
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

      var animationData = '{"assets":[{"id":"image_0","w":110,"h":105,"u":"../static/","p":"img_0.png"}],"layers":[{"ddd":0,"ind":0,"ty":2,"nm":"Logo_StephenRichard.ai","cl":"ai","refId":"image_0","ks":{"o":{"k":100},"r":{"k":0},"p":{"k":[110,105,0]},"a":{"k":[55,52.5,0]},"s":{"k":[200,200,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"n","pt":{"k":{"i":[[0,0],[-3.54,-4.72],[-9.542,12.957],[0.125,0],[13.119,6.186],[-3,4],[-11.828,-1.224],[0.125,-2.875]],"o":[[0,0],[2.625,3.5],[12.293,-11.878],[-0.125,0],[-15.375,-7.25],[3,-4],[10.875,1.125],[-0.125,2.875]],"v":[[22.445,61.625],[24.224,81.029],[52.841,82.346],[55.603,60.207],[38.195,46.5],[27.695,26.375],[47.445,18.875],[59.072,28.439]],"c":false}},"o":{"k":100},"x":{"k":0},"nm":"Masque 1"},{"inv":false,"mode":"n","pt":{"k":{"i":[[0.842,0],[-13.195,-1.404],[2.246,-8.984],[5.896,-1.123],[0,0],[-3.088,-11.511],[-5.896,0.281],[0.281,3.088]],"o":[[-0.842,0],[13.195,1.404],[-2.246,8.984],[-0.281,5.053],[0,0],[3.088,11.511],[5.896,-0.281],[-0.281,-3.088]],"v":[[59.799,30.04],[69.906,33.971],[85.909,50.535],[70.749,58.957],[67.38,65.414],[81.136,79.452],[91.524,97.139],[100.789,89.84]],"c":false}},"o":{"k":100},"x":{"k":0},"nm":"Masque 2"}],"ef":[{"ty":22,"nm":"Trait","mn":"ADBE Stroke","ix":1,"ef":[{"ty":3,"nm":"Chemin","mn":"ADBE Stroke-0001","ix":1,"v":{"k":2}},{"ty":7,"nm":"Tous les masques","mn":"ADBE Stroke-0010","ix":2,"v":{"k":1}},{"ty":7,"nm":"Contour séquentiel","mn":"ADBE Stroke-0011","ix":3,"v":{"k":1}},{"ty":2,"nm":"Couleur","mn":"ADBE Stroke-0002","ix":4,"v":{"k":[0.91,0,0,1]}},{"ty":0,"nm":"Epaisseur","mn":"ADBE Stroke-0003","ix":5,"v":{"k":16.1}},{"ty":0,"nm":"Dureté","mn":"ADBE Stroke-0004","ix":6,"v":{"k":0.75}},{"ty":0,"nm":"Opacité","mn":"ADBE Stroke-0005","ix":7,"v":{"k":1}},{"ty":0,"nm":"Début","mn":"ADBE Stroke-0008","ix":8,"v":{"k":0}},{"ty":0,"nm":"Fin","mn":"ADBE Stroke-0009","ix":9,"v":{"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":0,"s":[0],"e":[100]},{"t":96}]}},{"ty":7,"nm":"Espacement","mn":"ADBE Stroke-0006","ix":10,"v":{"k":15}},{"ty":7,"nm":"Style de peinture","mn":"ADBE Stroke-0007","ix":11,"v":{"k":3}}]}],"ip":0,"op":1007,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":2,"nm":"Logo_StephenRichard.ai","cl":"ai","refId":"image_0","ks":{"o":{"k":15},"r":{"k":0},"p":{"k":[110,105,0]},"a":{"k":[55,52.5,0]},"s":{"k":[200,200,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"n","pt":{"k":{"i":[[0,0],[-3.54,-4.72],[-9.542,12.957],[0.125,0],[13.119,6.186],[-3,4],[-11.828,-1.224],[0.125,-2.875]],"o":[[0,0],[2.625,3.5],[12.293,-11.878],[-0.125,0],[-15.375,-7.25],[3,-4],[10.875,1.125],[-0.125,2.875]],"v":[[22.445,61.625],[24.224,81.029],[52.841,82.346],[55.603,60.207],[38.195,46.5],[27.695,26.375],[47.445,18.875],[59.072,28.439]],"c":false}},"o":{"k":100},"x":{"k":0},"nm":"Masque 1"},{"inv":false,"mode":"n","pt":{"k":{"i":[[0.842,0],[-13.195,-1.404],[2.246,-8.984],[5.896,-1.123],[0,0],[-3.088,-11.511],[-5.896,0.281],[0.281,3.088]],"o":[[-0.842,0],[13.195,1.404],[-2.246,8.984],[-0.281,5.053],[0,0],[3.088,11.511],[5.896,-0.281],[-0.281,-3.088]],"v":[[59.799,30.04],[69.906,33.971],[85.909,50.535],[70.749,58.957],[67.38,65.414],[81.136,79.452],[91.524,97.139],[100.789,89.84]],"c":false}},"o":{"k":100},"x":{"k":0},"nm":"Masque 2"}],"ip":0,"op":1007,"st":0,"bm":0,"sr":1}],"v":"4.5.2","ddd":0,"ip":0,"op":105,"fr":30,"w":220,"h":210}'

      var animationLogo = bodyMovin.loadAnimation({
        container: this.$refs.logoIntro,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        prerender: false,
        animationData: JSON.parse(animationData)
      })

      animationLogo.play()
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
<style lang="sass">
  @import '../stylesheets/common/vars'

  #intro
    position: absolute
    width: 100%
    height: 100%
    z-index: 2

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
        padding: 10px 10px 8px 0px
        box-sizing: initial
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
