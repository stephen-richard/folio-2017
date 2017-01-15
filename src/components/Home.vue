<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"

    v-on:before-leave="beforeLeave"
    v-on:leave="leave">
    <div class="page page-home">
      <projects></projects>
      <!-- <div id="pixiContainer"></div> -->
    </div>
  </transition>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import ProjectSlider from '../components/Projects'
  import 'pixi.js'
  import 'pixi-filters'

  export default {
    name: 'home',
    data () {
      return {
        projectsDatas: projectsData.projects,
        renderer: null,
        stage: null,
        currentWorkIndex: 0
      }
    },
    components: {
      projects: ProjectSlider
    },
    mounted () {
      // console.log('Mounted home, ready to PIXI')
      // var PIXI = window.PIXI
      // console.log(PIXI)
      // this.renderer = PIXI.autoDetectRenderer()
      // this.renderer.view.style.position = 'absolute'
      // this.renderer.view.style.left = 0
      // this.renderer.view.style.width = window.innerWidth + 'px'
      // this.renderer.view.style.height = window.innerHeight + 'px'
      // // Add canvas to the dom container
      // document.getElementById('pixiContainer').appendChild(this.renderer.view)
      // this.stage = new PIXI.Container(0xFFFFFF, true)
      // // Init image texture
      // // @TODO AssetLoader :3
      // var myImage = PIXI.Texture.fromImage('../static/potte.jpg')
      // // My sprite
      // var cat = new window.PIXI.Sprite(myImage)
      // cat.position.x = 0
      // cat.position.y = 0
      // cat.height = this.renderer.height
      // cat.width = this.renderer.width
      // // Add filter TEST 1
      // var myTwistFilter = new PIXI.filters.TwistFilter()
      // myTwistFilter.radius = 1
      // myTwistFilter.angle = 3
      // myTwistFilter.offset.x = 0.55
      // myTwistFilter.offset.y = 0.2
      // // FILTER TEST BLUR WORKING
      // // var myBlurFilter = new PIXI.filters.BlurFilter()
      // // console.log(myBlurFilter)
      // // myBlurFilter.blur = 20
      // // Attach filter to sprite
      // cat.filters = [
      //   myTwistFilter
      // ]
      // this.stage.addChild(cat)
      // this.renderPixi()
    },
    methods: {
      renderPixi () {
        this.renderer.render(this.stage)

        var mousePosX = this.renderer.plugins.interaction.mouse.global.x
        var mousePosY = this.renderer.plugins.interaction.mouse.global.y

        // console.log('Mouse is ' + mousePosX + ' : ' + mousePosY)
        // window.requestAnimationFrame(this.renderPixi)
      },
      // ENTERING
      beforeEnter: function (el) {
      },
      enter: function (el, done) {
        console.log('entered home')
        done()
      },
      afterEnter: function (el) {
      },
      // LEAVING
      beforeLeave: function (el) {
      },
      leave: function (el, done) {
        done()
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
