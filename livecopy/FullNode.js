'use strict'

function createFullNode (x, y, size) {
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
	  ctx.rect(5 , 6, 30, 15, Math.PI*2, true)
          ctx.rect(5, 21, 30, 7, Math.PI*2, true)
          ctx.rect(5, 28, 30, 7, Math.PI*2, true)
	  ctx.stroke()

	  
      },
      draw: () => {
        const canvas = document.getElementById('graphpanel')
        const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
        ctx.beginPath()
        ctx.rect(x, y, size * 2, size, Math.PI*2, true)
        ctx.rect(x, y + size, size * 2, size / 2, Math.PI*2, true)
        ctx.rect(x, y + (size * 1.5), size * 2, size / 2, Math.PI*2, true)
        ctx.fillStyle = "white"
        ctx.fillRect(x + 1, y + 1, (size * 2) - 1, size - 1, Math.PI*2, true)
        ctx.fillRect(x + 1, (y + size) + 1, (size * 2) - 1, (size / 2) - 1, Math.PI*2, true)
        ctx.fillRect(x + 1, (y + size * 1.5) + 1, (size * 2) - 1, (size / 2) - 1, Math.PI*2, true)
        ctx.font = '24px serif'
        ctx.fillStyle = 'black'
        ctx.fillText("Test", x + size / 2, y + size / 1.5)
        ctx.font = '12px serif'
        ctx.fillText("attribute", x + size / 2, y + (size * 1.3))
        ctx.fillText("method", x + size / 2, y + (size * 1.8))
        ctx.stroke()
      }
    }
  }
