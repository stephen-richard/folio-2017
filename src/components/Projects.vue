<template>
	<div class="projects">
      <ul class="projects-container" ref="projectsContainer" v-bind:style="styleContainer">
        <project-home
          v-for="(project, index) in projectsDatas" 
          v-bind:currentWorkIndex="currentWorkIndex"
          v-bind:dataWork="index">
        </project-home> 
      </ul>
      <div class="work-BG" :style="{ 'background-image': 'url(../static/'+ projectsDatas[currentWorkIndex].media_home +')' }"></div>

      <div class="controls">
        <div class="left controls__item" v-on:click="goPrev()"></div>
        <div class="right controls__item" v-on:click="goNext()"></div>
      </div>
  </div>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import ProjectHomeLink from '../components/ProjectHomeLink'
  import { TweenMax, Power4 } from 'gsap'

  export default {
    name: 'projects-slider',
    components: {
      'project-home': ProjectHomeLink
    },
    data () {
      return {
        projectsDatas: projectsData.projects,
        projectsCount: projectsData.projects.length,
        currentWorkIndex: 0,
        sliderPosition: 0,
        screenWidth: 0,
        projectWidth: window.innerWidth / 2
      }
    },
    mounted () {
      this.sliderPosition = (window.innerWidth / 4)
      this.screenWidth = window.innerWidth
    },
    watch: {
      sliderPosition: function (newPosition) {
        this.sliderPosition = newPosition
      },
      currentWorkIndex: function (newIndex) {
        this.currentWorkIndex = newIndex
      }
    },
    computed: {
      styleContainer: function () {
        return {
          transform: TweenMax.to('.projects-container', 1, { x: this.sliderPosition, y: 0, z: 0, ease: Power4.easeOut })
        }
      }
    },
    methods: {
      goNext () {
        this.goTo(this.currentWorkIndex + 1)
      },
      goPrev () {
        this.goTo(this.currentWorkIndex - 1)
      },
      goTo (index) {
        console.log('Go to project: ' + index)

        this.newIndex = 0
        if (index >= 0) {
          this.newIndex = index
        }

        if (index > this.currentWorkIndex) {
          if (index < this.projectsCount) {
            this.sliderPosition = this.sliderPosition - this.projectWidth
          } else {
            this.sliderPosition = (window.innerWidth / 4)
            this.newIndex = 0
          }
        }

        if (index < this.currentWorkIndex) {
          if (index > 0) {
            this.sliderPosition = this.sliderPosition + this.projectWidth
          }
        }

        this.currentWorkIndex = this.newIndex
        console.log(this.sliderPosition)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/vars'

  .projects-container
    position: absolute
    display: flex
    align-items: center
    top: 0
    left: 0
    bottom: 0
    overflow: hidden
    white-space: nowrap
    z-index: 2

  .work-BG
    position: absolute
    width: 74%
    height: 670px
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
    background-size: cover
    background-position: center center
    z-index: 1

    &:before
      position: absolute
      content: ''
      left: 0
      top: 0
      width: 100%
      height: 100%
      background-color: rgba($black, .3)
      z-index: 2

  .controls
    
    &__item
      position: absolute
      top: 50%
      transform: translateY(-50%)
      width: 100px
      height: 100px  
      background-color: red
      z-index: 4

      &.left
        left: 0

      &.right
        right: 0

</style>