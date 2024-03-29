'use strict'

function createRectangleNode (x, y, size) {
  return {
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size * 2,
        height: size
      }
    },
    contains: p => {
      return (x + size - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
          
    drawButton: (canvas) => {

	  //const canvas = document.getElementById('toolbar')
	 	    
	  const ctx = canvas.getContext('2d')
	  ctx.beginPath()
	  ctx.rect(5 , 10 , 30, 15, Math.PI*2,true)
	  ctx.stroke()

	  
      },
      draw: () => {
        const canvas = document.getElementById('graphpanel')
        const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
        ctx.beginPath()
        ctx.rect(x, y, size * 2, size, Math.PI*2, true)
        ctx.fillStyle = "white"
        ctx.fillRect(x + 1, y + 1, (size * 2) - 1, size - 1, Math.PI*2,false)
        ctx.font = '24px serif'
        ctx.fillStyle = 'black'
        ctx.fillText("Test", x + size / 2, y + size / 1.5)
        ctx.stroke()
      }
    }
  }
