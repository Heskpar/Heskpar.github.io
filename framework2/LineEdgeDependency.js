'use strict'

function createLineEdgeDependecy() {
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
  
      setStyleOfLine:(l) => {
        styleOfLine = l
      },
      draw: () => {
        const canvas = document.getElementById('graphpanel')
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        const startBounds = start.getBounds() 
        const endBounds = end.getBounds() 
        // const p = center(startBounds) // Just pick the center of the bounds for now
        // const q = center(endBounds) // Not the "connection points" that graphed2 uses
        startPoint = s.getConnectionPoint(startBounds)
        endPoint = e.getConnectionPont(endBounds)
        startPoint = s.getConnectionPoint(endPoint)
        endPoint = e.getConnectionPoint(startPoint)
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        if(styleOfLine === 1)
        {
            ctx.setLineDash([5,15])
        }
        ctx.stroke()
      },
      drawTool: () =>{
        const canvas = document.getElementById('graphpanel')
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        startPoint = s.getBounds()
        endPoint = e.getBounds()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        if(styleOfLine === 1)
        {
            ctx.setLineDash([5,15])
        }
        ctx.stroke()
        },
    drawDragged: (s,e) =>{
        const canvas = document.getElementById('graphpanel')
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        startPoint = s.getBounds()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        if(styleOfLine === 1)
        {
            ctx.setLineDash([5,15])
        }
        ctx.stroke()
        },
        clone: () =>
        {
            return createLineEdgeDependecy()
        }
    }
}
//   let start = undefined
//   let end = undefined
//   return {
//     getType()
//     {
//         return 'EDGE'
//     },
//     getConnection()
//     {
//         const p = end.getConnection(center(start.getBounds())) //Retrives the center of 2 nodes to connect
//         const q = start.getConnecitonPoint(center(enter.getBounds()))
//         return {
//            x1: p.x,
//            y1: p.y,
//            x2: q.x,
//            y2: q.y 
//         }
//     },
//     contains(validPoint)
//     {
//         const centerPoints = this.getConnection()
//         const edgeLength = Math.sqrt(Math.pow(centerPoints.x1 - centerPoints.x2, 2) + Math.pow(centerPoints.y1 - centerPoints.y2, 2))
//         const area = Math.abs((centerPointss.x1 - centerPoints.x2) * (centerPoints.y1 - validPoint.y) - (validPoint.x - centerPoints.x1) * (centerPoints.y2 - validPoint.y)) / 2    
//         return (area * 2 / edgeLength) < 2
//     },
    
//     getBounds(){
//         const temp = this.getConnectionPoints()
//         return {
//           x: Math.min(temp.x1, temp.x2),
//           y: Math.min(temp.y1, temp.y2),
//           width: Math.abs(temp.x1 - temp.x2),
//           height: Math.abs(temp.y1 - temp.y2) }
//       },

//     connect: (s, e) => {
//       start = s  
//       end = e
//     },
//     draw: () => {
//       const canvas = document.getElementById('graphpanel')
//       const ctx = canvas.getContext('2d')
//       ctx.beginPath()
//       ctx.setLineDash([5,15])
//     //   const startBounds = start.getBounds() 
//     //   const endBounds = end.getBounds() 
//       const p = end.getConnection(center(start.getBounds())) // Just pick the center of the bounds for now
//       const q = start.getConnection(center(end.getBounds())) // Not the "connection points" that graphed2 uses
//       ctx.moveTo(p.x, p.y)
//       ctx.lineTo(q.x, q.y)
//       ctx.stroke()
//     }
//   }
// }