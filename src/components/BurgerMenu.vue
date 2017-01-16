<template>
  <div id="burger-menu">
    <transition>
      <div class="wrapper">
        <div class="menu-toggle" v-on:click="toggleMenu">
          <div class="menu-work-indicator"><span class="current">{{ getCurrentWork + 1 }}</span> /{{ getWorkCount }}</div>
        </div>

        <div class="menu-work-list" v-show="isMenuOpen">
          <span 
            class="work-bg" 
            :style="{ 'background-image': 'url(../static/'+ projectsDatas[lastHoveredWork].media_home +')' }"
            ref="workBg"></span>

          <ul>
            <li 
              v-for="(work, index) in projectsDatas"
              v-on:mouseover="hoverMenuLink"
              v-on:mouseleave="hoverLeaveMenuLink"
              :data-index="index">
              <span class="work-id">{{ index + 1 }}</span>
              <h3 :data-color="work.color">{{ work.name }}</h3>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import projectsData from '../assets/datas.json'
  
  import { mapGetters } from 'vuex'

  export default {
    name: 'burgerMenu',
    data () {
      return {
        projectsDatas: projectsData.projects,
        lastHoveredWork: 0,
        links: document.querySelectorAll('li')
      }
    },
    watch: {
      lastHoveredWork: function (workId) {
        this.lastHoveredWork = workId
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentWork',
        'getWorkCount',
        'isMenuOpen'
      ])
    },
    mounted () {
    },
    beforeMount () {
      // this.$store.commit('SET_IS_LOADING', true)
      this.$store.commit('SET_WORK_COUNT', this.projectsDatas.length)
    },
    methods: {
      toggleMenu: function (e) {
        // Set the currentWork already active
        if (this.isMenuOpen) {
          // If menu is open, close it
          this.$store.commit('SET_IS_MENU_OPEN', false)
        } else {
          // If not, open it
          this.$store.commit('SET_IS_MENU_OPEN', true)

          // HERE I change the menu background
          this.lastHoveredWork = this.getCurrentWork
          // Reset all previous active links
          this.removeAllActive(document.querySelectorAll('li'))
          // Set the currentWork link as active
          document.querySelectorAll('li')[this.getCurrentWork].classList += ' active'
        }
      },
      hoverMenuLink: function (e) {
        var that = this
        var elem = e.target
        var links = elem.parentNode.querySelectorAll('li')
        var workId = elem.getAttribute('data-index')
        var workName = elem.querySelector('h3')
        var linkColor = workName.getAttribute('data-color')

        // Remove class active from all links
        this.removeAllActive(links)

        // Add active for current hovered link
        elem.classList += ' active'

        this.$refs.workBg.classList += ' changing'
        this.lastHoveredWork = workId
        workName.style.color = linkColor
      },
      hoverLeaveMenuLink: function (e) {
        var workName = e.target.querySelector('h3')
        workName.style.color = '#828282'

        this.$refs.workBg.className = 'work-bg'
      },
      removeAllActive: function (links) {
        for (var i = 0; i < links.length; i++) {
          links[i].className = ''
        }
      }
    }
  }
</script>

<style lang="sass">
  @import '../stylesheets/common/vars'

  #burger-menu
    // position: absolute
    // z-index: 10

    .menu-toggle
      position: absolute
      left: 40px
      top: 50%
      transform: translateY(-50%)
      color: $white
      padding: 10px
      cursor: pointer
      z-index: 10

      .menu-work-indicator
        font-size: 26px

        .current
          font-size: 75px
  
  .menu-work-list
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    width: 74%
    height: 70%
    max-height: 670px
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
    background-color: $bg-color
    text-decoration: none
    overflow: hidden
    z-index: 5

    &:before
      position: absolute
      content: ''
      left: 0
      top: 0
      width: 100%
      height: 100%
      background-color: rgba($bg-color, .5)
      z-index: 2

    .work-bg
      position: absolute
      display: block
      width: 100%
      height: 100%
      background-size: cover
      background-position: center center
      transform: scale(1)
      z-index: 1
      transition: transform ease

      &.changing
        animation: reduce .7s cubic-bezier(0.175, 0.885, 0.32, 1.275)
        // animation: reduce .7s cubic-bezier(0.6, -0.28, 0.735, 0.045)

    ul
      position: relative
      z-index: 3

      li
        display: block
        margin-bottom: 10px
        text-align: center
        cursor: pointer

        &:hover,
        &.active
          h3
            &:before,
            &:after
              opacity: 1

        .work-id
          display: block
          margin-bottom: 5px
          font-family: $plant
          font-size: 24px
          color: $title-color
          pointer-events: none

        h3
          position: relative
          display: inline-block
          font-size: 25px
          font-family: $moha
          color: $title-color
          pointer-events: none

          &:before,
          &:after
            position: absolute
            content: ''
            top: 13px 
            width: 120px
            height: 1px
            border-radius: 10px
            background-color: $white
            opacity: 0
          
          &:before
            left: -140px

          &:after
            right: -140px

  @keyframes reduce
    0%
      opacity: 0.2
      transform: scale(1.2)
    100%
      opacity: 1
      transform: scale(1)

</style>
