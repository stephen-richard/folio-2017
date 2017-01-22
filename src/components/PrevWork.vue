<template>
    <transition>
      <div :class="classObject">
        <div class="next-prev-work__image" ref="prevWork">
          <span class="current" :style="{ 'background-image': 'url(../static/'+ projectDatas[getPrevWork].media_home +')' }" ref="prevWork"></span>
        </div>
        <p class="next-prev-work__name">{{ projectDatas[getPrevWork].name }}</p>
      </div>
    </transition>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import { TweenMax, Power2, Draggable } from 'gsap'
  import { mapGetters } from 'vuex'

  export default {
    name: 'prev-work',
    data () {
      return {
        projectDatas: projectsData.projects
      }
    },
    computed: {
      classObject: function () {
        return {
          'next-prev-work': true,
          'prev-work': true,
          'hidden': this.isIndicatorHidden
        }
      },
      ...mapGetters([
        'getPrevWork',
        'isMenuOpen',
        'isIndicatorHidden'
      ])
    },
    mounted () {
      var that = this
      var overlapThreshold = '90%'
      var dropArea = this.$parent.$refs.workDropZone.$el
      var itemDrop = this.$refs.prevWork

      Draggable.create(itemDrop, {
        onDrag: function (e) {
          if (this.hitTest(dropArea, overlapThreshold)) {
            if (!this.target.classList.contains('dropped')) {
              this.target.className += ' dropped'
              dropArea.className += ' get-dropped'
            }
          } else {
            this.target.className = 'next-prev-work__image'
            dropArea.className = 'current-work'
          }
        },
        onDragEnd: function (e) {
          if (this.target.classList.contains('dropped')) {
            // If user droppped the project on central zone
            // Switch to next project
            that.$store.commit('CHANGE_CURRENT_WORK', that.getPrevWork)
          } else {
            itemDrop.className = 'next-prev-work__image'
          }

          // Whatever happen remove droppped class on image container
          dropArea.className = 'current-work'
          TweenMax.to(this.target, 0.7, {
            x: 0,
            y: 0,
            ease: Power2.easeOut
          })
        }
      })
    }
  }
</script>

<style lang="sass">
  @import '../stylesheets/common/vars'

  .next-prev-work
    position: absolute
    top: 46%
    // transform: translateY(-50%)
    text-align: left
    transition: transform .7s cubic-bezier(0.86, 0, 0.07, 1)
    z-index: 5

    &.prev-work
      left: -15px

      &.hidden
        transform: translateY(-50%) translateX(-100%)

    &.next-work
      right: -15px

      &.hidden
        transform: translateY(-50%) translateX(100%)

    &:hover
      .next-prev-work__image
        &:before
          background-color: rgba($bg-color, 0)
    
    &__image
      position: relative
      height: 85px
      width: 315px
      overflow: hidden

      &:hover
        cursor: move

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
      left: 0
      padding-top: 15px
      color: $white
      font-size: 20px

  @keyframes swipe-from-left
    0% 
      transform: translateX(100%)
    100%
      transform: translateX(0)

</style>