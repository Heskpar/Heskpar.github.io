'use strict'

class ToolBar {
    constructor() {
	this.i = 0
	this.tools = []
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
              let selected = graph.findNode(mousePoint)
              if(selected === undefined) {
		var node = createNode(mousePoint.x,mousePoint.y,50)
		graph.add(node)
              }
	    })
	}

	var button = createButton(createNode,this.i)
	button.addEventListener('click',onClick())
	this.i++
    }
  
}
