<template>
	<div class="projects">
    
    <prev-work v-if="hasPrevWork" ref="dragPrevWork"></prev-work>

    <router-link 
      class="current-work" 
      :to="{ name: 'project', params: { project_name: projectsDatas[getCurrentWork].slug } }"
      ref="workDropZone">

      <div class="current-work__bg" :style="{ 'background-image': 'url(../static/'+ projectsDatas[getCurrentWork].media_home +')' }"></div>

      <div class="current-work__datas">
        <h1 :style="{ 'color': projectsDatas[getCurrentWork].color }">{{ projectsDatas[getCurrentWork].name }}</h1>
        <p class="link">Discover</p>
      </div>
    </router-link>

    <next-work v-if="hasNextWork" ref="dragNextWork"></next-work>

  </div>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import PrevWork from '../components/PrevWork'
  import NextWork from '../components/NextWork'
  import { TweenMax, Power4 } from 'gsap'
  import Draggable from '../../node_modules/gsap/src/minified/utils/Draggable.min.js'

  import { mapGetters } from 'vuex'

  export default {
    name: 'projects-slider',
    components: {
      PrevWork,
      NextWork
    },
    data () {
      return {
        projectsDatas: projectsData.projects,
        sliderPosition: 0,
        screenWidth: 0,
        projectWidth: window.innerWidth / 2
      }
    },
    mounted () {
      var that = this

      this.sliderPosition = (window.innerWidth / 4)
      this.screenWidth = window.innerWidth

      // Handle arrow navigation
      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 37) {
          that.goPrev()
        }

        if (e.keyCode === 39) {
          that.goNext()
        }
      }, false)

      // Make next/prev indicators daraggable
      // Draggable.create(this.$refs.dragNextWork, {
      //   type: 'x',
      //   bound: that.$refs.workDropZone,
      //   edgeResistance: 1,
      //   dragResistance: 0.2,
      //   onDrag: function (e) {
      //     console.log('Hey look at me im moving :D')
      //   },
      //   onDragEnd: function (e) {
      //   }
      // })
    },
    detroy () {
      console.log('destroyed')
    },
    watch: {
      sliderPosition: function (newPosition) {
        this.sliderPosition = newPosition
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentWork',
        'getWorkCount',
        'hasPrevWork',
        'hasNextWork',
        'isMenuOpen'
      ])
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
    text-align: center
    z-index: 2

  .current-work
    position: absolute
    width: 74%
    height: 70%
    max-height: 670px
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
    text-decoration: none
    overflow: hidden
    z-index: 1

    &:hover
      
      .current-work__bg
        transform: scale(1.1)

      .link

        &:before
          transform: translateX(-10px)

        &:after
          transform: translateX(10px)

    &__bg
      width: 100%
      height: 100%
      background-size: cover
      background-position: center center
      transition: transform .7s cubic-bezier(0.86, 0, 0.07, 1)

      &:before
        position: absolute
        content: ''
        left: 0
        top: 0
        width: 100%
        height: 100%
        background-color: rgba($black, 0.1)
        z-index: 2

    &__datas
      position: relative
      margin-top: -180px
      color: $white
      z-index: 3

      h1
        font-size: 55px
        font-family: 'mohavebold'

      .link
        position: relative
        display: inline-block
        margin-top: 10px
        font-size: 18px
        text-decoration: none
        color: $white

        &:before,
        &:after
          position: absolute
          content: ''
          top: 9px 
          width: 120px
          height: 1px
          border-radius: 10px
          background-color: $white
          transition: transform .3s ease
        
        &:before
          left: -130px

        &:after
          left: 80px

</style>