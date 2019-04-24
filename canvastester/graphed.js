'use strict'

function drawGrabber(x, y) {
  const size = 5;
  const canvas = document.getElementById('graphpanel')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
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
      const p = center(start.getBounds())  // Just pick the center of the bounds for now
      const q = center(end.getBounds()) // Not the "connection points" that graphed2 uses
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(q.x, q.y)
      ctx.stroke()
    }
  }
}

class circleNode {
  constructor(x, y, size, color) {
    this.x = x,
    this.y = y,
    this.size = size,
    this.color = color
  }
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.size,
      height: this.size
    }
  }
  contains(p) {
    return (this.x + this.size / 2 - p.x) ** 2 + (this.y + this.size / 2 - p.y) ** 2 <= this.size ** 2 / 4
  }
  translate(dx, dy) {
    this.x += dx
    this.y += dy
  }
  draw() {
    const canvas = document.getElementById('graphpanel')
    const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
    ctx.beginPath()
    ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2, true)
    ctx.fillStyle = this.color
    ctx.fill()
  }
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
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
      ctx.beginPath()
      ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2, true)
      ctx.fillStyle = color
      ctx.fill()
    }
  }
}




class classNode {
  constructor(x, y, size, width, height) {
    this.x = x,
    this.y = y,
    this.width = width,
    this.height = height
  }
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
  contains(p) {
    return (this.x + this.width / 2 - p.x) ** 2 + (this.y + this.height / 2 - p.y) ** 2 <= this.width ** 2 / 4
  }
  translate(dx, dy) {
    this.x += dx
    this.y += dy
  }
  draw() {
    const canvas = document.getElementById('graphpanel')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fillRect(this.x, this.y + this.height, this.width, this.height / 2)
    ctx.fillRect(this.x, this.y + this.height + (this.height / 2), this.width, this.height / 2)
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
  addEdge(n) {
    this.edges.push(n)
  }
  findNode(p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }
  draw() {
    for (const n of this.nodes) {
      n.draw()
    }
    for (const n of this.edges) {
      n.draw()
    }
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
}

/*function drawTest() {
  var canvas = document.getElementById('graphpanel');
  var ctx = canvas.getContext('2d');

  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
}*/

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  const n1 = createCircleNode(10, 10, 20, 'goldenrod')
  const n2 = createCircleNode(30, 30, 20, 'blue')
  const n3 = new circleNode(50, 50, 20, 'goldenrod')
  const n5 = new classNode(100, 100, 80, 60)
  //const n6 = drawTest()
  graph.add(n1)
  graph.add(n2)
  graph.add(n3)
  graph.add(n5)
  //graph.add(n6)
  const e = createLineEdge()
  graph.connect(e, { x: 20, y: 20 }, { x: 40, y: 40 })
  graph.addEdge(e)
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
      const n4 = new classNode(mousePoint.x, mousePoint.y, 80, 60)
      graph.add(n4)
    }
    graph.draw()
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
