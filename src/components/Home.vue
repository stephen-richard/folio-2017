<template>
  <div class="home">
      <ul class="projects-container" v-el="projectsContainer">
        <li 
          v-for="(project, index) in projectsDatas" 
          class="projects-container__item" 
          :data-work="index"
          v-el="projectItem">
          <router-link 
            :to="{ name: 'project', params: { project_name: project.slug, project_id: index } }" :class="'project project-' + index" 
            v-bind:style="{ 'background-image': 'url(../static/'+ project.media_home +')'}">
            <p>{{ project.name }}</p>
          </router-link>
        </li>    
      </ul>
    
    <div>{{projectsDatas.projects}}</div>
    <!-- <div id="pixiContainer"></div> -->
  </div>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import 'pixi.js'
  import 'pixi-filters'

  export default {
    name: 'home',
    data () {
      return {
        projectsDatas: projectsData.projects,
        renderer: null,
        stage: null
      }
    },
    mounted () {
      console.log(this.$$.projectsContainer.width)

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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

  @import '../stylesheets/common/_vars'

  .home
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
  
  .container
    display: block
    margin: 0 auto

  .projects-container
    position: absolute
    top: 0
    left: 0
    bottom: 0
    overflow: hidden
    white-space: nowrap

    &__item
      position: relative
      display: inline-block
      text-align: center
      vertical-align: middle
      height: 100%
      width: 49vw

  .project 
    position: relative
    display: block
    font-size: 90px
    margin: 0
    padding: 50px 0
    letter-spacing: 4px
    text-transform: uppercase
    -webkit-background-clip: text
    background-clip: text
    background-position: center center
    color: transparent
    transition: background .7s ease

    &.project-0
      background-image: url(../assets/images/psg-home.jpg)

    &:hover 
      color: #fefefe;
      -webkit-background-clip: border-box;
      background-clip: border-box;

  #pixiContainer
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    
</style>
