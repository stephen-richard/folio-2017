<template>
	<transition
    v-on:enter="onEnter">
    <div class="nav">
       <div class="hidden"></div>
       <router-link to="/" class="logo"><img src="../assets/images/logo-home-2x.png" alt="stephen richard portfolio 2017"></router-link>
       <div class="nav-links">
         <router-link to="/about" class="nav-link link">About</router-link>
       </div>
    </div> 
  </transition>
</template>

<script>
  import { TweenLite, Power2 } from 'gsap'
  export default {
    name: 'navbar',
    data () {
      return {
        msg: 'Nav'
      }
    },
    methods: {
      onEnter: function (el, done) {
        TweenLite.to(el, 0.7, { y: 0, ease: Power2.easeInOut, delay: 0.4 })
        done()
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/vars'
	
  .nav
    position: absolute
    display: flex
    align-items: center
    justify-content: space-between
    top: 0
    left: 60px
    right: 60px
    padding: 40px 0
    text-align: center
    transform: translateY(-100%)
    z-index: 4

    .logo
      display: inline-block
      margin-right: -45px
      text-align: center
      
      img
        width: 50%
        height: auto
    
    .nav-links

      .nav-link
        display: inline-block
        padding: 0 5px
        text-decoration: none
        text-transform: lowercase
        color: #fefefe

        &:hover,
        &.router-link-active
          color: $bg-color
    

</style>