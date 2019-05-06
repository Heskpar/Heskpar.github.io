'use strict'

const AggregationEdgePrototype = {
    
    draw: function() {
	var startPoint = this.startNode.getConnectionPoint(this.endNode.center())
	var endPoint = this.endNode.getConnectionPoint(startPoint)
	const canvas = document.getElementById('graphpanel')
	const ctx = canvas.getContext('2d')
	

	var dx = startPoint.x - endPoint.x
	var dy = startPoint.y - endPoint.y
	
	//if the other node is above or below
	if((dx>=dy && dx>= -dy)||(dx<dy && dx<-dy)) {
	    ctx.beginPath()
	    
	    ctx.moveTo(startPoint.x,startPoint.y)
	    ctx.lineTo(startPoint.x-dx/2,startPoint.y)
	    ctx.lineTo(startPoint.x-dx/2,startPoint.y-dy)
	    ctx.lineTo(startPoint.x-dx+(20*Math.sign(dx)),startPoint.y-dy)
	    ctx.lineTo(startPoint.x-dx+(10*Math.sign(dx)),startPoint.y-dy+7)
	    ctx.lineTo(endPoint.x,endPoint.y)
	    ctx.lineTo(startPoint.x-dx+(10*Math.sign(dx)),startPoint.y-dy-7)
	    ctx.lineTo(startPoint.x-dx+(20*Math.sign(dx)),startPoint.y-dy)
	    
	    ctx.stroke()
	    
	    
	}
	//if the other node is to the left or right
	else if((dx<dy && dx>= -dy)||(dx>=dy && dx<-dy)) {
	    ctx.beginPath()
	    
	    ctx.moveTo(startPoint.x,startPoint.y)
	    ctx.lineTo(startPoint.x,startPoint.y-dy/2)
	    ctx.lineTo(startPoint.x-dx,startPoint.y-dy/2)
	    ctx.lineTo(endPoint.x,endPoint.y+(20*Math.sign(dy)))
	    ctx.lineTo(endPoint.x+7,endPoint.y+(10*Math.sign(dy)))
	    ctx.lineTo(endPoint.x,endPoint.y)
	    ctx.lineTo(endPoint.x-7,endPoint.y+(10*Math.sign(dy)))
	    ctx.lineTo(endPoint.x,endPoint.y+(20*Math.sign(dy)))

	    ctx.stroke()
	    
	   
	}
	
	
	
	
	
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
	ctx.beginPath()
	
	ctx.moveTo(22,22)
	ctx.lineTo(18,14)
	ctx.lineTo(10,10)
	ctx.lineTo(14,18)
	ctx.lineTo(22,22)
	ctx.lineTo(30,30)

	ctx.stroke()
    }
}


function createAggregationEdge(startNode,endNode)
{
    var result = Object.create(AggregationEdgePrototype)
    result.startNode = endNode
    result.endNode = startNode
    return result
}
