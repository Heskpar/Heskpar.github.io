const  NoteNodePrototype ={

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
	ctx.rect(5 , 10 , 30, 15, Math.PI*2, true)
	ctx.fillStyle = '#FFFF66'
	ctx.fillRect(6, 11, 29, 14, Math.PI*2, true)
	ctx.stroke()

	
    },
    draw: function(){
	const canvas = document.getElementById('graphpanel')
	const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
	ctx.beginPath()
	ctx.fillStyle = this.color
	ctx.rect(this.x, this.y, this.size * 2, this.size, Math.PI*2, true)
	ctx.fillRect(this.x + 1, this.y + 1, (this.size * 2) - 1, this.size - 1, Math.PI*2, true)
	ctx.font = '20px serif'
	ctx.fillStyle = 'black'
	ctx.fillText(this.title, this.x + this.size / 2, this.y + this.size / 1.5)
	ctx.stroke()
    }
}
function createNoteNode(x, y, size) {
    const result = Object.create(NoteNodePrototype)
    result.title = "aaaa"
    result.color = '#FFFF66'
    result.x = x
    result.y= y
    result.size = size
    result.width = size*2
    result.height = size
    return result
 

}

