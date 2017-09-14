<template>
	<transition 
    v-on:enter="onEnter">
    <div class="footer">
      <div class="hidden"></div>
      <div class="arrows-indicator" v-show="getPage != 'about'">
        <img src="../assets/images/arrow.svg" alt="go previous project with left arrow">
        <img src="../assets/images/arrow.svg" alt="go next project with right arrow">
      </div>
      <a class="address link" :href="'mailto:' + email">{{ email }}<span>{{ email }}</span></a>
    </div> 
  </transition>
</template>

<script>
  import { TweenLite, Power2 } from 'gsap'
  import { mapGetters } from 'vuex'

  export default {
    name: 'footer',
    data () {
      return {
        email: 'stephen.richard44@gmail.com'
      }
    },
    computed: {
      ...mapGetters([
        'getPage'
      ])
    },
    methods: {
      onEnter: function (el, done) {
        TweenLite.to(el, 1, { y: 0, ease: Power2.easeInOut, delay: 1 })
        done()
      }
    }
  }
</script>

<style lang="sass" scoped>
	
  .footer
    position: absolute
    display: flex
    align-items: center
    justify-content: space-between
    bottom: 0
    left: 60px
    right: 60px
    transform: translateY(100%)
    padding: 40px 0
    text-align: right
    z-index: 4

    .arrows-indicator
      position: absolute
      bottom: 30px
      left: 50%
      transform: translateX(-50%)

      @media (max-height: 710px)
        opacity: 0

      img
        width: 26px

        &:nth-child(2)
          -webkit-transform: scaleX(-1) /* Webkit */
            -moz-transform: scaleX(-1)    /* Gecko */
              -o-transform: scaleX(-1)      /* Opera */
                transform: scaleX(-1)         /* Standard */
                filter: FlipH;

  @media (max-width: 768px)
    .footer
      display: none

</style>