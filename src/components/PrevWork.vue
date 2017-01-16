<template>
    <div class="next-prev-work prev-work">
      <div class="next-prev-work__image">
        <span class="current" :style="{ 'background-image': 'url(../static/'+ projectDatas[getPrevWork].media_home +')' }" ref="prevWork"></span>
      </div>
      <p class="next-prev-work__name">{{ projectDatas[getPrevWork].name }}</p>
    </div>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import { mapGetters } from 'vuex'

  export default {
    name: 'prev-work',
    data () {
      return {
        projectDatas: projectsData.projects
      }
    },
    mounted () {
    },
    updated () {
    },
    computed: {
      ...mapGetters([
        'getPrevWork',
        'getNextWork',
        'isMenuOpen'
      ])
    }
  }
</script>

<style lang="sass">
  @import '../stylesheets/common/vars'

  .next-prev-work
    position: absolute
    top: 50%
    transform: translateY(-50%)
    text-align: left
    z-index: 5

    &.prev-work
      left: -15px

    &:hover
      cursor: move

      .next-prev-work__image
        &:before
          background-color: rgba($bg-color, 0)
    
    &__image
      position: relative
      height: 85px
      width: 315px
      overflow: hidden

      &:before
        position: absolute
        content: ''
        left: 0
        top: 0
        width: 100%
        height: 100%
        background-color: rgba($bg-color, .3)
        transition: background .7s ease

      span
        display: inline-block
        width: 100%
        height: 100%
        background-size: cover
        transition: filter .3s ease

    &__name
      position: absolute
      display: inline-block
      padding-top: 15px
      color: $white
      font-size: 20px

  @keyframes swipe-from-left
    0% 
      transform: translateX(100%)
    100%
      transform: translateX(0)

</style>