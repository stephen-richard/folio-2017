<template>
	<div class="footer">
    <div class="footer-container" v-show="getPage == 'home'">
      <div class="arrows-indicator">
        <img src="../assets/images/arrow.svg" alt="go previous project with left arrow">
        <img src="../assets/images/arrow.svg" alt="go next project with right arrow">
      </div>
      <a class="address link" :href="'mailto:' + email">{{ email }}</a>
    </div>
	</div>
</template>

<script>
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
    }
  }
</script>

<style lang="sass" scoped>
	
  .footer
    position: absolute
    bottom: 0
    left: 50%
    transform: translateX(-50%)
    width: 100%
    max-width: 1280px
    padding: 40px 60px
    text-align: right
    z-index: 4

    .arrows-indicator
      position: absolute
      bottom: 30px
      left: 50%
      transform: translateX(-50%)

      img:nth-child(2)
        -webkit-transform: scaleX(-1) /* Webkit */
          -moz-transform: scaleX(-1)    /* Gecko */
            -o-transform: scaleX(-1)      /* Opera */
              transform: scaleX(-1)         /* Standard */
              filter: FlipH;

</style>