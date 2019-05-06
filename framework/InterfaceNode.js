'use strict'
const InterfaceNodePrototype = {
    getBounds: function(){
	return{x: this.x,y:this.y,width:this.width,height:this.height}
    },
    contains: function(p){
	return (this.x <= p.x && p.x <= this.x+this.width) &&
	    (this.y <= p.y && p.y <= this.y + this.height)
    },
    translate: function(dx, dy){
	this.x += dx
	this.y += dy
    },
    drawButton: function(canvas){
	const ctx = canvas.getContext('2d')
	  ctx.beginPath()
	  ctx.rect(5 , 6, 30, 15, Math.PI*2, true)
          ctx.rect(5, 21, 30, 15, Math.PI*2, true)
	  ctx.stroke()
    },
    draw: function() {
	const canvas = document.getElementById('graphpanel')
        const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.size, Math.PI*2, true)
        ctx.rect(this.x, this.y + this.size, this.width, this.size, Math.PI*2, true)
        
        ctx.fillStyle = "white"
        ctx.fillRect(this.x + 1, this.y + 1, (this.width) - 1, this.size - 1, Math.PI*2, true)
        ctx.fillRect(this.x + 1, (this.y + this.size) + 1, (this.width) - 1, (this.size) - 1, Math.PI*2, true)
        
        ctx.font = '14px serif'
        ctx.fillStyle = 'black'
        ctx.fillText(this.name, this.x + this.size / 6, this.y + this.size / 1.7)
        ctx.font = '12px serif'
        ctx.fillText(this.methods, this.x + this.size / 2, this.y + (this.size * 1.3))
        
        ctx.stroke()

    },
    getConnectionPoint: function(point){
        var centerX = this.x + this.width/2
        var centerY = this.y + this.height/2
        var dx = point.x - centerX
        var dy = point.y - centerY
        if(dx<-dy && dx >= dy) return {x: centerX, y: this.y}
        else if(dx >= -dy && dx >= dy) return  {x: this.x + this.width, y: centerY}
        // else if(dx >= -dy && dx >= dy) return  {x: this.x + this.width}
        else if(dx < -dy && dx <dy) return {x:this.x,y: centerY}
        else if(dx >= -dy && dx<dy)return{x: centerX, y:this.y+this.height}
        },
        center:function()  {
        return{
            x: this.x+this.width/2 ,
            y: this.y+this.height/2
        }
        }
}
function createInterfaceNode (x, y, size) {

    const result = Object.create(InterfaceNodePrototype)
    result.name = '<<Interface>>'
    result.methods = 'attributes' 
    result.x = x
    result.y = y
    result.size = size
    result.width = size * 2.5
    result.height = size*2
    return result
  }
