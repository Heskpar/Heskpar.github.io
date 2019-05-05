function drawGrabber(x, y) {
    const size = 5;
    const panel = document.getElementById('graphpanel')
    const ctx = panel.getContext('2d')
    ctx.beginPath()
    ctx.rect(x - size / 2, y - size / 2 , size, size, Math.PI*2, true)
    ctx.fillStyle = 'black'
    ctx.fill()
}

function createGrabber() {
    return{
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
