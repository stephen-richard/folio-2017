<template>
  <transition>
    <div class="page page-home">
      <projects></projects>
      <!-- <div id="pixiContainer"></div> -->
    </div>
  </transition>
</template>

<script>
  import ProjectSlider from '../components/Projects'
  import { TweenLite } from 'gsap'

  export default {
    name: 'home',
    data () {
      return {
        renderer: null,
        stage: null,
        currentWorkIndex: 0
      }
    },
    components: {
      projects: ProjectSlider
    },
    methods: {
      renderPixi () {
        this.renderer.render(this.stage)

        // var mousePosX = this.renderer.plugins.interaction.mouse.global.x
        // var mousePosY = this.renderer.plugins.interaction.mouse.global.y

        // console.log('Mouse is ' + mousePosX + ' : ' + mousePosY)
        // window.requestAnimationFrame(this.renderPixi)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

  @import '../stylesheets/common/_vars'

  .page-home
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    overflow: hidden
    background-color: $bg-color

  #pixiContainer
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    
</style>
