<template>
    <li 
      v-bind:class="projectClass" 
      :data-work="workIndex"
      ref="projectItem">
      <router-link 
        :to="{ name: 'project', params: { project_name: projectDatas.slug, project_id: workIndex } }" :class="'project project-' + workId">
        <p>{{ projectDatas.name }}</p>
      </router-link>
    </li>
</template>

<script>
  import projectsData from '../assets/datas.json'

  export default {
    name: 'project-link',
    props: ['currentWorkIndex', 'dataWork'],
    data () {
      return {
        projectDatas: projectsData.projects[this.dataWork],
        workIndex: this.currentWorkIndex,
        workId: this.dataWork
      }
    },
    mounted () {
      console.log(this.workIndex)
    },
    watch: {
    },
    computed: {
      projectClass: function () {
        return {
          current: this.workIndex === this.workId,
          'projects-container__item': true
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/vars'

  .projects-container

    &__item
      position: relative
      display: inline-block
      text-align: center
      vertical-align: middle
      width: 49vw
      background-color: grey

      &.current

        .project
          width: 100%
          background-color: blue

  .project 
    position: relative
    display: block
    width: 80%
    margin: 0 auto
    padding: 50px 0
    letter-spacing: 4px
    text-transform: uppercase
    text-decoration: none
    // -webkit-background-clip: text
    // background-clip: text
    // background-position: center center
    // color: transparent
    color: $white
    font-size: 28px
    transition: background .7s ease

    &:hover 
      color: #fefefe;
      -webkit-background-clip: border-box;
      background-clip: border-box;


    &:before
      position: absolute
      content: ''
      left: 0
      top: 0
      width: 100%
      height: 100%
      background-color: rgba($black, .3)
      z-index: 2

</style>