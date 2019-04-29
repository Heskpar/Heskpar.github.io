'use strict'
function createCircleNode (x, y, size, color) {
  return {
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size,
        height: size
      }
    },
    contains: p => {
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    //drawButton: (canvas) => {
      //const ctx = canvas.getContext('2d')
      //ctx.beginPath()
      //ctx.arc(
    draw: () => {
      // const container = document.getElementById('nodeContainer')
      // const table = document.createElement('table')
      // const tr = document.createElement('tr')
      // const td = document.createElement('td')
      // table.appendChild(tr)
      // tr.appendChild(td)
      // table.style.position = 'absolute'
      // table.style.left = x + 'px'
      // table.style.top = y + 'px'
      // table.style.width = size + 'px'
      // table.style.height = size + 'px'
      // table.style.background = color
      // container.appendChild(table)
      const panel = document.getElementById('graphpanel')
      const ctx = panel.getContext('2d')
      ctx.beginPath()
      ctx.arc(x+size/2, y + size / 2, size / 2, 0, Math.PI*2, true)
      ctx.fillStyle = color
      ctx.fill()
    }
  }
}
