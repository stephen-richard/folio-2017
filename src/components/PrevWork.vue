<template>
    <transition>
      <div :class="classObject">
        <div class="next-prev-work__image" ref="prevWork">
          <div class="switcher-container" ref="switcherContainer">
            <span v-for="project in getProjects" class="current" :style="{ 'background-image': 'url(../static/'+ project.media_home +')' }"></span>
          </div>
        </div>
        <p v-if="hasPrevWork" class="next-prev-work__name">{{ getProjects[getPrevWork].name }}</p>
      </div>
    </transition>
</template>

<script>
  import { TweenLite, Power2, Draggable } from 'gsap'
  import { mapGetters } from 'vuex'

  export default {
    name: 'prev-work',
    computed: {
      classObject: function () {
        return {
          'next-prev-work': true,
          'prev-work': true,
          'hidden': this.isIndicatorHidden || !this.hasPrevWork
        }
      },
      ...mapGetters([
        'getProjects',
        'getPrevWork',
        'isMenuOpen',
        'hasPrevWork',
        'isIndicatorHidden'
      ])
    },
    mounted () {
      var that = this
      var overlapThreshold = '90%'
      var dropArea = this.$parent.$refs.workDropZone.$el
      var itemDrop = this.$refs.prevWork

      // Set container width depends on children count
      this.$refs.switcherContainer.style.width = 315 * this.getProjects.length + 'px'
      TweenLite.set(this.$refs.switcherContainer, { x: -(315 * that.getPrevWork) })

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
          TweenLite.to(this.target, 0.7, {
            x: 0,
            y: 0,
            ease: Power2.easeOut
          })
        }
      })
    },
    updated () {
      var that = this
      TweenLite.to(this.$refs.switcherContainer, 0.4, {
        x: -(315 * that.getPrevWork),
        ease: Power2.easeOut
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
    background-color: $bg-color
    transition: transform .7s ease
    z-index: 5

    &.prev-work
      left: -15px

      &.hidden
        transform: translateX(-100%)

      .next-prev-work__name
        margin-left: 25px

    &.next-work
      right: -15px

      &.hidden
        transform: translateX(100%)

    &:hover
      .next-prev-work__image
        &:before
          background-color: rgba($bg-color, 0)

    .switcher-container 
      position: absolute
      transform: translateX(0)
      height: 100%
    
    &__image
      position: relative
      height: 85px
      width: 315px
      white-space: nowrap
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
        z-index: 4
        background-color: rgba($bg-color, .3)
        transition: background .7s ease

      span
        // position: absolute
        display: inline-block
        // float: left
        width: 315px
        height: 100%
        background-size: cover
        transition: filter .3s ease
        z-index: 2

        &.current
          z-index: 1

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