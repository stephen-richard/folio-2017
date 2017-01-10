<template>
  <div id="app">
    <!-- <bgCanvas></bgCanvas> -->
    <navbar></navbar>
    <router-view></router-view>
    <loader v-bind:isLoading="isLoading"></loader>
  </div>
</template>

<script>
  import NavBar from './components/Nav'
  import BGCanvas from './components/BGCanvas'
  import Loader from './components/Loader'

  export default {
    name: 'app',
    data () {
      return {
        isLoading: false
      }
    },
    components: {
      navbar: NavBar,
      Loader,
      bgCanvas: BGCanvas
    },
    mounted () {
      this.isLoading = false
      console.log('App mounted')
    },
    beforeMount () {
      this.isLoading = true
    }
  }
</script>

<style lang="sass">
  /*// http://meyerweb.com/eric/tools/css/reset/
  // v2.0 | 20110126
  // License: none (public domain)*/

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  

  // HTML5 display-role reset for older browsers
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section
    display: block;
  
  body
    line-height: 1;

  ol, ul
    list-style: none;

  blockquote, q
    quotes: none;

  blockquote
    &:before, &:after
      content: "";
      content: none;


  q
    &:before, &:after
      content: "";
      content: none;


  table
    border-collapse: collapse;
    border-spacing: 0;


  @font-face
      font-family: 'antonregular'
      src: url('./assets/fonts/anton-webfont.woff2') format('woff2'), url('./assets/fonts/anton-webfont.woff') format('woff')
      font-weight: normal
      font-style: normal
  
  body
    width: 100%
    height: 100vh
    overflow-x: scroll
    background: #090909
    margin: 0
  
  #app 
    font-family: 'antonregular', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

  .container
    max-width: 1280px
    margin: 0 auto

</style>
