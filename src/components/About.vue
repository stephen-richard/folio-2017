<template>
  <transition v-on:enter="onEnter">
    <div class="page page-about" ref="aboutPage">

      <span class="about-cover"></span>

      <router-link class="go-back-home" to="/">
        <span class="arrow"></span>
      </router-link>

      <div class="left">
        <h1>{{ name }}</h1>
        <h2>Front-end developer / Student <a href="http://www.hetic.net/" target="_blank">HETIC</a></h2>
        <div class="paragraph">
          <p>I’m a 23 y/o freelance front-end developer living in Paris. Currently in 4th year in the webschool HETIC.</p>
          <p>I build interactive websites for school, freelance or just for my pleasure. I compiled the latest ones on this folio. In all those projects I had the chance to use <span class="strong">Wordpress</span>, <span class="strong">Scss</span>, <span class="strong">Gulp</span>, <span class="strong">Rails</span>, <span class="strong">React</span>, <span class="strong">Android</span> and currently learning <span class="strong">VueJs</span></p>
          <p><a href="http://www.old.stephenrichard.fr" class="link underline">Here</a> you can see the latest version of my portfolio</p>
        </div>
        <h3>By the way i’m looking for a <span class="strong">6 month internship abroad</span> starting july 2017. Feel free to <a href="mailto:stephen.richard44@gmail.com" class="link underline">contact me.</a></h3>
      </div>

      <div class="right">

        <div class="socials">
          <a href="https://github.com/stephenrichard/" class="social-link" target="_blank"><svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><title>github</title><path d="M12.857.25c7.098 0 12.857 5.76 12.857 12.857 0 5.675-3.683 10.497-8.79 12.204-.652.12-.886-.283-.886-.618 0-.42.017-1.808.017-3.532 0-1.206-.402-1.976-.87-2.378 2.862-.318 5.875-1.406 5.875-6.345 0-1.406-.502-2.544-1.322-3.448.134-.336.57-1.642-.134-3.416-1.072-.335-3.533 1.322-3.533 1.322-1.02-.284-2.125-.435-3.213-.435s-2.193.152-3.214.436c0 0-2.46-1.657-3.533-1.322-.703 1.774-.267 3.08-.133 3.415-.82.903-1.323 2.04-1.323 3.447 0 4.922 2.997 6.027 5.86 6.345-.37.335-.704.904-.82 1.725-.738.334-2.613.904-3.734-1.072-.703-1.222-1.976-1.322-1.976-1.322-1.255-.017-.083.787-.083.787.838.385 1.424 1.875 1.424 1.875.753 2.293 4.336 1.523 4.336 1.523 0 1.07.016 2.076.016 2.394 0 .335-.234.737-.887.62C3.682 23.603 0 18.78 0 13.106 0 6.01 5.76.25 12.857.25zM4.872 18.715c-.034.067-.134.084-.218.034-.1-.05-.15-.135-.117-.202.033-.05.117-.067.217-.034.1.05.15.134.118.2zm.52.57c-.068.067-.186.033-.27-.05-.083-.1-.1-.218-.033-.27.066-.065.183-.032.267.052.084.1.1.217.034.268zm.5.753c-.066.05-.2 0-.284-.117-.083-.116-.083-.25 0-.3.084-.068.218-.017.285.1.084.117.084.25 0 .318zm.704.703c-.067.085-.218.068-.335-.05-.116-.1-.15-.25-.066-.317.067-.084.218-.067.335.05.1.1.133.25.066.318zm.954.42c-.033.1-.184.15-.318.1-.15-.033-.25-.15-.217-.25.033-.102.184-.152.318-.118.15.05.25.167.217.268zm1.055.083c0 .1-.117.184-.268.184-.167.017-.285-.067-.285-.184 0-.1.118-.184.268-.184.15-.018.285.066.285.183zm.97-.167c.018.1-.083.2-.233.234-.15.034-.285-.033-.302-.134-.017-.117.084-.217.235-.25.15-.018.284.05.3.15z" fill="#E3E3E3" fill-rule="evenodd"/></svg></a>
          <a href="https://twitter.com/stephen_Rchd" class="social-link" target="_blank"><svg width="26" height="27" viewBox="0 0 26 27" xmlns="http://www.w3.org/2000/svg"><title>twitter square</title><path d="M21.43 8.783c-.47.72-1.073 1.34-1.76 1.825.018.15.018.302.018.452 0 4.654-3.55 10.01-10.012 10.01-1.992 0-3.833-.585-5.39-1.572.268.033.552.05.837.05 1.657 0 3.164-.57 4.37-1.507-1.54-.032-2.83-1.053-3.282-2.443.22.034.436.067.654.067.318 0 .552-.05.854-.134-1.608-.318-2.897-1.74-2.897-3.45v-.032c.537.25 1.09.418 1.676.435-.955-.636-1.524-1.707-1.524-2.93 0-.636.184-1.255.486-1.774 1.74 2.142 4.336 3.53 7.265 3.682-.067-.25-.083-.536-.083-.804 0-1.942 1.573-3.515 3.515-3.515 1.005 0 1.925.418 2.562 1.105.803-.15 1.556-.452 2.243-.854-.268.82-.82 1.523-1.557 1.96.72-.102 1.39-.286 2.026-.57zm4.284-3.247c0-2.662-2.16-4.822-4.82-4.822H4.82C2.16.714 0 2.874 0 5.536v16.07c0 2.663 2.16 4.823 4.82 4.823h16.073c2.662 0 4.82-2.16 4.82-4.823V5.537z" fill="#E3E3E3" fill-rule="evenodd"/></svg></a>
          <a href="http://codepen.io/stephenrichard/" class="social-link" target="_blank"><svg width="30" height="31" viewBox="0 0 30 31" xmlns="http://www.w3.org/2000/svg"><title>codepen</title><path d="M3.616 19.856l4.503-3.013 5.59 3.733v6.01l-10.094-6.73zm-1.038-2.41v-4.32l3.23 2.16-3.23 2.16zm13.71 9.14v-6.01l5.593-3.733 4.504 3.013-10.095 6.73zM15 18.333l-4.554-3.047L15 12.24l4.554 3.046L15 18.333zM8.12 13.73l-4.504-3.015 10.095-6.73v6.01L8.12 13.73zm16.07 1.556l3.232-2.16v4.32l-3.23-2.16zm-2.31-1.557l-5.59-3.735v-6.01l10.094 6.73-4.503 3.014zM30 10.714c0-.418-.218-.837-.57-1.07L15.72.502C15.502.37 15.25.286 15 .286s-.502.083-.72.217L.57 9.643c-.352.235-.57.654-.57 1.072v9.14c0 .42.218.838.57 1.072l13.71 9.14c.218.135.47.22.72.22s.502-.085.72-.22l13.71-9.14c.352-.234.57-.652.57-1.07v-9.142z" fill="#E3E3E3" fill-rule="evenodd"/></svg></a>
          <a href="https://www.linkedin.com/in/stephen-richard-7aa88160" class="social-link" target="_blank"><svg width="26" height="27" viewBox="0 0 26 27" xmlns="http://www.w3.org/2000/svg"><title>linkedin square</title><path d="M3.968 22.243V10.625h3.867v11.618H3.968zm4.118-15.2c0 1.104-.837 2.008-2.193 2.008h-.017c-1.306 0-2.143-.903-2.143-2.008 0-1.138.87-2.01 2.193-2.01s2.143.872 2.16 2.01zm9.793 15.2v-6.21c0-1.574-.553-2.63-1.942-2.63-1.072 0-1.708.72-1.993 1.407-.1.25-.117.603-.117.938v6.495H9.96c.05-10.53 0-11.618 0-11.618h3.868v1.69h-.033c.502-.803 1.423-1.958 3.5-1.958 2.543 0 4.452 1.657 4.452 5.223v6.663H17.88zm7.834-16.707c0-2.662-2.16-4.822-4.82-4.822H4.82C2.16.714 0 2.874 0 5.536v16.07c0 2.663 2.16 4.823 4.82 4.823h16.073c2.662 0 4.82-2.16 4.82-4.823V5.537z" fill="#E3E3E3" fill-rule="evenodd"/></svg></a>
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
    mounted () {
      this.$store.commit('SET_PAGE', 'about')
    },
    methods: {
      onEnter (e, done) {
        TweenMax.set(this.$refs.aboutPage, { opacity: 0 })
        TweenMax.to(this.$refs.aboutPage, 1, { opacity: 1, ease: Power1.easeOut })

        done()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import '../stylesheets/common/_vars'
  
  .page-about
    position: relative
    width: 75%
    height: 72vh
    max-height: 670px
    margin: 130px auto 0 auto
    // top: 50%
    // left: 50%
    // transform: translate3d(-50%, -50%, 0)
    padding: 5% 20px 25px 4%
    text-align: left
    color: $white
    text-decoration: none
    // overflow: hidden
    background-image: url(../assets/images/about-bg.png)
    background-position: center center
    background-size: cover
    z-index: 2

    h1
      font-size: 60px
      margin-bottom: 10px

    h2
      font-size: 25px
      color: $white-grey
      a
        color: currentColor

    h3
      font-size: 26px
      line-height: 38px

    p
      line-height: 23px

    .strong
      font-weight: bold

    .paragraph
      margin-top: 30px
      margin-bottom: 40px
      
      p
        margin-bottom: 10px

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
    
    .go-back-home
      position: absolute
      width: 48px
      height: 48px
      top: 50%
      left: -100px

      &:hover

        .arrow
          transform: translateX(-5px)

      .arrow
        position: absolute
        top: 21px
        left: 10px
        transition: transform .3s ease
        
        &:before,
        &:after
          position: absolute
          content: ''
          left: 0
          width: 20px
          height: 2px
          background-color: $white

        &:before
          top: -6px
          transform: rotate(-45deg)

        &:after
          top: 7px
          transform: rotate(45deg)
    
</style>
