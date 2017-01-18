<template>
  <div id="burger-menu">
    <transition>
      <div class="wrapper">
        <div :class="menuClasses" v-on:click="toggleMenu">
          <div class="menu-work-indicator"><span class="current">{{ getCurrentWork + 1 }}</span> /{{ getWorkCount }}</div>
          <div class="menu-work-close"></div>
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
              v-on:click="clickMenuLink"
              :data-index="index">
              <span class="work-id">{{ index + 1 }}</span>
              <router-link :to="{ name: 'project', params: { project_name: projectsDatas[index].slug } }" :data-index="index" :data-color="work.color">{{ work.name }}</router-link>
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
      menuClasses: function () {
        return {
          'menu-toggle': true,
          'open': this.isMenuOpen
        }
      },
      ...mapGetters([
        'getCurrentWork',
        'getWorkCount',
        'isMenuOpen'
      ])
    },
    beforeMount () {
      // this.$store.commit('SET_IS_LOADING', true)
      this.$store.commit('SET_WORK_COUNT', this.projectsDatas.length)
    },
    mounted () {
      var that = this
      window.addEventListener('keyup', function (e) {
        if (e.keyCode === 27) {
          that.closeMenu()
        }
      })
    },
    methods: {
      toggleMenu: function (e) {
        // Set the currentWork already active
        if (this.isMenuOpen) {
          // If menu is open, close it
          this.closeMenu()
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

        if (elem.tagName === 'LI') {
          var links = elem.parentNode.querySelectorAll('li')
          var workId = elem.getAttribute('data-index')
          var workName = elem.querySelector('a')
          var linkColor = workName.getAttribute('data-color')

          // Remove class active from all links
          this.removeAllActive(links)

          // Add active for current hovered link
          elem.classList += ' active'

          this.$refs.workBg.classList += ' changing'
          this.lastHoveredWork = workId
          workName.style.color = linkColor
        }
      },
      hoverLeaveMenuLink: function (e) {
        var workName = e.target.querySelector('a')
        workName.style.color = '#828282'

        this.$refs.workBg.className = 'work-bg'
      },
      removeAllActive: function (links) {
        for (var i = 0; i < links.length; i++) {
          links[i].className = ''
        }
      },
      clickMenuLink: function (e) {
        var link = e.target

        this.$store.commit('CHANGE_CURRENT_WORK', parseInt(link.getAttribute('data-index')))
        this.closeMenu()
      },
      closeMenu: function () {
        this.$store.commit('SET_IS_MENU_OPEN', false)
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
      position: fixed
      left: 30px
      top: 50%
      transform: translateY(-50%)
      color: $white
      padding: 0 10px 10px 10px
      cursor: pointer
      z-index: 10

      &.open

        .menu-work-indicator
          transform: translateX(-120px)
        
        .menu-work-close
          transform: translateX(0)

          &:before
            transform: rotate(45deg)
            // transition-delay: 0s

          &:after
            transform: rotate(-45deg)
            // transition-delay: 0s

      .menu-work-indicator
        font-size: 26px
        transition: transform .3s ease .3s

        .current
          font-size: 75px

      .menu-work-close
        position: absolute
        top: 16px
        left: 20px
        display: block
        width: 40px
        height: 40px
        z-index: 10
        transform: translateX(-100px)
        transition: transform .3s ease .4s

        &:before,
        &:after
          position: absolute
          content: ''
          left: 10px
          top: 28px
          width: 36px
          height: 1px
          background-color: $white
          transition: transform .4s ease .2s
  
  .menu-work-list
    position: fixed
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    // max-height: 670px
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
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
      top: 40px
      left: 40px
      bottom: 40px
      right: 40px
      
      // width: 74%
      
      // max-height: 670px
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
          a
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

        a
          position: relative
          display: inline-block
          font-size: 25px
          font-family: $moha
          color: $title-color

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
            pointer-events: none
          
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
