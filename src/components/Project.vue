<template>
  <transition v-on:enter="onEnter">
    <div class="project container" ref="workContainer">
      <span class="project__main-picture" ref="workMainPicture" :style="{'background-image': 'url(./static/' + projectsDatas[getCurrentWork].media_home + ')'}"></span>
      
      <div class="project__datas">
        <h1 ref="workName" :style="{ 'color': projectsDatas[getCurrentWork].color }">{{ projectsDatas[getCurrentWork].name }}</h1>
        <h2 ref="workRole">{{ projectsDatas[getCurrentWork].role }}</h2>

        <div class="project-data-container">
          <div>
            <p class="title">Description</p>
            <p>{{ projectsDatas[getCurrentWork].description }}</p>
          </div>

          <div>
            <p class="title">Client / context</p>
            <p>{{ projectsDatas[getCurrentWork].context }}</p>

            <p class="title">Year</p>
            <p>{{ projectsDatas[getCurrentWork].year }}</p>

            <p class="title">Techno / tools</p>
            <p>{{ projectsDatas[getCurrentWork].techno }}</p>

            <p class="title">Link</p>
            <a :href="projectsDatas[getCurrentWork].url" target="_blank">See the project</a>
          </div>
        </div>
        
      </div>

      <div class="medias">
        <div :class="'picture picture-first ' + projectsDatas[getCurrentWork].first_media[1]" :style="{ 'background-color': projectsDatas[getCurrentWork].color }">
          <img :src="'../static/' + projectsDatas[getCurrentWork].first_media[0]" alt="">
        </div>
        <div v-for="(picture, index) in projectsDatas[getCurrentWork].medias" class="picture">
          <img :src="'../static/' + picture" alt="">
        </div>
      </div>

      <project-switcher v-if="hasNextWork"></project-switcher>
    </div>
  </transition>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import ProjectSwitcher from '../components/ProjectSwitcher'

  import { TweenMax, TimelineLite, Power1 } from 'gsap'

  import { mapGetters } from 'vuex'

  export default {
    name: 'project',
    data () {
      return {
        msg: 'Projects page',
        param: this.$route.params.project_name,
        projectsDatas: projectsData.projects
      }
    },
    computed: {
      ...mapGetters([
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

      // document.removeEventListener('keyup', function (e) {})
    },
    beforeMount () {
      var pageFound = false
      var counter = 0

      for (var i = 0; i < this.projectsDatas.length; i++) {
        if (this.projectsDatas[i].slug === this.param) {
          pageFound = true
        }
      }

      if (!pageFound) {
        this.$router.push('/')
      }
    },
    beforeDestroy () {
      this.$store.commit('SET_PAGE', 'home')
    },
    methods: {
      onEnter (e) {
        TweenMax.set(this.$refs.workContainer, { y: 100, opacity: 0 })
        TweenMax.to(this.$refs.workContainer, 1, { y: 0, opacity: 1, ease: Power1.easeOut })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import '../stylesheets/common/vars'

  .project
    position: relative
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

    &__main-picture
      position: relative
      display: block
      width: 100%
      height: 600px
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
        margin-top: 80px
        text-align: left
        overflow: hidden

        div:first-child
          float: left
          width: 75%
          padding-right: 20px

          .title
            margin-bottom: 10px

        div:last-child
          float: right
          width: 25%

          .title
            margin-top: 10px

            &:first-child
              margin-top: 0

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
