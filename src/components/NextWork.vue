<template>
    <transition>
      <div :class="classObject">
        <div class="next-prev-work__image" ref="nextWork">
          <span class="current" :style="{ 'background-image': 'url(../static/'+ projectDatas[getNextWork].media_home +')' }"></span>
        </div>
        <p class="next-prev-work__name">{{ projectDatas[getNextWork].name }}</p>
      </div>
    </transition>
</template>

<script>
  import projectsData from '../assets/datas.json'
  import { TweenMax, Power2, Draggable } from 'gsap'
  import { mapGetters } from 'vuex'

  export default {
    name: 'next-work',
    data () {
      return {
        projectDatas: projectsData.projects
      }
    },
    mounted () {
      var that = this
      var overlapThreshold = '90%'
      var dropArea = this.$parent.$refs.workDropZone.$el
      var itemDrop = this.$refs.nextWork

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
          TweenMax.to(this.target, 0.7, {
            x: 0,
            y: 0,
            ease: Power2.easeOut
          })
        }
      })
    },
    computed: {
      classObject: function () {
        return {
          'next-prev-work': true,
          'next-work': true,
          'hidden': this.isIndicatorHidden
        }
      },
      ...mapGetters([
        'getNextWork',
        'isMenuOpen',
        'isIndicatorHidden'
      ])
    },
    methods: {
      onEnter: function (el) {
        TweenMax.set(el, { x: 100 })
        TweenMax.to(el, 0.7, { x: 0, ease: Power2.easeInOut })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/vars'
</style>