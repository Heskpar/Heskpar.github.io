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

	addEdge(e)
	{
		let x = document.createElement('button')
		x.addEventListener('click', event => {
			for(let tool of document.getElementById('buttonBar').children{
				tool.disabled = false
			}
		x.setAttribute('disabled','true')
		selectedTool = getSelectedTool()
		currentTool = selectedTool.getType()
		})
		x.node = e;
		buttonBar.appendChild(x)
		group.push(x)
		tools.push(x)
	}

	return {
		getCurrentTool: () =>{
			return currentTool
		}
	}
}
