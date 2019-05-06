'use strict'

const LineEdgeInheritancePrototype = {
    /**
	 * draw
	 * This function is used to draw the edge connection between nodes
	 *@type {number} startPoint The starting coordinates of the node from center
	 *@type {number} endPoint The ending coordinates of the node from center
	 *@type {number} dx the distance between the x coordinates of the startPoint and endPoint
	 *@type {number} dy the distance between the y coordinates of the startPoint and endPoint
	 *@const {canvas} canvas the grid that the edge will be drawn on
	 *@const {ctx} ctx the object based of the dge that is used to be drawn or modified
	 */
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
    
    /**
	 *connect
	 *Gets the connection between two points and connects the two points
	 *@param {*} p the point where the connection begins from
	 *@param {*} q the point where the connection ends at
	 */
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

/**
 * Represents the AggregationEdge
 * @constructor
 * @param {*} startNode the node the edge begins from
 * @param {*} endNode the node the edge ends at
 * @return {Object} an AggregationEdge
 */
function createInheritanceEdge2(startNode,endNode)
{
    var result = Object.create(LineEdgeInheritancePrototype)
    result.startNode = startNode
    result.endNode = endNode
    return result
}
