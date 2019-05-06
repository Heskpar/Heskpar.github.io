'use strict'
const ClassNodePrototype = {
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
          ctx.rect(5, 21, 30, 7, Math.PI*2, true)
          ctx.rect(5, 28, 30, 7, Math.PI*2, true)
	  ctx.stroke()
    },
    draw: function() {
	const canvas = document.getElementById('graphpanel')
        const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.size*2, this.size, Math.PI*2, true)
        ctx.rect(this.x, this.y + this.size, this.size * 2, this.size / 2, Math.PI*2, true)
        ctx.rect(this.x, this.y + (this.size * 1.5), this.size * 2, this.size / 2, Math.PI*2, true)
        ctx.fillStyle = "white"
        ctx.fillRect(this.x + 1, this.y + 1, (this.size * 2) - 1, this.size - 1, Math.PI*2, true)
        ctx.fillRect(this.x + 1, (this.y + this.size) + 1, (this.size * 2) - 1, (this.size / 2) - 1, Math.PI*2, true)
        ctx.fillRect(this.x + 1, (this.y + this.size * 1.5) + 1, (this.size * 2) - 1, (this.size / 2) - 1, Math.PI*2, true)
        ctx.font = '24px serif'
        ctx.fillStyle = 'black'
        ctx.fillText("Class", this.x + this.size / 3, this.y + this.size / 1.5)
        ctx.font = '12px serif'
        ctx.fillText("attribute", this.x + this.size / 2, this.y + (this.size * 1.3))
        ctx.fillText("method", this.x + this.size / 2, this.y + (this.size * 1.8))
        ctx.stroke()

    }
}
function createClassNode (x, y, size) {
 
    const result = Object.create(ClassNodePrototype)
    result.x = x
    result.y = y
    result.size = size
    result.width = size*2
    result.height = size*2
    return result
  }
