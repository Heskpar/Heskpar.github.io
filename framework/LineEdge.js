'use strict'

const LineEdgePrototype = {
    	
    draw: function() {
	    var startPoint = this.startNode.getConnectionPoint(this.endNode.center())
	    var endPoint = this.endNode.getConnectionPoint(startPoint)
	    const canvas = document.getElementById('graphpanel')
	    const ctx = canvas.getContext('2d')
	    ctx.beginPath()
	    
	    // Not the "connection points" that graphed2 uses
	    ctx.moveTo(startPoint.x, startPoint.y)
	    ctx.lineTo(endPoint.x, endPoint.y)
	    ctx.stroke()
	   
	},
	connect: (p,q) => {
	    const canvas = document.getElementById('graphpanel')
	    const ctx = canvas.getContext('2d')
	    ctx.beginPath()
	    
	    // Not the "connection points" that graphed2 uses
	    ctx.moveTo(p.x, p.y)
	    ctx.lineTo(q.x, q.y)
	    ctx.stroke()
	    	    
	},

	// draw: function() {
	//     const canvas = document.getElementById('graphpanel')
	// 	const ctx = canvas.getContext('2d')
	// 	let p1 = {x: start.getBounds().x, y: start.getBounds().y}
	// 	let p2 = {x: end.getBounds().x, y: end.getBounds().y}
	// 	let startPoint = this.startNode.getConnectionPoint(p1) 
	// 	let endPoint = this.endNode.getConnectionPoint(p2)
	// 	// startPoint = start.getConnectionPoint(endPoint)
	// 	// endPoint = end.getConnectionPoint(startPoint)
	//     ctx.beginPath()
	//     // Not the "connection points" that graphed2 uses
	//     ctx.moveTo(startPoint.x, startPoint.y)
	//     ctx.lineTo(endPoint.x, endPoint.y)
	//     ctx.stroke()
	   
	// },
	// connect: (p,q) => {
	// 	start = p 
	// 	end = q
	    	    
	// },

	drawButton: (canvas) => {
	    const ctx = canvas.getContext('2d')
	    ctx.moveTo(10,10)
	    ctx.lineTo(30,30)
	    ctx.stroke()
	}
}


function createLineEdge(startNode,endNode)
{
    var result = Object.create(LineEdgePrototype)
    result.startNode = startNode
    result.endNode = endNode
    return result
}
