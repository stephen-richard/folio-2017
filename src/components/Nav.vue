<template>
	<div class="nav">
		<router-link to="/" class="nav-link">Projects</router-link>
		<router-link to="/about" class="nav-link">About</router-link>
	</div>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        msg: 'Nav'
      }
    }
  }
</script>

<style lang="sass" scoped>
	
  .nav
    position: absolute
    top: 0
    right: 60px
    padding: 40px 0

    .nav-link
      padding: 0 5px
      color: #fff
      text-decoration: none
      text-transform: lowercase

      &:hover 
        text-decoration: underline

      &.router-link-active
        text-decoration: underline
        


</style>