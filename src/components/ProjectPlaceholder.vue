<template>
	<transition @enter="onEnter">
		<div id="loading-placeholder" :class="placeholderClasses">
			<div class="placeholder-container"></div>
		</div>
	</transition>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'placeholder',
    data () {
      return {
      }
    },
    computed: {
      placeholderClasses: function () {
        return {
          'loading-placeholder': true,
          'visible': this.isPlaceholder,
          'full-size': this.isPlaceholderFullSize
        }
      },
      ...mapGetters([
        'isPlaceholder',
        'isPlaceholderFullSize'
      ])
    },
    methods: {
      onEnter () {
        console.log('enter')
      },
      mounted () {
        console.log('loader hidden because all is loaded')
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/_vars'
	
  #loading-placeholder
    position: absolute
    width: 74%
    height: 70%
    top: 50%
    left: 50%
    transform: translateX(-50%) translateY(-50%)
    background-color: $bg-color
    opacity: 0
    z-index: -1
    transition: all 1s

    &.visible
      opacity: 1
      z-index: 10

    &.full-size
      width: 96%
      height: 94%

</style>