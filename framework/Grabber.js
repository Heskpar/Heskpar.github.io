/**
*This function is used to draw the small boxes seen in the selection tool.
*the function is used normally four times, each using the function with four corners of a rectangle.
*@param{int} x - the x coordinate of a corner
*@param{int} y - the y coordinate of a corner 
*/
function drawGrabber(x, y) {
    const size = 5;
    const panel = document.getElementById('graphpanel')
    const ctx = panel.getContext('2d')
    ctx.beginPath()
    ctx.rect(x - size / 2, y - size / 2 , size, size, Math.PI*2, true)
    ctx.fillStyle = 'black'
    ctx.fill()
}

/**
* The purpose of this function is to primarily fit the Button class
*requirement of having a function which contains a method called drawButton to add a button.
*/
function createGrabber() {
    return{
	/**
	   *This function takes a canvas, and draws a small representation
	   *of what the tool does.
	   *@param {canvas} canvas - this argument is expected to be a small, 
	   *42 by 42 px sized canvas that will serve as a button. 
	   */
	drawButton: function(canvas)
	{
	    const size = 3;
	    var ctx = canvas.getContext('2d')
	    
	    ctx.beginPath()
	    ctx.rect(7,7,5,5, Math.PI*2, true)
	    ctx.rect(28,7,5,5, Math.PI*2, true)
	    ctx.rect(7,28,5,5, Math.PI*2, true)
	    ctx.rect(28,28,5,5, Math.PI*2, true)
	    ctx.fillStyle = 'black'
	    ctx.fill()


	}
    }
}
