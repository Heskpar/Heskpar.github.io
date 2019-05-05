'use strict'

class ToolBar {
    constructor() {
	this.i = 1
	this.tools = []
	tools.push(createButton(createGrabber(),'grabber'))
    }

    addNode(createNode,graph) {
	var panel = document.getElementById('graphpanel')
	function mouseLocation(event) {
	    var rect = panel.getBoundingClientRect();
	    return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	    }
    }

	function onClick () {
	    
	    panel.addEventListener('mousedown', event => {
		let mousePoint = mouseLocation(event)
		var node = createNode(mousePoint.x,mousePoint.y,20)
		graph.add(node)
		
	    })
	}

	var button = createButton(createNode,this.i)
	button.addEventListener('click',onClick())
	this.i++
    }
  
}
