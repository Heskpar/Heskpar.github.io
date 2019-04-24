'use strict'

class ToolBar {
    constructor() {
	this.buttons = []
	this.nodes = []
	this.edges = []
    }

    addNode(n) {
	this.nodes.push(n)
	
    }
    addEdge(e) {
	this.edges.push(e)
    }
    
}
