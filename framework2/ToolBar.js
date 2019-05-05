'use strict'

class ToolBar {
    constructor(graph) {
	this.i = 1
	this.tools = []
	this.graph = graph
    }

    addNode(createNode) {
	



	const button = new Button(createNode,this.i,'node',this.graph,this.tools)
	this.tools.push(button)
	button.canvas.addEventListener('click', event =>button.Switch(event))
	this.i++
    }
  
}
