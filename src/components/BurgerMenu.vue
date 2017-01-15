<template>
  <div id="burger-menu">
    <transition>
      <div class="menu-toggle" v-on:click="toggleMenu()">
        <div class="menu-work-indicator"><span class="current">{{ getCurrentWork + 1 }}</span> /{{ getWorkCount }}</div>
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
        projectsDatas: projectsData.projects
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentWork',
        'getWorkCount'
      ])
    },
    mounted () {
      console.log('App mounted')
    },
    beforeMount () {
      // this.$store.commit('SET_IS_LOADING', true)
      this.$store.commit('SET_WORK_COUNT', this.projectsDatas.length)
    },
    methods: {
      toggleMenu: function (e) {
        console.log(e)
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
      left: 60px
      top: 50%
      transform: translateY(-50%)
      color: $white
      z-index: 10

      .menu-work-indicator
        font-size: 26px

        .current
          font-size: 75px
  
  .work-BG
    position: absolute
    width: 74%
    height: 670px
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
    background-size: cover
    background-position: center center
    z-index: 1

</style>
