<template>
  <canvas id="canvas" v-on:click="createAgent"></canvas>
</template>

<script>
  export default {
    name: 'bgCanvas',
    data () {
      return {
        context: null,
        agentSize: 10
      }
    },
    mounted () {
      this.setupCanvas()
    },
    methods: {
      setupCanvas () {
        var canvas = document.getElementById('canvas')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        this.ctx = canvas.getContext('2d')

        this.ctx.fillStyle = '#EE1100'
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      },
      createAgent (e) {
        const agent = {
          x: 0,
          y: 0
        }

        this.ctx.beginPath()
        this.ctx.arc(e.clientX, e.clientY, Math.random(this.agentSize) * 10, 0, 2 * Math.PI, false)
        this.ctx.fillStyle = 'blue'
        this.ctx.fill()
        this.ctx.closePath()
      }
    }
  }
</script>

<style lang="sass" scoped>
	
  canvas
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0 
    z-index: 2

</style>