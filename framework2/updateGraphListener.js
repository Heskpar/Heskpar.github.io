function updateGraphListener(button,buttons,graph)
{
    var panel = document.getElementById('graphpanel')
    if(button.type === 'grabber')
    {
	function repaint() {
	    const ctx = panel.getContext('2d')
	    ctx.clearRect(0, 0, panel.width, panel.height)
	    panel.innerHTML = ''
	    graph.draw()
	    if (selected !== undefined) {
		const bounds = selected.getBounds()
		drawGrabber(bounds.x, bounds.y)
		drawGrabber(bounds.x + bounds.width, bounds.y)
		drawGrabber(bounds.x, bounds.y + bounds.height)      
		drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
	    }    
	}

	
	
	
	panel.addEventListener('mousedown', event => {
	    let mousePoint = mouseLocation(event)
	    selected = graph.findNode(mousePoint)
	    if (selected !== undefined) {
		dragStartPoint = mousePoint
		dragStartBounds = selected.getBounds(mousePoint)
	    }
	    repaint(mousePoint)
	})
	
        panel.addEventListener('mousemove', event => {
	    if (dragStartPoint === undefined) return
	    let mousePoint = mouseLocation(event)
	    if (selected !== undefined) {
		const bounds = selected.getBounds();
		
		selected.translate(
		    dragStartBounds.x - bounds.x 
			+ mousePoint.x - dragStartPoint.x,
		    dragStartBounds.y - bounds.y 
			+ mousePoint.y - dragStartPoint.y);
		repaint()
	    }
	})
	
	panel.addEventListener('mouseup', event => {
	    dragStartPoint = undefined
	    dragStartBounds = undefined
	})
    }

    else if (button.type === 'node')
    {
	panel.addEventListener('mousedown', event => {
	    let mousePoint = mouseLocation(event)
            let selected = graph.findNode(mousePoint)
            if(selected === undefined) {
		var node = button.createNode(mousePoint.x,mousePoint.y,50)
		
		graph.add(node)
		
		
		const bounds = node.getBounds()
		drawGrabber(bounds.x, bounds.y)
		drawGrabber(bounds.x + bounds.width, bounds.y)
		drawGrabber(bounds.x, bounds.y + bounds.height)      
		drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
		graph.draw()
		
            }
	})
    }
    
}




function mouseLocation(event) {
    var panel = document.getElementById('graphpanel')
    var rect = panel.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    }
}

