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
        if(this.attribute !== ""){
          ctx.rect(this.x, this.y + this.size, this.size * 2, this.size / 2, Math.PI*2, true)
          this.height = this.size * 1.5
        }
        if(this.method !== ""){
          ctx.rect(this.x, this.y + (this.size * 1.5), this.size * 2, this.size / 2, Math.PI*2, true)
          this.height = this.size * 2
        }

        ctx.fillStyle = "white"
        ctx.fillRect(this.x + 1, this.y + 1, (this.size * 2) - 1, this.size - 1, Math.PI*2, true)
        if(this.attribute !== ""){
          ctx.fillRect(this.x + 1, (this.y + this.size) + 1, (this.size * 2) - 1, (this.size / 2) - 1,  Math.PI*2, true)
        }
        if(this.method !== ""){
          ctx.fillRect(this.x + 1, (this.y + this.size * 1.5) + 1, (this.size * 2) - 1, (this.size / 2) - 1, Math.PI*2, true)
        }

        ctx.font = '24px serif'
        ctx.fillStyle = 'black'
        ctx.fillText(this.classname, this.x + this.size / 3, this.y + this.size / 1.5)
        ctx.font = '12px serif'
        if(this.attribute !== ""){
          ctx.fillText(this.attribute, this.x + this.size / 2, this.y + (this.size * 1.3))
        }
        if(this.method !== ""){
          ctx.fillText(this.method, this.x + this.size / 2, this.y + (this.size * 1.8))
        }
        ctx.stroke()
    },
    propSheet: function(){
      document.getElementById("text1").style.visibility = "visible";
      document.getElementById("label1").style.visibility = "visible";
      document.getElementById("text2").style.visibility = "visible";
      document.getElementById("label2").style.visibility = "visible";
      document.getElementById("text3").style.visibility = "visible";
      document.getElementById("label3").style.visibility = "visible";

      document.getElementById("colorpicker").style.visibility = "hidden";
      document.getElementById("label4").style.visibility = "hidden";
      document.getElementById("label5").style.visibility = "hidden";


      if(document.getElementById("text1").value !== ""){
        this.classname = document.getElementById("text1").value;
        document.getElementById("text1").value = "";
      }
      if(document.getElementById("text2").value !== ""){
        this.attribute = document.getElementById("text2").value;
        document.getElementById("text2").value = "";
      }

      if(document.getElementById("text3").value !== ""){
        this.method = document.getElementById("text3").value;
        document.getElementById("text3").value = "";
      }
    }
}
function createClassNode (x, y, size) {
 
    const result = Object.create(ClassNodePrototype)
    result.classname = "Class"
    result.attribute = ""
    result.method = ""
    result.x = x
    result.y = y
    result.size = size
    result.width = size*2
    result.height = size
    return result
  }
