'use strict'

function createRectangleNode (x, y, size) {
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
      drawButton: (canvas) => {

	  

	  // const canvas = document.getElementById('toolbar')
	 	    
	  const ctx = canvas.getContext('2d')
	  ctx.beginPath()
	  ctx.rect(5 , 10 , 30, 15, Math.PI*2, true)
	  ctx.stroke()

	  
      },
      draw: () => {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
      ctx.beginPath()
      ctx.rect(x, y, size, size, Math.PI*2, true)
      ctx.stroke()
    }
  }
}
