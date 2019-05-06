const  NoteNodePrototype ={

  /**
   * Returns the bounds of the object, including height and width
   * @returns {number} x - x-axis coord
   * @returns {number} y - y-axis coord
   * @returns {number} width - size of width
   * @returns {number} height - size of height
   */
  getBounds: function(){
    return{x: this.x,y:this.y,width:this.width,height:this.height}
  },

  /**
   * Takes a point and determines whether the point is within the bounds of the node.
   * @param {point} p - point on canvas to be determined
   * @returns {boolean} - whether the node contains the point
   */
  contains: function(p){
    return (this.x <= p.x && p.x <= this.x+this.width) &&
    (this.y <= p.y && p.y <= this.y + this.height)
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

  /** 
   *This function takes a canvas, and draws a small representation
   *of what the tool does.
   *@param {canvas} canvas - this argument is expected to be a small, 
   *42 by 42 px sized canvas that will serve as a button. 
   */
  drawButton: function(canvas){  
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.rect(5 , 10 , 30, 15, Math.PI*2, true)
    ctx.fillStyle = '#FFFF66'
    ctx.fillRect(6, 11, 29, 14, Math.PI*2, true)
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
    ctx.fillStyle = this.color
    ctx.rect(this.x, this.y, this.size * 2, this.size, Math.PI*2, true)
    ctx.fillRect(this.x + 1, this.y + 1, (this.size * 2) - 1, this.size - 1, Math.PI*2, true)
    ctx.font = '20px serif'
    ctx.fillStyle = 'black'
    ctx.fillText(this.title, this.x + this.size / 2, this.y + this.size / 1.5)
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
    else if(dx >= -dy && dx >= dy) return  {x: this.x + this.width, y: centerY}
    else if(dx < -dy && dx <dy) return {x:this.x,y: centerY}
    else if(dx >= -dy && dx<dy)return{x: centerX, y:this.y+this.height}
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

    document.getElementById("colorpicker").style.visibility = "visible";
    document.getElementById("label4").style.visibility = "visible";

    document.getElementById("text2").style.visibility = "hidden";
    document.getElementById("label2").style.visibility = "hidden";
    document.getElementById("label5").style.visibility = "hidden";

    document.getElementById("text3").style.visibility = "hidden";
    document.getElementById("label3").style.visibility = "hidden";


    if (document.getElementById("text1").value !== ""){
      this.title = document.getElementById("text1").value;
      document.getElementById("text1").value = "";
    }

    if (document.getElementById("colorpicker").value !== "null"){
      this.color = document.getElementById("colorpicker").value;
      document.getElementById("colorpicker").value = "null"
    } 
  }
}

/**
 * Creates a note node at the position of x and y, with a height and width from size.
 * @param {number} x - x-axis coordinate of new node
 * @param {number} y - y-axis coordinate of new node
 * @param {number} size - size of node, used for calculating width and height
 * @returns {Object} result - the newly created InterfaceNode
 */
function createNoteNode(x, y, size) {
  const result = Object.create(NoteNodePrototype)
  result.title = "Note"
  result.color = '#FFFF66'
  result.x = x
  result.y = y
  result.size = size
  result.width = size*2
  result.height = size
  return result
}

