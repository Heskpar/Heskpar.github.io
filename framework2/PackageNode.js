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
        ctx.font = '10px serif'
        ctx.fillStyle = 'black'
        ctx.fillText(this.name, this.x + 5, this.y + 10)
	ctx.font = '22px serif'
	ctx.fillText(this.content, this.x + (this.bottomWidth / 7), this.y + this.bottomHeight/1.3)
	ctx.stroke()
    },
    propSheet: function(){
      document.getElementById("text1").style.visibility = "visible";
      document.getElementById("label1").style.visibility = "visible";

      document.getElementById("text2").style.visibility = "visible";
      document.getElementById("label5").style.visibility = "visible";
      document.getElementById("label2").style.visibility = "hidden";

      document.getElementById("text3").style.visibility = "hidden";
      document.getElementById("label3").style.visibility = "hidden";

      document.getElementById("colorpicker").style.visibility = "hidden";
      document.getElementById("label4").style.visibility = "hidden";


      if (document.getElementById("text1").value !== ""){
        this.name = document.getElementById("text1").value;
        document.getElementById("text1").value = "";
      }

      if (document.getElementById("text2").value !== ""){
        this.content = document.getElementById("text2").value;
        document.getElementById("text2").value = "";
      }

   }
}
function createPackageNode(x, y, size) {
    const result = Object.create(PackagePrototype)
    result.content = 'Package'
    result.name = 'Name'
    result.x = x
    result.y= y
    result.size = size
    result.topWidth = size -10
    result.topHeight = 15
    result.bottomWidth = size * 2.5
    result.bottomHeight = size * 1.5
    return result
 

}

