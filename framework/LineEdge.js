'use strict'

const LineEdgePrototype = {
		
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
	    var startPoint = this.startNode.getConnectionPoint(this.endNode.center())
	    var endPoint = this.endNode.getConnectionPoint(startPoint)
	    const canvas = document.getElementById('graphpanel')
	    const ctx = canvas.getContext('2d')
	    ctx.beginPath()
	ctx.setLineDash([5,10])
	    // Not the "connection points" that graphed2 uses
	    ctx.moveTo(startPoint.x, startPoint.y)
	    ctx.lineTo(endPoint.x, endPoint.y)
	    ctx.stroke()
	ctx.setLineDash([])
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
	    ctx.setLineDash([5,10])
	    // Not the "connection points" that graphed2 uses
	    ctx.moveTo(p.x, p.y)
	    ctx.lineTo(q.x, q.y)
	    ctx.stroke()
	    ctx.setLineDash([])
	    	    
	},


	/**
	 * drawButton
	 * This function takes a cnavas and draws a small representationof what the tool does
	 * @param {canvas} canvas a 42 by 42 px sized cnvas that will serve as a button
	 */
	drawButton: (canvas) => {
	    const ctx = canvas.getContext('2d')
	    ctx.beginPath()
	    ctx.setLineDash([5,5])
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
function createLineEdge(startNode,endNode)
{
    var result = Object.create(LineEdgePrototype)
    result.startNode = startNode
    result.endNode = endNode
    return result
}
