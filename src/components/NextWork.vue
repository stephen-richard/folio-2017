<template>
    <div :class="classObject">
      <div class="next-prev-work__image">
        <span class="current" :style="{ 'background-image': 'url(../static/'+ projectDatas[getNextWork].media_home +')' }"></span>
      </div>
      <p class="next-prev-work__name">{{ projectDatas[getNextWork].name }}</p>
    </div>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import { mapGetters } from 'vuex'

  export default {
    name: 'next-work',
    data () {
      return {
        projectDatas: projectsData.projects
      }
    },
    mounted () {
    },
    computed: {
      classObject: function () {
        return {
          'next-prev-work': true,
          'next-work': true,
          'hidden': this.isMenuOpen
        }
      },
      ...mapGetters([
        'getNextWork',
        'isMenuOpen'
      ])
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/vars'
</style>