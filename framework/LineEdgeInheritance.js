'use strict'

const LineEdgeInheritancePrototype = {
    draw: function() {
	    let startPoint = this.startNode.getConnectionPoint(this.endNode.center())
	    let endPoint = this.endNode.getConnectionPoint(startPoint)
	    const canvas = document.getElementById('graphpanel')
        const ctx = canvas.getContext('2d')
        let angle = 0
        let radius = 0
        let x = 0
        let y = 0
        ctx.beginPath()
        angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x)
        radius = 10
        x = radius * Math.cos(angle) + endPoint.x
        y = radius * Math.sin(angle) + endPoint.y
        ctx.moveTo(x,y)
        angle += (1/3)*(2*Math.PI)
        x = radius * Math.cos(angle) + endPoint.x
        y = radius * Math.sin(angle) + endPoint.y
        ctx.lineTo(x,y)
        angle += (1/3)*(2*Math.PI)
        x = radius * Math.cos(angle) + endPoint.x
        y = radius * Math.sin(angle) + endPoint.y
        ctx.lineTo(x,y)
        ctx.closePath()
	    // ctx.setLineDash([5])
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

	drawButton: (canvas) => {
		const ctx = canvas.getContext('2d')
		ctx.moveTo(10,10)
		ctx.lineTo(30,30)
	    ctx.stroke()
	}
}


function createInheritanceEdge(startNode,endNode)
{
    var result = Object.create(LineEdgeInheritancePrototype)
    result.startNode = startNode
    result.endNode = endNode
    return result
}
