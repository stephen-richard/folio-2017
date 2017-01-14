/* SOON A WORKING SLIDER HERE */
/* BY Stephen RICHARD */
/* 😊 */

(function (global) {
  function Slider (element) {
    this.el = element
    this.currentItemIndex = 0

    console.log('init slider with the element')
    console.log(this.el)

    this.bind()

    var S = Slider.prototype

    S.bind = function () {
      console.log('Bind elements here')
    }

    S.goNext = function () {
      this.goTo(this.currentItemIndex + 1)
    }

    S.goPrev = function () {
      this.goTo(this.currentItemIndex - 1)
    }

    S.goTo = function (index) {
      console.log('Soon i\'ll go somewhere')
    }
  }

  module.exports = Slider
}(this))

