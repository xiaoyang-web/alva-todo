(function (window, document) {
  function resize() {
    var ww = window.innerWidth
    if (ww > 750) {
      ww = 750
    }
    document.documentElement.style.fontSize = ww * 100 / 750 + 'px'
    document.body.style.height = `${window.innerHeight}px`
  }
  resize()
  window.addEventListener('resize', resize)
})(window, document)