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

    propSheet: function() {
      document.getElementById("text1").style.visibility = "visible";
      document.getElementById("label1").style.visibility = "visible";

      document.getElementById("text2").style.visibility = "visible";
      document.getElementById("label2").style.visibility = "visible";

      document.getElementById("text3").style.visibility = "hidden";
      document.getElementById("label3").style.visibility = "hidden";

      if(document.getElementById("text1").value !== ""){
        this.name = document.getElementById("text1").value;
        document.getElementById("text1").value = "";
      }
      if(document.getElementById("text2").value !== ""){
        this.methods = document.getElementById("text2").value;
        document.getElementById("text2").value = "";
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
