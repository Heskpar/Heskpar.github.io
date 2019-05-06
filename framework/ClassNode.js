'use strict'
const ClassNodePrototype = {

  /** getBounds
   * Returns the bounds of the object, including height and width
   * @returns {number} x - x-axis coord
   * @returns {number} y - y-axis coord
   * @returns {number} width - size of width
   * @returns {number} height - size of height
   */
  getBounds: function(){
    return{x: this.x,y:this.y,width:this.width,height:this.height}
  },

  /** contains
   * Takes a point and determines whether the point is within the bounds of the node.
   * @param {point} p - point on canvas to be determined
   * @returns {boolean} - whether the node contains the point
   */
  contains: function(p){
    return (this.x <= p.x && p.x <= this.x+this.width) &&
      (this.y <= p.y && p.y <= this.y + this.height)
  },

  /** translate
   * Updates the x and y coordinates of the node based on dx and dy.
   * @param {number} dx - amount to change this.x by
   * @param {number} dy - amount to change this.y by
   */
  translate: function(dx, dy){
    this.x += dx
    this.y += dy
  },
  
  /** drawbutton
   *This function takes a canvas, and draws a small representation
   *of what the tool does.
   *@param {canvas} canvas - this argument is expected to be a small, 
   *42 by 42 px sized canvas that will serve as a button. 
   */
  drawButton: function(canvas){
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.rect(5 , 6, 30, 15, Math.PI*2, true)
    ctx.rect(5, 21, 30, 7, Math.PI*2, true)
    ctx.rect(5, 28, 30, 7, Math.PI*2, true)
    ctx.stroke()
  },

  /**
   * Draws the canvas node element onto the main area (graphpanel), based on x and y for position.
   * Also draws or omits certain parts of the node based on property values.
   */
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

  /**
   * Based on the position of the other connection point (point),
   * calculates second point on node for edge to connect to.
   * @param {point} point - connection point on another node, start of an edge.
   * @returns {number} x - x coordinate for second point.
   * @returns {number} y - y coordinate for second point.
   */
  getConnectionPoint: function(point){
    var centerX = this.x + this.width/2
    var centerY = this.y + this.height/2
    var dx = point.x - centerX
    var dy = point.y - centerY
    if(dx<-dy && dx >= dy) return {x: centerX, y: this.y}
    else if(dx >= -dy && dx >= dy) return  {x: this.x + this.width, y: centerY + (this.height/4)}
    // else if(dx >= -dy && dx >= dy) return  {x: this.x + this.width}
    else if(dx < -dy && dx <dy) return {x:this.x,y: centerY}
    else if(dx >= -dy && dx<dy)return{x: centerX, y:this.y + this.height}
  },

  /**
   * Returns the center of the node based on x, y, width, and height.
   * @returns {number} x - x-axis coordinate of center.
   * @returns {number} y - y-axis coordinate of center.
   */
  center:function()  {
    return{
      x: this.x+this.width/2 ,
      y: this.y+this.height/2
    }
  },

  /**
   * Sets all necessary HTML elements for property editing to visible.
   * Based on entry from user into the applicable fields for this node,
   * changes necessary properties.
   */
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

/**
 * Returns an instance of a standard class node, with the position and size as specified by the parameters.
 * @param {number} x - x-axis coordinate of new node
 * @param {number} y - y-axis coordinate of new node
 * @param {number} size - size of node, used for calculating width and height
 * @returns {Object} result - the newly created ClassNode
 */
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
