function updateGraphListener(button,buttons,graph)
{
    let dragStartPoint = undefined
    let dragStartBounds = undefined
    
  

    var panel = document.getElementById('graphpanel')

    function repaint(selected) {
	const ctx = panel.getContext('2d')
	ctx.clearRect(0, 0, panel.width, panel.height)
	panel.innerHTML = ''
	graph.draw()
	if (selected !== undefined) {
	    selected.draw()
	    const bounds = selected.getBounds()
	    drawGrabber(bounds.x, bounds.y)
	    drawGrabber(bounds.x + bounds.width, bounds.y)
	    drawGrabber(bounds.x, bounds.y + bounds.height)      
	    drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
	}    
    }

    if(button.type === 'grabber')
    {	
	panel.addEventListener('mousedown', event => {
	    let mousePoint = mouseLocation(event)
	    selected = graph.findNode(mousePoint)
	    if (selected !== undefined) {
		dragStartPoint = mousePoint
		dragStartBounds = selected.getBounds(mousePoint)
	    }
	    repaint(selected)
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
		repaint(selected)
		
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
		
		graph.draw()
		repaint(selected)
		const bounds = node.getBounds()
		drawGrabber(bounds.x, bounds.y)
		drawGrabber(bounds.x + bounds.width, bounds.y)
		drawGrabber(bounds.x, bounds.y + bounds.height)      
		drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
		
		
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

