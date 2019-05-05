'use strict'

class ToolBar {
    constructor(graph) {
	this.i = 1
	this.tools = []
	this.graph = graph
	
	
	this.tools.push(new Button(createGrabber,0,'grabber',this.graph,this.tools))
	this.tools[0].canvas.addEventListener('click', event =>this.tools[0].Switch(event))
    }

    addNode(createNode) {
	



	const button = new Button(createNode,this.i,'node',this.graph,this.tools)
	this.tools.push(button)
	button.canvas.addEventListener('click', event =>button.Switch(event))
	this.i++
    }
  
}
