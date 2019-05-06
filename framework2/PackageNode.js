const  PackagePrototype ={

    getBounds: function(){
	return{x: this.x,y:this.y,width: this.bottomWidth,
	       height:this.topHeight + this.bottomHeight}
    },
    contains: function(p){
	return (this.x <= p.x && p.x <= this.x+this.bottomWidth) &&
	    (this.y <= p.y && p.y <= this.y + this.bottomHeight+this.topHeight)
    },
    translate: function(dx, dy){
	this.x += dx
	this.y += dy
    },
    drawButton: function(canvas){
	const ctx = canvas.getContext('2d')
	ctx.beginPath()
	ctx.rect(5 , 7 , 10, 5, Math.PI*2, true)
	ctx.rect(5 , 12 , 30, 20, Math.PI*2, true)
		
	ctx.stroke()

	
    },
    draw: function(){
	const canvas = document.getElementById('graphpanel')
	const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
	ctx.beginPath()
	ctx.fillStyle = 'white'
	ctx.rect(this.x, this.y, this.topWidth, this.topHeight, Math.PI*2, true)
	ctx.fillRect(this.x + 1, this.y + 1, this.topWidth - 1, this.topHeight - 1, Math.PI*2, true)
	ctx.rect(this.x, this.y+this.topHeight,this.bottomWidth, this.bottomHeight, Math.PI*2, true)
	ctx.fillRect(this.x + 1, this.y+this.topHeight + 1, this.bottomWidth - 1, this.bottomHeight - 1, Math.PI*2, true)
	ctx.font = '22px serif'
	ctx.fillStyle = 'black'
	ctx.fillText(this.content, this.x + (this.bottomWidth / 7), this.y + this.bottomHeight/1.3)
	ctx.stroke()
    }
}
function createPackageNode(x, y, size) {
    const result = Object.create(PackagePrototype)
    result.content= 'Package'
    result.x = x
    result.y= y
    result.size = size
    result.topWidth = size -10
    result.topHeight = 15
    result.bottomWidth = size * 2.5
    result.bottomHeight = size * 1.5
    return result
 

}

