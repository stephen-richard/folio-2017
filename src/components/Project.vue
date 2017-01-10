<template>
  <transition name="fade" v-on:enter="onEnter">
    <div class="project">
    <h1>{{ currentProject.name }}</h1>
    <a :href="currentProject.url" target="_blank">Voir le projet</a>
    <div>
      <span>Year : {{ currentProject.year }}</span>
      <p>{{ currentProject.description }}</p>
    </div>
    <div>
      <p>{{ currentProject.context }}</p>
      <p>rôle: {{ currentProject.role }}</p>
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

      console.log(this.project_id)
      if (!pageFound) {
        this.$router.push('/')
      }
    },
    methods: {
      onEnter (e) {
        var title = e.querySelector('h1')
        TweenMax.to(title, 2, {
          scale: 2
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  .medias 
    .picture
      width: 50%
      float: left

      img 
        width: 100%
        height: auto
</style>
