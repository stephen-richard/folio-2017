<template>
	<div id="loader" v-show="isLoading">
		<div class="loader-container">
			<p>Loading...</p>
      Is loading : {{ isLoading }}
		</div>
	</div>
</template>

<script>
  export default {
    name: 'loader',
    props: ['isLoading'],
    data () {
      return {
        loadingStatus: this.isLoading
      }
    },
    methods: {
      beforeMount () {
        console.log('Will load loader')
      },
      mounted () {
        console.log('loader hidden because all is loaded')
      }
    }
  }
</script>

<style lang="sass" scoped>
	
  #loader
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: #2980b9  

    .loader-container
      padding: 20px

      p 
        font-size: 32px

</style>