<template>
  <transition v-on:enter="onEnter">
    <div class="page page-about" ref="aboutPage">

      <span class="about-cover"></span>

      <div class="left">
        <h1>{{ name }}</h1>
        <h2>Front-end developer at <a href="http://www.hetic.net/" target="_blank">HETIC</a></h2>
        <div class="paragraph">
          <p>I’m a 23 y/o freelance front-end developer living in Paris. Currently in 4th year in the webschool HETIC.<br/>I build interactive web sites with good old friends Javascript and Php. I’m also fluent with Wordpress, Sass, Gulp and currently learning Ruby React and mobile native development.</p>
        </div>
      </div>

      <div class="right">
        <h3>By the way i’m looking for a 6 month internship abroad starting july 2017. feel free to <a href="mailto:stephen.richard44@gmail.com">contact me.</a></h3>

        <div class="socials">
          <a href="https://github.com/stephenrichard/" class="social-link" target="_blank"><img src="../assets/images/github.svg" alt=""></a>
          <a href="https://twitter.com/stephen_Rchd" class="social-link" target="_blank"><img src="../assets/images/twitter.svg" alt=""></a>
          <a href="http://codepen.io/stephenrichard/" class="social-link" target="_blank"><img src="../assets/images/codepen.svg" alt=""></a>
          <a href="https://www.linkedin.com/in/stephen-richard-7aa88160" class="social-link" target="_blank"><img src="../assets/images/linkedin.svg" alt=""></a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { TweenMax, Power1 } from 'gsap'
  export default {
    name: 'about',
    data () {
      return {
        name: 'Stephen Richard'
      }
    },
    beforeMount () {
      console.log('before mount About')
    },
    methods: {
      onEnter (e) {
        TweenMax.set(this.$refs.aboutPage, { opacity: 0 })
        TweenMax.to(this.$refs.aboutPage, 0.7, { opacity: 1, ease: Power1.easeOut })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import '../stylesheets/common/_vars'
  
  .page-about
    position: absolute
    width: 75%
    height: 72%
    max-height: 670px
    top: 50%
    left: 50%
    transform: translateX(-50%) translateY(-50%)
    padding: 5% 20px 25px 4%
    text-align: left
    color: $white
    text-decoration: none
    overflow: hidden
    background-image: url(../assets/images/about-bg.png)
    background-position: center center
    background-size: cover
    z-index: 2

    h1
      font-size: 60px
      margin-bottom: 10px

    h2
      font-size: 25px

    h3
      font-size: 26px
      line-height: 38px

    p
      line-height: 23px

    .paragraph
      margin-top: 30px

    .left,
    .right
      height: 100%

    .left
      float: left
      width: 50%

    .right
      display: flex
      flex-direction: column
      justify-content: flex-end
      float: right
      width: 48%

      .socials
        display: flex
        justify-content: flex-end
        margin-top: 50px
        a
          display: inline-block
          margin-right: 50px

          &:last-child
            margin-right: 10px


    
</style>
