'use strict'

/**
* this class holds the graph on which the content is created.
*/
class Graph {
    /**
       * this constructor creates the arrays for nodes and edges
       */
    constructor() {
	this.nodes = []
	this.edges = []
    }
    /**
       * this function adds a node to the nodes array.
       * @param {node} n - node to be added
       */
    add(n) {
	this.nodes.push(n)
    }
    /**
       * this takes a point and checks if a node is located at that point
       * @param {point} p - point to be checked
       * @return {node} n - a node located at the point
       */
    findNode(p) {
	for (let i = this.nodes.length - 1; i >= 0; i--) {
	    const n = this.nodes[i]
	    if (n.contains(p)) return n
	}
	return undefined
    }
  /**
     * this function draws all the nodes and edges in the graph
     */
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

    
    toolbar.addNode(createClassNode)
    toolbar.addNode(createNoteNode)
    toolbar.addNode(createPackageNode)
    toolbar.addNode(createInterfaceNode)

    toolbar.addEdge(createLineEdge)
    toolbar.addEdge(createDependencyEdge)
    toolbar.addEdge(createAssociationEdge)
    toolbar.addEdge(createInheritanceEdge)
    toolbar.addEdge(createInterfaceEdge)
    toolbar.addEdge(createAggregationEdge)
    toolbar.addEdge(createCompositionEdge)
    

   
    


    toolbar.tools[0].Switch()
        
})
