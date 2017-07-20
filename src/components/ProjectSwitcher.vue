<template>
	<div class="project-switcher">
		<div class="intro-site-opener">
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
		    </div>
        <div class="target-circle" ref="targetCircle">
          <span class="target-confirmed" ref="targetConfirmed"></span>
        </div>
		  </div>
		  <div class="intro-desc">
		    <p>Next</p>
        <span :style="{ 'color': projectsDatas[getCurrentWork + 1].color }">{{ projectsDatas[getCurrentWork + 1].name }}</span>
		  </div>
		</div>
	</div>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import { mapGetters } from 'vuex'
  import { TweenLite, TimelineLite, Power4, Draggable } from 'gsap'

  export default {
    name: 'project-switcher',
    data () {
      return {
        projectsDatas: projectsData.projects
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentWork'
      ])
    },
    mounted () {
      var that = this
      var overlapThreshold = '70%'
      var dropArea = this.$refs.targetCircle

      Draggable.create(this.$refs.topCircle, {
        type: 'x',
        bounds: that.$refs.introCircles,
        edgeResistance: 0.95,
        dragResistance: 0.2,
        lockAxis: true,
        cursor: 'drag',
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
                  that.$store.commit('CHANGE_CURRENT_WORK', that.getCurrentWork + 1)
                  TweenLite.to(that.$refs.topCircle, 1, {
                    x: 0,
                    ease: Power4.easeOut
                  })
                }
              })
          }
        }
      })
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/vars'

  .project-switcher
    position: relative
    display: block
    padding-top: 100px
    text-align: center

    .intro-site-opener
      position: relative
      transform: none
      left: auto
      bottom: 0

      .intro-circles
        margin: 0 auto
        width: 225px
        opacity: 1
        transform: none

        .top-circle
          padding-right: 0px

          .circle
            left: 5px

      .intro-desc
        margin-top: 10px
        opacity: 1
        transform: none

        span
          display: inline-block
          margin-top: 10px
          font-family: $moha
          font-size: 32px

</style>