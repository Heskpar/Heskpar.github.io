'use strict'

function drawGrabber(x, y) {
  const size = 5;
  const panel = document.getElementById('graphpanel')
  const ctx = panel.getContext('2d')
  ctx.beginPath()
  ctx.rect(x - size / 2, y - size / 2 , size, size, Math.PI*2, true)
  ctx.fillStyle = 'black'
  ctx.fill()
}

function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

class Graph {
  constructor() {
    this.nodes = []
    this.edges = []
  }
  add(n) {
    this.nodes.push(n)
  }
  findNode(p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }

  connect(e, p1, p2) {
    const n1 = this.findNode(p1)
    const n2 = this.findNode(p2)
    if (n1 !== undefined && n2 !== undefined) {
      e.connect(n1, n2)
      this.edges.push(e)
      return true
    }
    return false
  }
  draw() {
    for (const n of this.nodes) {
      n.draw()
    }
    for (const e of this.edges) {
      e.draw()
    }

  }
}
  document.addEventListener('DOMContentLoaded', function () {
    const graph = new Graph()
    const toolbar = new ToolBar()
    //const n1 = createCircleNode(10, 10, 20, 'goldenrod')
    //const n2 = createCircleNode(30, 30, 20, 'blue')
    const n3 = createRectangleNode(50, 30, 50, 10)
    const n4 = createRectangleNode(200,100, 50, 10);
    const n5 = createNoteNode(50, 150, 45, 10)

    toolbar.addNode(createRectangleNode,graph)
    toolbar.addNode(createNoteNode,graph)
    toolbar.addNode(createFullNode,graph)

    const n6 = createFullNode(200, 200, 50, 10)
    
    //toolbar.addNode(createNoteNode,graph)

    //graph.add(n1)
    //graph.add(n2)
    graph.add(n3)
    graph.add(n4)
    graph.add(n5)
    graph.add(n6)
    const e = createLineEdge()
    graph.connect(e, { x: 60, y: 40 }, { x: 220, y: 120 })
    graph.draw()
    

    //Testing edge arrows
    const n7 = createRectangleNode(50, 30, 50, 10)
    const n8 = createRectangleNode(200,100, 50, 10)
    graph.add(n7)
    graph.add(n8)
    const e2 = createLineEdgeDependecy()
    graph.add(e2)
    // graph.connect(e2, { x: 60, y: 40 }, { x: 220, y: 120 })
    graph.draw()
    const e3 = LineEdgeInheritance()
    graph.add(e3)
    graph.draw()





    const panel = document.getElementById('graphpanel')
    let selected = undefined
    let dragStartPoint = undefined
    let dragStartBounds = undefined
  
    // function repaint(mousePoint) {
    //   const canvas = document.getElementById('graphpanel')
    //   const ctx = canvas.getContext('2d')
    //   ctx.clearRect(0, 0, canvas.width, canvas.height)
    //   panel.innerHTML = ''
    //   if (selected !== undefined) {
    //     const bounds = selected.getBounds()
    //     drawGrabber(bounds.x, bounds.y)
    //     drawGrabber(bounds.x + bounds.width, bounds.y)
    //     drawGrabber(bounds.x, bounds.y + bounds.height)
    //     drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    //   }
    //   if (selected === undefined) {
    //     const n4 = new circleNode(mousePoint.x, mousePoint.y, 20, 'blue')
    //     graph.add(n4)
    //   }
    //   graph.draw()
    // }

    function repaint() {
      const ctx = panel.getContext('2d')
      ctx.clearRect(0, 0, panel.width, panel.height)
      panel.innerHTML = ''
      graph.draw()
      if (selected !== undefined) {
        const bounds = selected.getBounds()
        drawGrabber(bounds.x, bounds.y)
        drawGrabber(bounds.x + bounds.width, bounds.y)
        drawGrabber(bounds.x, bounds.y + bounds.height)      
        drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
      }    
    }
    
    function mouseLocation(event) {
      var rect = panel.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }
    
    panel.addEventListener('mousedown', event => {
      let mousePoint = mouseLocation(event)
      selected = graph.findNode(mousePoint)
      if (selected !== undefined) {
        dragStartPoint = mousePoint
        dragStartBounds = selected.getBounds(mousePoint)
      }
      repaint(mousePoint)
    })
  
    panel.addEventListener('mousemove', event => {
      if (dragStartPoint === undefined) return
      let mousePoint = mouseLocation(event)
      if (selected !== undefined) {
        const bounds = selected.getBounds();
        
        selected.translate(
          dragStartBounds.x - bounds.x 
            + mousePoint.x - dragStartPoint.x,
          dragStartBounds.y - bounds.y 
            + mousePoint.y - dragStartPoint.y);
        repaint()
      }
    })
    
    panel.addEventListener('mouseup', event => {
      dragStartPoint = undefined
      dragStartBounds = undefined
    })
})
