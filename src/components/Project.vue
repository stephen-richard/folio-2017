<template>
  <transition name="fade" v-on:enter="onEnter">
    <div class="project container">
      <span class="project__main-picture" :style="{'background-image': 'url(./static/' + currentProject.media_home + ')'}"></span>
      
      <div class="project__datas">
        <h1 ref="title">{{ currentProject.name }}</h1>
        <h2>{{ currentProject.role }}</h2>

        <div class="project-data-container">
          <div>
            <p class="title">Description</p>
            <p>{{ currentProject.description }}</p>
          </div>

          <div>
            <p class="title">Client / context</p>
            <p>{{ currentProject.context }}</p>

            <p class="title">Year</p>
            <p>{{ currentProject.year }}</p>

            <p class="title">Techno / tools</p>
            <p>{{ currentProject.techno }}</p>

            <p class="title">Link</p>
            <a :href="currentProject.url" target="_blank">See the project</a>
          </div>
        </div>
        
      </div>

      <div class="medias">
        <div v-for="picture in currentProject.medias" class="picture">
          <img :src="'../static/' + picture" alt="">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import TweenMax from 'gsap'

  export default {
    name: 'project',
    data () {
      return {
        msg: 'Projects page',
        param: this.$route.params.project_name,
        project_id: null,
        currentProject: {},
        projectsDatas: projectsData.projects
      }
    },
    mounted () {
      this.$store.commit('SET_PAGE', 'detail')
    },
    beforeMount () {
      var pageFound = false
      var counter = 0

      for (var i = 0; i < this.projectsDatas.length; i++) {
        if (this.projectsDatas[i].slug === this.param) {
          pageFound = true
          this.project_id = i
          this.currentProject = this.projectsDatas[i]
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
        // TweenMax.to(this.$refs.title, 2, {
        //   scale: 2
        // })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import '../stylesheets/common/vars'

  .project
    width: 74%
    padding-top: 115px
    padding-bottom: 100px
    color: white

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
      display: block
      width: 100%
      height: 600px
      background-size: cover

    &__datas
      display: block
      margin-top: 60px

      h1
        font-size: 45px
        font-family: 'mohavebold'

      h2
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

      &:first-child
        width: 100%
        margin-bottom: 60px
        padding: 40px
        background-color: red

      &:nth-child(even)
        margin-right: 12px

      img 
        width: 100%
        height: auto
</style>
