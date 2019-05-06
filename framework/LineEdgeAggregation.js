// 'use strict'

// function createLineEdge() {
//   let start = undefined
//   let end = undefined
//   return {
//     connect: (s, e) => {
//       start = s
//       end = e
//     },
//     draw: () => {
//       const canvas = document.getElementById('graphpanel')
//       const ctx = canvas.getContext('2d')
//       ctx.beginPath()
//       ctx.setLineDash([5, 15]);
//     //   const startBounds = start.getBounds() 
//     //   const endBounds = end.getBounds() 
//     //   const p = center(startBounds) // Just pick the center of the bounds for now
//     //   const q = center(endBounds) // Not the "connection points" that graphed2 uses
//       ctx.moveTo(0, 0)
//       ctx.lineTo(300, 300)
//       ctx.stroke()
//     }
//   }
// }
