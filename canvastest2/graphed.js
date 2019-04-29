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
    draw: () => {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
      ctx.beginPath()
      ctx.rect(x, y, size * 2, size, Math.PI*2, true)
      ctx.fillStyle = "#FFFF66"
      ctx.fillRect(x + 1, y + 1, (size * 2) - 1, size - 1, Math.PI*2, true)
      ctx.stroke()
    }
  }
}

class RectangleNode {
  constructor (x, y, size) {
    this.x = x,
    this.y = y,
    this.width = size * 2,
    this.height = size
  }
  contains (p) {
    return (this.x + this.height - p.x) ** 2 + (this.y + this.height / 2 - p.y) ** 2 <= this.height ** 2
  }
  translate (dx, dy) {
    this.x += dx,
    this.y += dy
  }
  draw () {
    const canvas = document.getElementById('graphpanel')
    const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.size * 2, this.size, Math.PI*2, true)
    ctx.fillStyle = "#FFFF66"
    ctx.fillRect(this.x + 1, this.y + 1, (this.size * 2) - 1, this.size - 1, Math.PI*2, true)
    ctx.stroke()
  }
}


function createLineEdge() {
  let start = undefined
  let end = undefined
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: () => {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      const startBounds = start.getBounds() 
      const endBounds = end.getBounds() 
      const p = center(startBounds) // Just pick the center of the bounds for now
      const q = center(endBounds) // Not the "connection points" that graphed2 uses
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(q.x, q.y)
      ctx.stroke()
    }
  }
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
     // RectangleNode.n.draw()
    }
    for (const e of this.edges) {
      e.draw()
    }

  }
}
  document.addEventListener('DOMContentLoaded', function () {
    const graph = new Graph()
    //const n1 = createCircleNode(10, 10, 20, 'goldenrod')
    //const n2 = createCircleNode(30, 30, 20, 'blue')
    const n3 = createRectangleNode(150, 30, 50, 10)
    const n4 = createRectangleNode(20,20, 50, 10);
    const n5 = new RectangleNode(150, 130, 50)
    const n6 = new RectangleNode(20, 120, 50)
    //graph.add(n1)
    //graph.add(n2)
    graph.add(n3)
    graph.add(n4)
    graph.add(n5)
    graph.add(n6)
    const e = createLineEdge()
    graph.connect(e, { x: 40, y: 40 }, { x: 160, y: 60 })
    graph.draw()
    
    const panel = document.getElementById('graphpanel')
    let selected = undefined
    let dragStartPoint = undefined
    let dragStartBounds = undefined
  
    function repaint(mousePoint) {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      panel.innerHTML = ''
      if (selected !== undefined) {
        const bounds = selected.getBounds()
        drawGrabber(bounds.x, bounds.y)
        drawGrabber(bounds.x + bounds.width, bounds.y)
        drawGrabber(bounds.x, bounds.y + bounds.height)
        drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
      }
      if (selected === undefined) {
        const n5 = new createRectangleNode(mousePoint.x, mousePoint.y, 50, 10)
        graph.add(n5)
      }
      graph.draw()
    }

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
