<template>
  <transition
    v-on:enter="onEnter">
    <div id="burger-menu">
      <div class="wrapper">
        <div :class="menuClasses" v-on:click="toggleMenu" ref="menuToggle">
          <div class="menu-work-indicator"><span class="current">{{ getCurrentWork + 1 }}</span> /{{ getWorkCount }}</div>
          <div class="menu-work-close">
            <img src="../assets/images/line_1.svg" alt="" class="line before">
            <img src="../assets/images/line_1.svg" alt="" class="line">
            <img src="../assets/images/line_1.svg" alt="" class="line after">
          </div>
        </div>

        <div class="menu-work-list" v-show="isMenuOpen" ref="menuPanel">
          <div class="work-bgs">
            <span 
              class="work-bg"
              v-for="(work, index) in getProjects"
              :data-work="index"
              :style="{ 'background-image': 'url(../static/'+ work.media_home +')' }"
              ref="workBg"></span>
          </div>

          <ul>
            <li
              v-for="(work, index) in getProjects"
              v-on:mouseover="hoverMenuLink"
              v-on:mouseleave="hoverLeaveMenuLink"
              v-on:click="clickMenuLink"
              :data-index="index">
              <router-link :to="{ name: 'project', params: { project_name: getProjects[index].slug } }" :data-index="index" :data-color="work.color">
                <span class="work-id">{{ index + 1 }}</span>
                <img src="../assets/images/line.png" alt="" class="line-before"><span class="work-name">{{ work.name }}</span><img src="../assets/images/line.png" class="line-after"/>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { TweenLite, TimelineLite, Power2 } from 'gsap'
  
  import { mapGetters } from 'vuex'

  export default {
    name: 'burgerMenu',
    data () {
      return {
        lastHoveredWork: 0,
        currentWorkBg: null,
        links: document.querySelectorAll('li')
      }
    },
    watch: {
      lastHoveredWork: function (workId) {
        this.lastHoveredWork = workId
      },
      currentWorkBg: function (el) {
        this.lastHoveredWork = el
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
        'getProjects',
        'getCurrentWork',
        'getWorkCount',
        'isMenuOpen',
        'getPage'
      ])
    },
    beforeMount () {
      // this.$store.commit('SET_IS_LOADING', true)
      this.$store.commit('SET_WORK_COUNT', this.getProjects.length)
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
      onEnter: function (el, done) {
        TweenLite.set(this.$refs.menuToggle, { x: -100 })
        TweenLite.to(this.$refs.menuToggle, 0.7, { x: 0, delay: 0.7, ease: Power2.easeInOut })

        done()
      },
      toggleMenu: function (e) {
        // Set the currentWork already active
        if (this.isMenuOpen) {
          // If menu is open, close it
          this.closeMenu()
        } else {
          // If not, open it
          this.$store.commit('SET_IS_MENU_OPEN', true)
          this.$store.commit('CHANGE_INDICATORS_STATE', true)

          TweenLite.to(this.$refs.menuPanel, 0.7, { opacity: 1 })

          // HERE I change the menu background
          // this.lastHoveredWork = this.getCurrentWork
          this.currentWorkBg = document.querySelector('.work-bg[data-work="' + this.getCurrentWork + '"]')
          TweenLite.set(this.currentWorkBg, { opacity: 1 })
          // Reset all previous active links
          this.removeAllActive(document.querySelectorAll('li'))
          // Set the currentWork link as active
          document.querySelectorAll('li')[this.getCurrentWork].classList += ' active'
        }
      },
      hoverMenuLink: function (e) {
        var that = this
        var link = e.target
        var listItem = e.target.parentNode

        if (link.nodeName === 'A') {
          var links = listItem.parentNode.querySelectorAll('li')
          var workId = link.getAttribute('data-index')
          var workName = link.querySelector('.work-name')
          var linkColor = link.getAttribute('data-color')

          // Remove class active from all links
          this.removeAllActive(links)

          // Add active for current hovered link
          listItem.classList += ' active'

          // Handle background smooth switch
          var newBg = document.querySelector('.work-bg[data-work="' + workId + '"]')
          var tl = new TimelineLite()
          tl.set(newBg, { scale: 1.05 })
            .add('enScale')
            .to(newBg, 0.4, { opacity: 1 }, 'enScale')
            .to(newBg, 1, { scale: 1, ease: Power2.easeOut }, 'enScale')
          TweenLite.to(this.currentWorkBg, 0.6, { opacity: 0 })

          this.currentWorkBg = document.querySelector('.work-bg[data-work="' + workId + '"]')
          this.lastHoveredWork = workId

          link.style.color = linkColor
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
        var that = this
        var tl = new TimelineLite()
        tl.to(this.$refs.menuPanel, 0.4, { opacity: 0 })
          .add(function () {
            that.$store.commit('SET_IS_MENU_OPEN', false)
            that.$store.commit('CHANGE_INDICATORS_STATE', false)
          })
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
      padding: 10px 10px 0 10px
      cursor: pointer
      z-index: 10

      &:hover
        .menu-work-close
          .line
            transform: translateX(0)

        .menu-work-indicator
          transform: translateX(-100px)

      &.open

        .menu-work-indicator
          transform: translateX(-120px)
        
        .menu-work-close
          // transform: translateX(0)

          .before
            transform: translateY(10px) rotate(45deg)
            transition-delay: 0s

          .line:nth-child(2)
            transform: translateX(-60px)

          .after
            transform: translateY(-10px) rotate(-45deg)
            transition-delay: 0s

      .menu-work-indicator
        font-size: 26px
        transition: transform .3s ease .3s

        .current
          font-size: 75px

      .menu-work-close
        position: absolute
        top: 16px
        left: 15px
        display: block
        width: 50px
        height: 50px
        z-index: 10
        overflow: hidden

        // @for $i from 1 through 4
        //   .line:nth-child(#{$i})
        //     transition: transform .3s ease .15s * $i

        .line
          position: absolute
          left: -5px
          width: 60px
          // width: 42px
          // height: 2px
          transform: translateX(-80px)
          transform-origin: center center
          transition: transform .3s ease .3s

          &:first-child
            top: -10px

          &:last-child
            top: 10px        

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
    opacity: 0
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

    .work-bgs
      position: absolute
      display: block
      // top: 80px
      // left: 80px
      // bottom: 80px
      // right: 80px
      width: 80%
      height: 70%
      // max-height: 670px
      z-index: 1
      overflow: hidden
      transition: transform ease

      .work-bg
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        background-size: cover
        background-position: center center
        transform: scale(1)
        opacity: 0

      &.changing
        animation: reduce .7s cubic-bezier(0.175, 0.885, 0.32, 1.275)

    ul
      position: relative
      z-index: 3

      li
        display: block
        margin-bottom: 15px
        text-align: center
        cursor: pointer

        &:hover,
        &.active
          a
            .line-before,
            .line-after
              opacity: 1

        .work-id
          display: block
          margin-bottom: 10px
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
          transition: color .3s

          .work-name
            pointer-events: none

          .line-before,
          .line-after
            position: absolute
            width: 120px
            top: 35px
            opacity: 0

          .line-before
            left: -140px

          .line-after
            right: -140px

  @media (max-width: 768px)  
    #burgerMenu
      display: none

  @keyframes reduce
    0%
      opacity: 0.5
      transform: scale(1.05)
    100%
      opacity: 1
      transform: scale(1)

</style>
