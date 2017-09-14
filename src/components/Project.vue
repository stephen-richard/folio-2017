<template>
  <transition
    @enter="onEnter"
    @leave="onLeave">
    <div class="project container" ref="workContainer">

      <div class="project__placeholder" ref="placeholder"></div>

      <span class="project__main-picture" ref="workMainPicture" :style="{'background-image': 'url(./static/' + getProjects[getCurrentWork].media_home + ')'}"></span>

      <div class="project__datas">
        <h1 ref="workName" :style="{ 'color': getProjects[getCurrentWork].color }">{{ getProjects[getCurrentWork].name }}</h1>
        <h2 ref="workRole">{{ getProjects[getCurrentWork].role }}</h2>

        <div class="project-data-container">
          <div>
            <p class="title">Description</p>
            <p v-html="getProjects[getCurrentWork].description"></p>
          </div>

          <div>
            <p class="title">Client / context</p>
            <p>{{ getProjects[getCurrentWork].context }}</p>

            <p class="title">Year</p>
            <p>{{ getProjects[getCurrentWork].year }}</p>

            <p class="title">Techno / tools</p>
            <p>{{ getProjects[getCurrentWork].techno }}</p>

            <p class="title">Link</p>
            <a :href="getProjects[getCurrentWork].url" target="_blank">See the project</a>
          </div>
        </div>

      </div>

      <div class="medias">
        <div :class="'picture picture-first ' + getProjects[getCurrentWork].first_media[1]" :style="{ 'background-color': getProjects[getCurrentWork].color }">
          <img :src="'../static/' + getProjects[getCurrentWork].first_media[0]" alt="">
        </div>
        <div v-for="(picture, index) in getProjects[getCurrentWork].medias" :key="'project-picture' + index" class="picture picture-single">
          <img :src="'../static/' + picture" alt="">
        </div>
      </div>

      <project-switcher v-if="hasNextWork"></project-switcher>
    </div>
  </transition>
</template>

<script>
  import ProjectSwitcher from '../components/ProjectSwitcher'
  import { TweenLite, TimelineLite, Power2 } from 'gsap'
  import ScrollToPlugin from '../../node_modules/gsap/src/minified/plugins/ScrollToPlugin.min.js'
  import ScrollReveal from 'scrollreveal'

  import { mapGetters } from 'vuex'

  export default {
    name: 'project',
    data () {
      return {
        msg: 'Projects page',
        param: this.$route.params.project_name
      }
    },
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentWork',
        'getWorkCount',
        'hasNextWork'
      ])
    },
    components: {
      ProjectSwitcher
    },
    mounted () {
      this.$store.commit('SET_PAGE', 'detail')

      window.sr = ScrollReveal()
      window.sr.reveal('.project__datas, .project-data-container, .medias, .picture-single, .project-switcher', { duration: 400, delay: 200, reset: true })
    },
    beforeMount () {
      var pageFound = false
      var counter = 0

      for (var i = 0; i < this.getProjects.length; i++) {
        if (this.getProjects[i].slug === this.param) {
          pageFound = true
          this.$store.commit('CHANGE_CURRENT_WORK', i)
        }
      }

      if (!pageFound) {
        this.$router.push('/')
      }
    },
    updated () {
      TweenLite.to(window, 0.7, {scrollTo: 0})
    },
    methods: {
      onEnter (el, done) {
        var tl = new TimelineLite()
        tl.add('reduceAndFade')
        tl.to(this.$refs.placeholder, 1, {
          x: '-50%',
          y: 0,
          width: '75%',
          height: 520,
          left: '50%',
          top: 115,
          delay: 0.4,
          ease: Power2.easeOut
        }, 'reduceAndFade')
        tl.to(this.$refs.placeholder, 0.8, { opacity: 0, delay: 1.2 }, 'reduceAndFade')

        done()
      },
      onLeave (el, done) {
        // var tl = new TimelineLite()
        // tl.to(this.$refs.placeholder, 0.6, { opacity: 1 })
        // tl.add(function () {
        //   done()
        // })
        done()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import '../stylesheets/common/vars'

  .project
    // position: relative
    width: 74%
    padding-top: 115px
    padding-bottom: 100px
    color: white
    z-index: 2

    p
      font-size: 16px
      color: $font-color
      line-height: 27px

    .title
      font-size: 20px
      color: $title-color
      font-family: 'mohavebold'
      text-transform: none

    &__placeholder
      position: absolute
      width: 100%
      height: 100%
      top: 50%
      left: 50%
      transform: translateX(-50%) translateY(-50%)
      z-index: 10
      transform-origin: 50% 50%
      background-color: $bg-color

    &__main-picture
      position: relative
      display: block
      width: 100%
      height: 520px
      background-size: cover
      background-position: center center
      overflow: hidden

    &__datas
      display: block
      margin-top: 60px

      h1
        font-size: 45px
        font-family: 'mohavebold'

      h2
        padding-top: 5px
        font-size: 20px
        color: $title-color

      .project-data-container
        width: 96%
        margin: 0 auto
        margin-top: 120px
        text-align: left
        overflow: hidden

        div:first-child
          float: left
          width: 77%

          .title
            margin-bottom: 10px

        div:last-child
          float: right
          width: 23%
          padding-left: 4%

          .title
            margin-top: 10px

            &:first-child
              margin-top: 0

        @media (max-width: 980px)
          div:first-child
            margin-bottom: 40px

          div:first-child,
          div:last-child
            float: none
            display: block
            width: 100%

  .medias
    display: block
    margin-top: 100px
    overflow: hidden

    .picture
      width: calc(50% - 6px)
      float: left

      &.picture-first
        width: 100%
        margin-bottom: 60px

        &.horizontal
          padding: 60px

        &.vertical
          padding: 60px 60px 0 60px

        img
          margin-bottom: -3px
          box-shadow: 0 2px 35px 0 rgba(0, 0, 0, 0.44)

      &:nth-child(even)
        margin-right: 12px

      img
        width: 100%
        height: auto
</style>
