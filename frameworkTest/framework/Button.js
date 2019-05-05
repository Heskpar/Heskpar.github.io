
'use strict'

function createButton(create,k,type) {
    //this class requires every edge and node to have a function
    //that can draw a miniture version of itself in an area of 30 by 30
    //pixels in a function called drawButtonImage(Button), which takes a canvas element.
    //The function will be used to
    //draw an image of the node or edge on the button in the canvas element.
    var canvas = document.createElement('canvas')
    var boolean on = false
    var tempNode = create()
    var ctx = canvas.getContext('2d')
    canvas.id = 'button'+k
    canvas.width =  40
    canvas.height = 40
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute"
    canvas.style.border = "1px solid"
    canvas.left = (k % 2)*70 + 25+'px'
    canvas.top = Math.floor(k/2)*60 + 25+'px'

    function Switch() {
	if(on) {
	    on = false
	    
	    ctx.beginpath()
	    ctx.rect(0,0,40,40)
	    ctx.fillStyle = 'white'
	    ctx.fill()
	    tempNode.drawButton(canvas)

	    else {
		on = true
		
		
	    }
	}

	else updateCanvasListener(create,type)
	   
    }
    var div = document.getElementsByTagName('div')[0];
    div.appendChild(canvas);
    tempNode.drawButton(canvas)

    return {
	
	
    }
}





