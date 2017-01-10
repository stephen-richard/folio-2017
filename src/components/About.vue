<template>
  <div class="about">
    <h1>{{ msg }}</h1>
    
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'About page'
    }
  },
  methods: {
    beforeMount () {
      console.log('before mount About')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
