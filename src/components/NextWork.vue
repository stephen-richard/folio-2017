<template>
    <transition>
      <div :class="classObject">
        <div class="next-prev-work__image" ref="nextWork">
          <div class="switcher-container" ref="switcherContainer">
            <span v-for="project in getProjects" class="current" :style="{ 'background-image': 'url(../static/'+ project.media_home +')' }"></span>
          </div>
        </div>
        <p v-if="hasNextWork" class="next-prev-work__name">{{ getProjects[getNextWork].name }}</p>
      </div>
    </transition>
</template>

<script>
  import { TweenLite, Power2, Draggable } from 'gsap'
  import { mapGetters } from 'vuex'

  export default {
    name: 'next-work',
    mounted () {
      var that = this
      var overlapThreshold = '90%'
      var dropArea = this.$parent.$refs.workDropZone.$el
      var itemDrop = this.$refs.nextWork

      // Set container width depends on children count
      this.$refs.switcherContainer.style.width = 315 * this.getProjects.length + 'px'
      TweenLite.set(this.$refs.switcherContainer, { x: -(315 * that.getNextWork) })

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
            that.$store.commit('CHANGE_CURRENT_WORK', that.getNextWork)
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
        x: -(315 * that.getNextWork),
        ease: Power2.easeOut
      })
    },
    computed: {
      classObject: function () {
        return {
          'next-prev-work': true,
          'next-work': true,
          'hidden': this.isIndicatorHidden || !this.hasNextWork
        }
      },
      ...mapGetters([
        'getProjects',
        'getNextWork',
        'hasNextWork',
        'isMenuOpen',
        'isIndicatorHidden'
      ])
    },
    methods: {
      onEnter: function (el) {
        TweenLite.set(el, { x: 100 })
        TweenLite.to(el, 0.7, { x: 0, ease: Power2.easeInOut })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/vars'
</style>