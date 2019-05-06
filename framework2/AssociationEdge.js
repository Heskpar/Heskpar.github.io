'use strict'

const AssociationEdgePrototype = {
    
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
	    ctx.lineTo(startPoint.x-dx,startPoint.y-dy)
	    
	    
	    
	    ctx.moveTo(endPoint.x+(10*Math.sign(dx)),endPoint.y+7)
	    ctx.lineTo(endPoint.x,endPoint.y)
	    ctx.lineTo(endPoint.x+(10*Math.sign(dx)),endPoint.y-7)
    
	    ctx.stroke()
	}
	//if the other node is to the left or right
	else if((dx<dy && dx>= -dy)||(dx>=dy && dx<-dy)) {
	    ctx.beginPath()
	    
	    ctx.moveTo(startPoint.x,startPoint.y)
	    ctx.lineTo(startPoint.x,startPoint.y-dy/2)
	    ctx.lineTo(startPoint.x-dx,startPoint.y-dy/2)
	    ctx.lineTo(endPoint.x,endPoint.y)
	    
	    
	    
	    ctx.moveTo(endPoint.x+7,endPoint.y + (10*Math.sign(dy)))
	    ctx.lineTo(endPoint.x,endPoint.y)
	    ctx.lineTo(endPoint.x-7,endPoint.y + (10*Math.sign(dy)))
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
	
	ctx.moveTo(10,10)
	ctx.lineTo(30,30)
	ctx.moveTo(30,20)
	ctx.lineTo(30,30)
	ctx.lineTo(20,30)
	ctx.stroke()
    }
}


function createAssociationEdge(startNode,endNode)
{
    var result = Object.create(AssociationEdgePrototype)
    result.startNode = startNode
    result.endNode = endNode
    return result
}
