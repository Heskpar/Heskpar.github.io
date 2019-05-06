'use strict'
const  PackagePrototype ={

  /**
   * Returns the bounds of the object, including height and width
   * @returns {number} x - x-axis coord
   * @returns {number} y - y-axis coord
   * @returns {number} width - size of width of the bottom rectangle
   * @returns {number} height - size of height of both bottom and top rectangle
   */
  getBounds: function(){
    return{x: this.x,y:this.y,width: this.bottomWidth,
    height:this.bottomHeight + this.topHeight}
  },

  /**
   * Takes a point and determines whether the point is within the bounds of the node.
   * @param {point} p - point on canvas to be determined
   * @returns {boolean} - whether the node contains the point
   */
  contains: function(p){
    return (this.x <= p.x && p.x <= this.x+this.bottomWidth) &&
      (this.y <= p.y && p.y <= this.y + this.bottomHeight + this.topHeight)
  },
  
  /**
   * Based on the position of the other connection point (point),
   * calculates second point on node for edge to connect to.
   * @param {point} point - connection point on another node, start of an edge.
   * @returns {number} x - x coordinate for second point.
   * @returns {number} y - y coordinate for second point.
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
    ctx.rect(5 , 7 , 10, 5, Math.PI*2, true)
    ctx.rect(5 , 12 , 30, 20, Math.PI*2, true)
    ctx.stroke()
  },
  
  /**
   * Draws the canvas node element onto the main area (graphpanel), based on x and y for position, and 
   * height and width for size.
   * Also draws or omits certain parts of the node based on property values.
   */
  draw: function(){
    const canvas = document.getElementById('graphpanel')
    const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.rect(this.x, this.y, this.topWidth, this.topHeight, Math.PI*2, true)
    ctx.fillRect(this.x + 1, this.y + 1, this.topWidth - 1, this.topHeight - 1, Math.PI*2, true)
    ctx.rect(this.x, this.y + this.topHeight, this.bottomWidth, this.bottomHeight, Math.PI*2, true)
    ctx.fillRect(this.x + 1, this.y + this.topHeight + 1, this.bottomWidth - 1, this.bottomHeight - 1, Math.PI*2, true)
    ctx.font = '10px serif'
    ctx.fillStyle = 'black'
    ctx.fillText(this.name, this.x + 5, this.y + 10)
    ctx.font = '22px serif'
    ctx.fillText(this.content, this.x + (this.bottomWidth / 7), this.y + this.bottomHeight/1.3)
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
    var centerX = this.x + this.bottomWidth/2
    var centerY = this.y + this.bottomHeight/2
    var dx = point.x - centerX
    var dy = point.y - centerY
    if(dx<-dy && dx >= dy) return {x: centerX, y: this.y + 15}
    else if(dx >= -dy && dx >= dy) return  {x: this.x + this.bottomWidth, y: centerY}
    // else if(dx >= -dy && dx >= dy) return  {x: this.x + this.width}
    else if(dx < -dy && dx <dy) return {x:this.x,y: centerY}
    else if(dx >= -dy && dx<dy)return{x: centerX, y:this.y + this.bottomHeight +15}
  },

  /**
   * Returns the center of the node based on x, y, width, and height.
   * @returns {number} x - x-axis coordinate of center.
   * @returns {number} y - y-axis coordinate of center.
   */
  center:function()  {
    return{
      x: this.x +this.bottomWidth,
      y: this.y +this.bottomHeight
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

/**
 * Returns a package node, based on position of x and y, and height and width of size.
 * @param {number} x - x-axis coordinate of new node
 * @param {number} y - y-axis coordinate of new node
 * @param {number} size - size of node, used for calculating top and bottom width and height
 * @returns {Object} result - the newly created PackageNode
 */
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

