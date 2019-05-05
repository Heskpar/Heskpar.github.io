'use strict'

function createLineDependency() {
  let styleOfLine = undefined
  let startPoint = undefined
  let endPoint = undefined 
  let start = undefined
  let end = undefined
  return {
    connect: (s, e) => {
      start = s
      end = e
    },

    getType:() => {
      return 'EDGE'
    },

    setLineStyle:(l) => {
      styleOfLine = l
    },
    draw: () => {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      const startBounds = start.getBounds() 
      const endBounds = end.getBounds() 
      const p = center(startBounds) // Just pick the center of the bounds for now
      const q = center(endBounds) // Not the "connection points" that graphed2 uses
      const point1 = 
      const point2 = 
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(q.x, q.y)
      ctx.stroke()
    }
  }
}
