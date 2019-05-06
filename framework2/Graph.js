'use strict'


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
	   // n.draw()
	   n.draw()
	}
	for (const e of this.edges) {
	    e.draw()
	}

    }
}
document.addEventListener('DOMContentLoaded', function () {
    const graph = new Graph()
    const toolbar = new ToolBar(graph)



    //const n1 = createCircleNode(10, 10, 20, 'goldenrod')
    //const n2 = createCircleNode(30, 30, 20, 'blue')
    //const n3 = createRectangleNode(50, 30, 50, 10)
    //const n4 = createRectangleNode(200,100, 50, 10);
    const n5 = createNoteNode(50, 150, 45, 10)


    toolbar.addNode(createClassNode)
    toolbar.addNode(createNoteNode)
    toolbar.addNode(createPackageNode)
    toolbar.addNode(createInterfaceNode)

   // const n6 = createFullNode(200, 200, 50, 10)
    
    //toolbar.addNode(createNoteNode,graph)

    //graph.add(n1)
    //graph.add(n2)
    //graph.add(n3)
    //graph.add(n4)
    graph.add(n5)
    //graph.add(n6)
    const e = createLineEdge()
    
    graph.connect(e, { x: 60, y: 40 }, { x: 220, y: 120 })
    graph.draw()
    

    //Testing edge arrows
   
//    graph.add(n7)
  //  graph.add(n8)
    //const e2 = createLineEdgeDependecy()
    //graph.add(e2)
    // graph.connect(e2, { x: 60, y: 40 }, { x: 220, y: 120 })
    graph.draw()
    //const e3 = createLineEdgeInheritance()
    //graph.add(e3)
    graph.draw()





    const panel = document.getElementById('graphpanel')
    toolbar.tools[0].Switch()
    
    
})
