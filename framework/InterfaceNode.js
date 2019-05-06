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
    if(this.methods !== ""){
      ctx.rect(this.x, this.y + this.size, this.width, this.size, Math.PI*2, true)
      this.height = this.size * 2
    }

    ctx.fillStyle = "white"
    ctx.fillRect(this.x + 1, this.y + 1, (this.width) - 1, this.size - 1, Math.PI*2, true)
    if(this.methods !== ""){
      ctx.fillRect(this.x + 1, (this.y + this.size) + 1, (this.width) - 1, (this.size) - 1, Math.PI*2, true)
    }

    ctx.font = '14px serif'
    ctx.fillStyle = 'black'
    ctx.fillText(this.name, this.x + this.size / 6, this.y + this.size / 1.7)
    if(this.methods !== ""){
      ctx.font = '12px serif'
      ctx.fillText(this.methods, this.x + this.size / 2, this.y + (this.size * 1.3))
    }
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
  },

  propSheet: function() {
    document.getElementById("text1").style.visibility = "visible";
    document.getElementById("label1").style.visibility = "visible";

    document.getElementById("text2").style.visibility = "visible";
    document.getElementById("label2").style.visibility = "visible";
    document.getElementById("label5").style.visibility = "hidden";
    document.getElementById("label4").style.visibility = "hidden";
    document.getElementById("colorpicker").style.visibility = "hidden";

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
  result.methods = "" 
  result.x = x
  result.y = y
  result.size = size
  result.width = size * 2.5
  result.height = size
  return result
}
