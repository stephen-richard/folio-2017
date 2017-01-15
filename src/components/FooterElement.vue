<template>
	<div class="footer">
  <a class="address" :href="'mailto:' + email">{{ email }}</a>
	</div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {
        email: 'stephen.richard44@gmail.com'
      }
    }
  }
</script>

<style lang="sass" scoped>
	
  .footer
    position: absolute
    bottom: 0
    right: 60px
    padding: 40px 0
    z-index: 4

</style>